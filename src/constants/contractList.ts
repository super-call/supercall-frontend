import { lzSuperCallABI } from "@/abi/lzSuperCallABI";
import { addressList } from "./addressList";

export const lzSuperCallContract = (
  chainId: keyof typeof addressList.lzSuperCall
) => ({
  address: addressList.lzSuperCall[chainId],
  abi: lzSuperCallABI,
});
