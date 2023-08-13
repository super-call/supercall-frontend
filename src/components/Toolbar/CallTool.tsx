import React from "react";
import ToolbarItem from "./ToolbarItem/ToolbarItem";
import theme from "@/styles/theme";
import { PlayCircleOutlined } from "@ant-design/icons";

export default function CallTool() {
  return (
    <ToolbarItem
      name="Call"
      onClick={() => {}}
      color={theme.colors.primary}
      icon={<PlayCircleOutlined />}
      disabled={true}
    />
  );
}
