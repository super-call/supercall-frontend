import React from "react";
import { StyledToolbarDock } from "./StyledToolbarDock";
import ToolbarItem from "../ToolbarItem/ToolbarItem";
import {
  ImportOutlined,
  PlayCircleOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import theme from "@/styles/theme";
import NoSsr from "../../NoSsr";

export default function ToolbarDock() {
  return (
    <NoSsr>
      <StyledToolbarDock>
        <ToolbarItem
          name="Import ABI"
          onClick={() => {}}
          color={theme.colors.green}
          icon={<ImportOutlined />}
          disabled={true}
        />
        <ToolbarItem
          name="Call"
          onClick={() => {}}
          color={theme.colors.primary}
          icon={<PlayCircleOutlined />}
          disabled={true}
        />
        <ToolbarItem
          name="Share"
          onClick={() => {}}
          color={theme.colors.blue}
          icon={<ShareAltOutlined />}
          disabled={true}
        />
      </StyledToolbarDock>
    </NoSsr>
  );
}
