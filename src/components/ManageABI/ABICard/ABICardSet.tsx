import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Chain, useNetwork } from "wagmi";
import { Button, Col, Form, Input, Modal, Row, Select, Space } from "antd";

import { editContract, deleteContract } from "@/components/Toolbar/ImportABITool/userContractSlice"

const { TextArea } = Input;
const FormItem = Form.Item;

import ABICard from "./ABICard";
import { FunctionInput, parseFunctions } from "@/utils/abiUtils";
import { chainList } from "@/constants/chainList";

interface IABICardSet {
  contractData: {
    [key: number]: {
      contractName: string;
      contractAddress: string;
      contractABI: FunctionInput[];
    }[];
  };
}

export const ABICardSet = ({ contractData }: IABICardSet) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { chain, chains } = useNetwork();

  const dispatch = useDispatch();

  const onFinish = (values: {
    chainId: keyof typeof chainList;
    contractName: string;
    contractAddress: string;
    contractABI: string;
    key: number;
  }) => {
    const parseContractABI = parseFunctions(values.contractABI);

    dispatch(
      editContract({
        chainId: values.chainId,
        contractName: values.contractName,
        contractAddress: values.contractAddress,
        contractABI: parseContractABI,
        key: values.key,
      })
    );

    form.resetFields();
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const showModal = (
    chainId: string,
    abi: {
      contractName: string;
      contractAddress: string;
      contractABI: FunctionInput[];
    },
    key: number,
  ) => {
    form.setFieldsValue({
      contractName: abi.contractName,
      contractAddress: abi.contractAddress,
      chainId: +chainId,
      contractABI: JSON.stringify(abi.contractABI),
      key: key,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onDelete = (chainId: keyof typeof chainList, key: number) => {
    dispatch(deleteContract({ chainId, key }));
  }

  const ABICardSetComponent = () => {
    return Object.entries(contractData).map((contract) => {
      return contract[1].map((abi, key) => {
        return (
          <Col key={key} span={6}>
            <ABICard
              chainId={+contract[0]}
              abi={abi}
              showModal={() => showModal(contract[0], abi, key)}
              onDelete={() => onDelete(+contract[0] as keyof typeof chainList, key)}
            />
          </Col>
        );
      });
    });
  };
  return (
    <>
      <Row gutter={[32, 16]}>{ABICardSetComponent()}</Row>
      <Modal
        footer={null}
        title="Import Contract ABI"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={onFinish}>
          <Space direction="vertical" size={"small"} style={{ width: "100%" }}>
            <FormItem name="contractName" style={{ marginBottom: "0px" }}>
              <Input
                required
                placeholder="Contract Name"
              />
            </FormItem>
            <FormItem
              name="chainId"
              style={{ marginBottom: "0px" }}
              initialValue={chain?.id}
            >
              <Select
                disabled
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
            </FormItem>
            <FormItem name="contractAddress" style={{ marginBottom: "0px" }}>
              <Input required placeholder="Contract Address" />
            </FormItem>
            <FormItem name="contractABI" style={{ marginBottom: "0px" }}>
              <TextArea required rows={10} placeholder="Contract ABI" />
            </FormItem>
            <FormItem name="key" style={{ display: 'none' }} >
              <Input />
            </FormItem>
            <Button htmlType="submit" style={{ width: "100%" }} type="primary">
              Edit
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};
