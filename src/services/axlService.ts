import { encodeFunctionData } from "viem";
import { AxlCall } from "@super-call/sdk";
import { AxelarQueryAPI, Environment } from "@axelar-network/axelarjs-sdk";
import { getNetwork } from "@wagmi/core";

import { findAxChainConfigByChainId } from "@/constants/axChainConfig";
import { userContractState } from "@/components/Toolbar/ImportABITool/userContractSlice";
import { FunctionInput } from "@/utils/abiUtils";
import { getPublicClient, getWalletClient } from "@/lib/viem";
import { ChainID } from "@/constants/chainList";
import { axSuperContract } from "@/constants/contractList";

export const axlCallMapping = async (
  callArray: any[],
  userContract: userContractState["contractData"],
  sourceChainId?: ChainID
): Promise<AxlCall[]> => {
  // Initial
  let calls = [new AxlCall("", "", "")];
  const { chain: currentChain } = getNetwork();
  sourceChainId = sourceChainId ? sourceChainId : (currentChain?.id as ChainID);

  for (let index = 0; index < callArray.length; index++) {
    const call = callArray[index];
    const chain = findAxChainConfigByChainId(call.chainId);
    const contractList = userContract[call.chainId];
    const contract = contractList.filter(
      (contract) => contract.contractAddress === call.contractAddress
    )[0];
    const inputData = inputDataMapping(call.inputData);
    const callData = encodeFunctionData({
      abi: contract.contractABI,
      functionName: call.contractFunction,
      args: inputData,
    });
    const publicSuperCallAddr = axSuperContract(call.chainId).address;

    // Calculate fee
    const fee = await estimateAxlFee({
      targetAddress: call.contractAddress,
      contractABI: contract.contractABI,
      args: inputData,
      functionName: call.contractFunction,
      sourceChainName: findAxChainConfigByChainId(sourceChainId || -1).name,
      destinationChainName: chain.name,
      sourceChainTokenSymbol: findAxChainConfigByChainId(sourceChainId || -1)
        .tokenSymbol,
      sourceChainId: sourceChainId as ChainID,
    });

    if (index === 0) {
      calls = [
        new AxlCall(
          chain.name,
          call.contractAddress,
          callData,
          publicSuperCallAddr,
          fee
        ),
      ];
    } else {
      calls.push(
        new AxlCall(
          chain.name,
          call.contractAddress,
          callData,
          publicSuperCallAddr,
          fee
        )
      );
    }
    if (call.subNodes.length > 0) {
      const subCalls = await axlCallMapping(
        call.subNodes,
        userContract,
        call.chainId
      );

      subCalls.map((subCall: AxlCall) =>
        calls[calls.length - 1].addSubCall(subCall)
      );
    }
  }

  return calls;
};

export const inputDataMapping = (inputData: { value: string | number }[]) =>
  inputData.map((data) => data.value);

export interface IEstimateAxlFee {
  targetAddress: `0x${string}`;
  contractABI: FunctionInput[];
  args?: any[];
  functionName: string;
  sourceChainName: string;
  destinationChainName: string;
  sourceChainTokenSymbol: string;
  sourceChainId: ChainID;
}
export const estimateAxlFee = async ({
  targetAddress,
  contractABI,
  args,
  functionName,
  sourceChainName,
  destinationChainName,
  sourceChainTokenSymbol,
  sourceChainId,
}: IEstimateAxlFee): Promise<string> => {
  if (sourceChainName === destinationChainName) {
    // same chain
    try {
      const walletClient = getWalletClient(sourceChainId);
      const [account] = await walletClient.getAddresses();
      const fee = await getPublicClient(sourceChainId).estimateContractGas({
        address: targetAddress,
        abi: contractABI,
        args: args,
        functionName: functionName,
        account,
      });
      return fee.toString();
    } catch (e) {
      console.log(e);
      return "0";
    }
    
  } else {
    // cross chain
    const axlAPI = new AxelarQueryAPI({ environment: Environment.TESTNET });

    const fee = await axlAPI.estimateGasFee(
      sourceChainName.toUpperCase(),
      destinationChainName.toUpperCase(),
      sourceChainTokenSymbol
    );

    return fee as string;
  }
};
