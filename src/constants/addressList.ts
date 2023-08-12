import { chainList } from "./chainList";

interface IAddressList {
  [key: string]: Record<keyof typeof chainList, `0x${string}`>;
}

export const addressList: IAddressList = {
  lzSuperCall: {
    5: "0x5",
    97: "0x97",
    43113: "0x43113",
  },
};

export const getContractSupportedChainIds = (
  contractName: keyof typeof addressList
) => Object.keys(addressList[contractName]).map(Number);
