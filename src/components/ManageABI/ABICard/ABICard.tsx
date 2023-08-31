import { ChainID, chainList } from "@/constants/chainList";
import { FunctionInput } from "@/utils/abiUtils";
import { DeleteTwoTone } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import React from "react";
import styled from "styled-components";
import Image from "next/image";

export const StyledNodeBackdrop = styled.div`
  border-radius: 5px;
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  top: 4px;
  left: 4px;
  background-color: black;
`;

export const StyledCallNode = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  color: #000;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid #000;
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

interface IABICard {
  chainId: number;
  abi: {
    contractName: string;
    contractAddress: string;
    contractABI: FunctionInput[];
  };
  showModal: () => void;
  onDelete: () => void;
}

export default function ABICard({
  chainId,
  abi,
  showModal,
  onDelete,
}: IABICard) {
  const Header = () => {
    return (
      <StyledHeader>
        <div>
          <Image
            src={`/images/chain/${chainId}.png`}
            alt={`${chainId}`}
            width={40}
            height={40}
          />
        </div>
        <h4 style={{ fontSize: 16 }}>{chainList[chainId as ChainID].name}</h4>
      </StyledHeader>
    );
  };
  return (
    <div style={{ position: "relative" }}>
      <StyledCallNode>
        <Card
          title={<Header />}
          // extra={<a href="#">More</a>}
          style={{ border: "none", width: "100%", padding: 0 }}
        >
          <div>
            <div style={{ fontWeight: 700 }}>Contract Name</div>
            <div>{abi.contractName}</div>
          </div>
          <div style={{ margin: "20px 0px" }}>
            <div style={{ fontWeight: 700 }}>Contract Function</div>
            <div>
              {abi.contractABI.filter((input, key) => key < 3).map((input, key) => (
                <div
                  key={key}
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {input.name}
                </div>
              ))}
              {abi.contractABI.length <= 3 ? <div />: <div>...</div>}
            </div>
          </div>
          <Button
            type="primary"
            style={{ width: "100%", background: "#343434" }}
            onClick={showModal}
          >
            Edit
          </Button>
        </Card>
      </StyledCallNode>
      <DeleteTwoTone
        twoToneColor="#DBDBDB"
        style={{ position: "absolute", right: 15, top: 15 }}
        onClick={onDelete}
      />
      {/* <StyledNodeBackdrop /> */}
    </div>
  );
}
