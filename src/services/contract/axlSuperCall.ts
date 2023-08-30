import { writeContract, prepareWriteContract } from "@wagmi/core";
import { axSuperCallABI } from "@/constants/abi/axSuperCallABI";

export const aggregate = async (
  contractAddress: `0x${string}`,
  encodedCalls: string[],
  fee: bigint,
) => {
  try {
    const config = await prepareWriteContract({
      address: contractAddress,
      abi: axSuperCallABI,
      functionName: "aggregate",
      args: [encodedCalls],
      value: fee,
    });

    const { hash } = await writeContract(config);
    return hash;
  } catch (err) {
    console.error(err);
  }
};
