import React from "react";
import { StyledToolbar } from "./StyledToolbar";
import ToolbarItem from "./ToolbarItem";
import { PlayCircleOutlined } from "@ant-design/icons";
import theme from "@/styles/theme";

export default function Toolbar() {
  return (
    <StyledToolbar>
      <ToolbarItem
        name="Execute"
        onClick={() => {}}
        color={theme.colors.primary}
        icon={<PlayCircleOutlined />}
        disabled={true}
      />
    </StyledToolbar>
  );
}
