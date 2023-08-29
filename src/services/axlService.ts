import { encodeFunctionData } from "viem";
import { AxlCall } from "@super-call/sdk";
import { AxelarQueryAPI, Environment } from "@axelar-network/axelarjs-sdk";

import { findAxChainConfigByChainId } from "@/constants/axChainConfig";
import { userContractState } from "@/components/Toolbar/ImportABITool/userContractSlice";
import { FunctionInput } from "@/utils/abiUtils";

export const axlCallMapping = (
  callArray: any[],
  userContract: userContractState["contractData"]
): AxlCall[] => {
  let calls = [new AxlCall("", "", "")];
  callArray.forEach((call, index) => {
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

    if (index === 0) {
      calls = [
        new AxlCall(
          chain.name,
          call.contractAddress,
          callData,
          "0xE3876f1D0D0DbC782d7844FdE8675c75628E36a2",
          "1"
        ),
      ];
    } else {
      calls.push(
        new AxlCall(
          chain.name,
          call.contractAddress,
          callData,
          "0xE3876f1D0D0DbC782d7844FdE8675c75628E36a2",
          "1"
        )
      );
    }
    if (call.subNodes.length > 0) {
      const subCalls = axlCallMapping(call.subNodes, userContract);
      if (subCalls) {
        subCalls.forEach((subCall: AxlCall) =>
          calls[calls.length - 1].addSubCall(subCall)
        );
      }
    }
  });
  return calls;
};

export const inputDataMapping = (inputData: { value: string | number }[]) =>
  inputData.map((data) => data.value);

// FIXME: do estimate gas next
// if same chain => https://viem.sh/docs/contract/estimateContractGas.html#estimatecontractgas
// if cross chain => axlAPI.estimateGasFee
export interface IEstimateAxlFee {
  targetAddress: string;
  contractABI: FunctionInput[];
  functionName: string;
  sourceChainId: string;
  destinationChainId: string;
  sourceChainTokenSymbol: string;
}
export const estimateAxlFee = async ({
  targetAddress,
  contractABI,
  functionName,
  sourceChainId,
  destinationChainId,
  sourceChainTokenSymbol,
}: IEstimateAxlFee) => {
  // targetContract, abi, functionName, account
  // sourceChainId, destinationChainId, sourcChainTokenSymbol

  // same chain
  // const gas = await publicClient.estimateContractGas({
  //   address: targetAddress,
  //   abi: contractABI,
  //   functionName: functionName,
  //   account,
  // });

  // cross chain
  const axlAPI = new AxelarQueryAPI({ environment: Environment.TESTNET });

  // const fee = await axlAPI.estimateGasFee(
  //   sourceChain.name.toUpperCase(),
  //   chain.toUpperCase(),
  //   sourceChain.tokenSymbol
  // );
};
