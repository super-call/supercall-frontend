import { chainList } from "./chainList";

interface IAddressList {
  [key: string]: Record<keyof typeof chainList, `0x${string}`>;
}

/**
 * addressList is an object of address of public super-call contract
 */
export const addressList: IAddressList = {
  lzSuperCall: {
    5: "0x12345",
    97: "0x12345",
    43113: "0x12345",
    80001: "0x12345",
    84531: "0x12345",
  },
  axSuperCall: {
    5: "0x12345", // TODO: public don't deployed yet (goerli)
    97: "0x98206CFfa3df6C8A83EC77fbce63C96ba7F4C4a4",
    43113: "0x65cf940df239ff0C90E8fa031DFEf6e586f8527B",
    80001: "0x4b47c7A769685321FB431F32F9790b45e889F78c",
    84531: "0x12345", // TODO: base goerli testnet
  },
};

export const getContractSupportedChainIds = (
  contractName: keyof typeof addressList
) => Object.keys(addressList[contractName]).map(Number);
