import { erc20ABI } from "wagmi";
import { loggerABI } from "./abi/loggerABI";
import { create3DeployerABI } from "./abi/create3DeployerABI";
import { uniswapV2RouterABI } from "./abi/uniswapV2RouterABI";
import { compoundABI } from "./abi/compoundABI";
import { axSuperCallABI } from "./abi/axSuperCallABI";

export const DEFAULT_USER_CONTRACTS = {
  5: [
    {
      contractName: "Logger",
      contractAddress: "",
      contractABI: loggerABI,
    },
    {
      contractName: "Create3Deployer",
      contractAddress: "",
      contractABI: create3DeployerABI,
    },
    {
      contractName: "aUSDC",
      contractAddress: "",
      contractABI: erc20ABI,
    },
    {
      contractName: "USDC",
      contractAddress: "",
      contractABI: erc20ABI,
    },
    {
      contractName: "cUSDC",
      contractAddress: "",
      contractABI: erc20ABI,
    },
    {
      contractName: "UniswapV2Router",
      contractAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      contractABI: uniswapV2RouterABI,
    },
    {
      contractName: "CompoundUSDC",
      contractAddress: "0x73506770799Eb04befb5AaE4734e58C2C624F493",
      contractABI: compoundABI,
    },
    {
      contractName: "AxlSuperCall",
      contractAddress: "0x7F83B301e5Faa1d98bD9D4607932dC40D32f4b25",
      contractABI: axSuperCallABI,
    },
  ],
  97: [
    {
      contractName: "Logger",
      contractAddress: "0xB6B506A3D6f6B240743a12dF159C04FA02e88eAD",
      contractABI: loggerABI,
    },
    {
      contractName: "Create3Deployer",
      contractAddress: "0x0a999C725d7970D53AEA917c8157Af45Cfa76931",
      contractABI: create3DeployerABI,
    },
    {
      contractName: "aUSDC",
      contractAddress: "0xc2fA98faB811B785b81c64Ac875b31CC9E40F9D2",
      contractABI: erc20ABI,
    },
    {
      contractName: "USDC",
      contractAddress: "",
      contractABI: erc20ABI,
    },
    {
      contractName: "cUSDC",
      contractAddress: "",
      contractABI: erc20ABI,
    },
    {
      contractName: "UniswapV2Router",
      contractAddress: "",
      contractABI: uniswapV2RouterABI,
    },
    {
      contractName: "CompoundUSDC",
      contractAddress: "",
      contractABI: compoundABI,
    },
    {
      contractName: "AxlSuperCall",
      contractAddress: "0x98206CFfa3df6C8A83EC77fbce63C96ba7F4C4a4",
      contractABI: axSuperCallABI,
    },
  ],
  80001: [
    {
      contractName: "Logger",
      contractAddress: "0x0F127602472aA90E53Df43Eb42C0dFA4b4Dc0470",
      contractABI: loggerABI,
    },
    {
      contractName: "Create3Deployer",
      contractAddress: "0xB6B506A3D6f6B240743a12dF159C04FA02e88eAD",
      contractABI: create3DeployerABI,
    },
    {
      contractName: "aUSDC",
      contractAddress: "0x2c852e740B62308c46DD29B982FBb650D063Bd07",
      contractABI: erc20ABI,
    },
    {
      contractName: "USDC",
      contractAddress: "",
      contractABI: erc20ABI,
    },
    {
      contractName: "cUSDC",
      contractAddress: "",
      contractABI: erc20ABI,
    },
    {
      contractName: "UniswapV2Router",
      contractAddress: "",
      contractABI: uniswapV2RouterABI,
    },
    {
      contractName: "CompoundUSDC",
      contractAddress: "",
      contractABI: compoundABI,
    },
    {
      contractName: "AxlSuperCall",
      contractAddress: "0x4b47c7A769685321FB431F32F9790b45e889F78c",
      contractABI: axSuperCallABI,
    },
  ],
  43113: [
    {
      contractName: "Logger",
      contractAddress: "0x12131300Ca945c57DAB73eDd39F268E7849Aedc9",
      contractABI: loggerABI,
    },
    {
      contractName: "Create3Deployer",
      contractAddress: "0x929554307Ca5a4D98BB8c94059b4d43A80E56Feb",
      contractABI: create3DeployerABI,
    },
    {
      contractName: "aUSDC",
      contractAddress: "0x57F1c63497AEe0bE305B8852b354CEc793da43bB",
      contractABI: erc20ABI,
    },
    {
      contractName: "USDC",
      contractAddress: "",
      contractABI: erc20ABI,
    },
    {
      contractName: "cUSDC",
      contractAddress: "",
      contractABI: erc20ABI,
    },
    {
      contractName: "UniswapV2Router",
      contractAddress: "",
      contractABI: uniswapV2RouterABI,
    },
    {
      contractName: "CompoundUSDC",
      contractAddress: "",
      contractABI: compoundABI,
    },
    {
      contractName: "AxlSuperCall",
      contractAddress: "0x65cf940df239ff0C90E8fa031DFEf6e586f8527B",
      contractABI: axSuperCallABI,
    },
  ],
  84531: [
    {
      contractName: "Logger",
      contractAddress: "0x0363C7aba28781851072AfF932320d9a2e2A3A86",
      contractABI: loggerABI,
    },
    {
      contractName: "Create3Deployer",
      contractAddress: "0x98B2920D53612483F91F12Ed7754E51b4A77919e",
      contractABI: create3DeployerABI,
    },
    {
      contractName: "aUSDC",
      contractAddress: "0x254d06f33bDc5b8ee05b2ea472107E300226659A",
      contractABI: erc20ABI,
    },
    {
      contractName: "USDC",
      contractAddress: "",
      contractABI: erc20ABI,
    },
    {
      contractName: "cUSDC",
      contractAddress: "",
      contractABI: erc20ABI,
    },
    {
      contractName: "UniswapV2Router",
      contractAddress: "",
      contractABI: uniswapV2RouterABI,
    },
    {
      contractName: "CompoundUSDC",
      contractAddress: "",
      contractABI: compoundABI,
    },
    {
      contractName: "AxlSuperCall",
      contractAddress: "0xEC90f612c5950631e5deBd190B40b4BAd1cB1173",
      contractABI: axSuperCallABI,
    },
  ],
  4002: [
    {
      contractName: "Logger",
      contractAddress: "0x0C2e2D97e909AEA694A764De22a3D87B4faee1C0",
      contractABI: loggerABI,
    },
    {
      contractName: "Create3Deployer",
      contractAddress: "0x77d191875d0EA3dd3Dc259ED3363A41653203e69",
      contractABI: create3DeployerABI,
    },
    {
      contractName: "aUSDC",
      contractAddress: "0x75Cc4fDf1ee3E781C1A3Ee9151D5c6Ce34Cf5C61",
      contractABI: erc20ABI,
    },
    {
      contractName: "USDC",
      contractAddress: "",
      contractABI: erc20ABI,
    },
    {
      contractName: "cUSDC",
      contractAddress: "",
      contractABI: erc20ABI,
    },
    {
      contractName: "UniswapV2Router",
      contractAddress: "",
      contractABI: uniswapV2RouterABI,
    },
    {
      contractName: "CompoundUSDC",
      contractAddress: "",
      contractABI: compoundABI,
    },
    {
      contractName: "AxlSuperCall",
      contractAddress: "0x59F568e1CFBFc0187074f2CC0055C4cF090AFa3f",
      contractABI: axSuperCallABI,
    },
  ],
};
