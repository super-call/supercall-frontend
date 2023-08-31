import { lzSuperCallABI } from "@/constants/abi/lzSuperCallABI";
import { addressList } from "./addressList";
import { axSuperCallABI } from "./abi/axSuperCallABI";

export const lzSuperCallContract = (
  chainId: keyof typeof addressList.lzSuperCall
) => ({
  address: addressList.lzSuperCall[chainId],
  abi: lzSuperCallABI,
});

export const axSuperContract = (
  chainId: keyof typeof addressList.axSuperCall
) => ({
  address: addressList.axSuperCall[chainId],
  abi: axSuperCallABI,
});
