export interface EventInput {
  anonymous: boolean;
  inputs: {
    indexed: boolean;
    internalType: string;
    name: string;
    type: string;
  }[];
  name: string;
  type: string;
}

export interface FunctionInput {
  inputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  name: string;
  outputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  stateMutability: string;
  type: string;
}

export function parseEvents(json: string): EventInput[] {
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      return parsed.filter((item) => item.type === "event") as EventInput[];
    }
    return [];
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
}

export function parseFunctions(json: string): FunctionInput[] {
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item) => item.type === "function"
      ) as FunctionInput[];
    }
    return [];
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
}
