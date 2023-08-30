export const create3DeployerABI = [
  {
    inputs: [],
    name: "AlreadyDeployed",
    type: "error",
  },
  {
    inputs: [],
    name: "DeployFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptyBytecode",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInit",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "bytecodeHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "deployedAddress",
        type: "address",
      },
    ],
    name: "Deployed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "bytecode",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
    ],
    name: "deploy",
    outputs: [
      {
        internalType: "address",
        name: "deployedAddress_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "bytecode",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "init",
        type: "bytes",
      },
    ],
    name: "deployAndInit",
    outputs: [
      {
        internalType: "address",
        name: "deployedAddress_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
    ],
    name: "deployedAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
