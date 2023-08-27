import React, { useEffect, useMemo, useState } from "react";
import ToolbarItem from "./ToolbarItem/ToolbarItem";
import theme from "@/styles/theme";
import { HistoryOutlined } from "@ant-design/icons";
import { Button, Card, Input, Modal, Space } from "antd";
import { fromHex } from "viem";

import { createClient } from "@layerzerolabs/scan-client";

const covalentChainName = (chainID: number) => {
  switch (chainID) {
    case 10106:
      return "avalanche-testnet"; // Avalanche Fuji Testnet
    case 10109:
      return "matic-mumbai"; // mumbai
    case 10112:
      return "fantom-testnet"; // fantom
    case 10102:
      return "bsc-testnet"; // bsc
    case 10160:
      return "base-testnet"; // base
    case 10132:
      return "optimism-goerli"; // op goerli
    default:
      return "";
  }
};
function isTransactionHash(str: string) {
  // Ethereum transaction hash should be a 64-character hexadecimal string
  const transactionHashRegex = /^[0-9a-fA-F]{64}$/;
  return transactionHashRegex.test(str);
}

const chainName = (chainID: number) => {
  switch (chainID) {
    case 10106:
      return "Avalanche Fuji Testnet"; // Avalanche Fuji Testnet
    case 10109:
      return "Mumbai Testnet"; // mumbai
    case 10112:
      return "Fantom Testnet"; // fantom
    case 10102:
      return "BSC Testnet"; // bsc
    case 10160:
      return "Base Testnet"; // base
    case 10132:
      return "Optimism Goerli Testnet"; // op goerli
    default:
      return "";
  }
};

function HeaderBox(messageID: string, status: string) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>MessageID: {messageID}</div>
      <div>{status}</div>
    </div>
  );
}

function Box({ detail }: any) {
  return (
    <Card title={HeaderBox(detail?.srcTxHash || "", detail?.status || "")}>
      <div>Source Chain: {chainName(detail?.srcChainId || -1)}</div>
      <div>Destination Chain: {chainName(detail?.dstChainId || -1)}</div>
      <div>Result: {detail.logging}</div>
    </Card>
  );
}

export default function HistoryTool() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [txHash, setTxHash] = useState(
    "0x90b00331f0b44f4cf89cb3de911c267fe8945050d3bd260d0815f0575d3b5b1d"
  );

  const [log, setLog] = useState<any>([]);

  useEffect(() => {
    // fetchingResult(txHash);
  }, []);

  const fetchingResult = async (txHash: string) => {
    const client = createClient("testnet");

    if (txHash.length <= 0) {
      console.error("transaction hash is empty");
      return;
    }

    const { messages } = await client.getMessagesBySrcTxHash(txHash);

    const results = await Promise.all(
      messages.map(async (message) => {
        // Covalent
        const chainName: string = covalentChainName(messages[0].dstChainId);
        const url = `https://api.covalenthq.com/v1/${chainName}/transaction_v2/${
          messages[0].dstTxHash || ""
        }/?`;

        let headers = new Headers();
        headers.set(
          "Authorization",
          `Bearer ${process.env.NEXT_PUBLIC_COVALENT_KEY}`
        );

        const res = await fetch(url, { method: "GET", headers: headers });
        const { data } = await res.json();
        // console.log(data.items[0].log_events[0]);
        const logging = fromHex(
          data.items[0].log_events[0].raw_log_data,
          "string"
        );

        return {
          ...message,
          logging: logging,
        };
      })
    );

    // console.log(results);

    setLog(results);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ToolbarItem
        name="History"
        onClick={showModal}
        color={theme.colors.black}
        icon={<HistoryOutlined />}
      />
      <Modal
        footer={null}
        title="History"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input value={txHash} onChange={(e) => setTxHash(e.target.value)} />
          <Button
            style={{ width: "100%", backgroundColor: theme.colors.black }}
            type="primary"
            onClick={() => fetchingResult(txHash)}
          >
            search
          </Button>
          {log.length > 0 &&
            log.map((detail: any, key: number) => (
              <Box key={key} detail={detail} />
            ))}
          <Button
            style={{ width: "100%", backgroundColor: theme.colors.black }}
            type="primary"
            onClick={handleCancel}
          >
            Close
          </Button>
        </Space>
      </Modal>
    </>
  );
}
