import React from "react";
import styled from "styled-components";

import { getSupportedChainConfigs } from "@/constants/chainList";
import { Button, Space } from "antd";

export const StyledButton = styled(Button)`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  color: #000;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid #000;

  &:hover {
    background-color: #000;
    color: white !important;
    border-color: #000 !important;
  }
`;

interface IFilterChain {
  selectedChain: number;
  setSelectedChain: (id: number) => void;
}

export default function FilterChain({
  selectedChain,
  setSelectedChain,
}: IFilterChain) {
  return (
    <Space>
      <StyledButton
        key={-1}
        size="large"
        style={
          selectedChain === -1 ? { background: "#000", color: "white" } : {}
        }
        onClick={() => setSelectedChain(-1)}
      >
        All
      </StyledButton>
      {getSupportedChainConfigs().map((chain) => (
        <StyledButton
          key={chain.id}
          size="large"
          onClick={() => setSelectedChain(chain.id)}
          style={
            selectedChain === chain.id
              ? { background: "#000", color: "white" }
              : {}
          }
        >
          {chain.name}
        </StyledButton>
      ))}
    </Space>
  );
}
