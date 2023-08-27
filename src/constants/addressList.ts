import { chainList } from "./chainList";

interface IAddressList {
  [key: string]: Record<keyof typeof chainList, `0x${string}`>;
}

export const addressList: IAddressList = {
  lzSuperCall: {
    5: "0x12345",
    97: "0x12345",
    43113: "0x12345",
    80001: "0x12345",
  },
  axSuperCall: {
    5: "0x12345",
    97: "0x12345",
    43113: "0x12345",
    80001: "0x12345",
  },
};

export const getContractSupportedChainIds = (
  contractName: keyof typeof addressList
) => Object.keys(addressList[contractName]).map(Number);
