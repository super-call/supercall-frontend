export const shortHash = (hash: string) => `${hash.slice(0, 4)}...${hash.slice(hash.length - 4)}`;

export const hashToURL = (hash: string) => `https://testnet.axelarscan.io/gmp/${hash}`;