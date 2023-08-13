import theme from "@/styles/theme";
import { ShareAltOutlined } from "@ant-design/icons";
import React from "react";
import ToolbarItem from "./ToolbarItem/ToolbarItem";

export default function ShareTool() {
  return (
    <ToolbarItem
      name="Share"
      onClick={() => {}}
      color={theme.colors.blue}
      icon={<ShareAltOutlined />}
      disabled={true}
    />
  );
}
