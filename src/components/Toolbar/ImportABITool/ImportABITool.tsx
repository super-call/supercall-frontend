import React, { useState } from "react";
import { Input, Modal, Select, Space, Button, Form } from "antd";
import theme from "@/styles/theme";
import { ImportOutlined } from "@ant-design/icons";
import ToolbarItem from "../ToolbarItem/ToolbarItem";
import { useDispatch } from "react-redux";
import { useNetwork } from "wagmi";
import { addContract } from "./userContractSlice";
import { parseFunctions } from "@/utils/abiUtils";
import { chainList } from "@/constants/chainList";

const { TextArea } = Input;

export default function ImportABITool() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { chain, chains } = useNetwork();

  const dispatch = useDispatch();

  const onFinish = (values: {
    chainId: keyof typeof chainList;
    contractName: string;
    contractAddress: string;
    contractABI: string;
  }) => {
    const parseContractABI = parseFunctions(values.contractABI);

    dispatch(
      addContract({
        chainId: values.chainId,
        contractName: values.contractName,
        contractAddress: values.contractAddress,
        contractABI: parseContractABI,
      })
    );

    form.resetFields();
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
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
        <Form form={form} onFinish={onFinish}>
          <Space direction="vertical" size={"small"} style={{ width: "100%" }}>
            <Form.Item name="contractName" style={{ marginBottom: "0px" }}>
              <Input required placeholder="Contract Name" />
            </Form.Item>
            <Form.Item
              name="chainId"
              style={{ marginBottom: "0px" }}
              initialValue={chain?.id}
            >
              <Select
                placeholder="Contract Chain"
                style={{ width: "100%" }}
                options={[
                  ...chains?.map((chain) => {
                    return {
                      value: chain.id,
                      label: chain.name,
                    };
                  }),
                ]}
              />
            </Form.Item>
            <Form.Item name="contractAddress" style={{ marginBottom: "0px" }}>
              <Input required placeholder="Contract Address" />
            </Form.Item>
            <Form.Item name="contractABI" style={{ marginBottom: "0px" }}>
              <TextArea required rows={10} placeholder="Contract ABI" />
            </Form.Item>
            <Button htmlType="submit" style={{ width: "100%" }} type="primary">
              Import
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
}
