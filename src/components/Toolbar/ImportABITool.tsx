import React, { useState } from "react";
import { Input, Modal, Select, Space, Button } from "antd";
import theme from "@/styles/theme";
import { ImportOutlined } from "@ant-design/icons";
import ToolbarItem from "./ToolbarItem/ToolbarItem";
import { getSupportedChainConfigs } from "@/constants/chainList";

const { TextArea } = Input;

export default function ImportABITool() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        name="Import ABI"
        onClick={showModal}
        color={theme.colors.green}
        icon={<ImportOutlined />}
      />
      <Modal
        footer={null}
        title="Import Contract ABI"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input placeholder="Contract Name" />
          <Select
            placeholder="Contract Chain"
            style={{ width: "100%" }}
            options={[
              ...getSupportedChainConfigs().map((chain) => {
                return {
                  value: chain.id,
                  label: chain.name,
                };
              }),
            ]}
          />
          <Input placeholder="Contract Address" />
          <TextArea rows={10} placeholder="Contract ABI" />
          <Button style={{ width: "100%" }} type="primary">
            Import
          </Button>
        </Space>
      </Modal>
    </>
  );
}
