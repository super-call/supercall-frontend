import React, { useState } from "react";
import { Input, Modal, Select, Space, Button, Form } from "antd";
import { useNetwork } from "wagmi";
import { CheckCircleTwoTone, FormOutlined } from "@ant-design/icons";
import { hashToURL, shortHash } from "@/utils/hashUtils";

const { TextArea } = Input;

interface ISuccessModal {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  hash: string;
}

export default function SuccessModal({
  isModalOpen,
  handleOk,
  handleCancel,
  hash,
}: ISuccessModal) {
  return (
    <Modal
      footer={null}
      title=""
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Space direction="vertical" size={"small"} style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CheckCircleTwoTone twoToneColor="#08B153" style={{ fontSize: 60 }} />
        </div>
        <h3 style={{ textAlign: "center" }}>Transaction Successfully</h3>
        <p style={{ color: "#808080", textAlign: "center" }}>
          Your supercall transaction was successful!
        </p>
        <Button type="link" block style={{ color: "#9DC4F8" }}>
          <a href={hashToURL(hash)} target="_blank">
            {shortHash(hash)}
            <FormOutlined twoToneColor="#9DC4F8" style={{ color: "#9DC4F8" }} />
          </a>
        </Button>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button value="large" style={{ width: "176px", height: "40px" }} onClick={handleCancel}>
            Done
          </Button>
        </div>
      </Space>
    </Modal>
  );
}
