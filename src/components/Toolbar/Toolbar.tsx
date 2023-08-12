import React from "react";
import { StyledToolbar } from "./StyledToolbar";
import ToolbarItem from "./ToolbarItem";
import {
  PlayCircleOutlined,
  ShareAltOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import theme from "@/styles/theme";
import NoSsr from "../NoSsr";

export default function Toolbar() {
  return (
    <NoSsr>
      <StyledToolbar>
        <ToolbarItem
          name="Contracts"
          onClick={() => {}}
          color={theme.colors.green}
          icon={<UnorderedListOutlined />}
          disabled={true}
        />
        <ToolbarItem
          name="Execute"
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
      </StyledToolbar>
    </NoSsr>
  );
}
