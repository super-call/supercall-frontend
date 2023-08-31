import theme from "@/styles/theme";
import { ShareAltOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ToolbarItem from "../ToolbarItem/ToolbarItem";
import { Divider, Modal, Spin } from "antd";
import styled from "styled-components";
import { Input, Button } from "antd";
import { useSelector } from "react-redux";
import { nodeDataState } from "@/components/Flow/nodeDataSlice";
import superCallService from "@/services/supercallService";
import { RootState } from "@/store";

export default function ShareTool() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const { canvasData, nodeEdges } = useSelector(
    (state: { nodeData: nodeDataState }) => {
      return state.nodeData;
    }
  );

  const nodeState = useSelector((state: { callNode: RootState }) => {
    return state.callNode;
  });

  const handleClick = () => {
    setLoading(true);
    const data = { nodeData: canvasData.nodes, nodeState, nodeEdges };
    superCallService
      .createSuperCall(data)
      .then((res) => {
        setUrl(window.location.origin + `/${res.data.insertedId}`);
        setLoading(false);
        showModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const StyledTitle = styled.h1`
    font-size: 1.5em;
    font-weight: bold;
    color: ${theme.colors.black};
  `;

  const StyledParagraph = styled.p`
    font-size: 1em;
    font-weight: normal;
    color: ${theme.colors.gray};
  `;

  const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `;

  return (
    <>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <StyledTitle>Share something awesome</StyledTitle>
        <StyledParagraph>
          Give your friends access to this presets and start using it together
          easily in SuperCall.
        </StyledParagraph>
        <Divider />
        <StyledContainer>
          <Input
            value={url}
            style={{ marginRight: "5px" }}
            disabled={true}
            size="large"
          />
          <Button
            onClick={() => {
              navigator.clipboard.writeText(url);
            }}
            type="primary"
            size="large"
          >
            Copy Link
          </Button>
        </StyledContainer>
      </Modal>

      <ToolbarItem
        disabled={loading}
        name="Share"
        onClick={handleClick}
        color={theme.colors.blue}
        icon={
          loading ? (
            <Spin style={{ marginBottom: "2px" }} />
          ) : (
            <ShareAltOutlined />
          )
        }
      />
    </>
  );
}
