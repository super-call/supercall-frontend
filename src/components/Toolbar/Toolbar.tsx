import React from "react";
import { StyledToolbar } from "./StyledToolbar";
import ToolbarItem from "./ToolbarItem";
import { PlayCircleOutlined } from "@ant-design/icons";
import theme from "@/styles/theme";
import NoSsr from "../NoSsr";

export default function Toolbar() {
  return (
    <NoSsr>
      <StyledToolbar>
        <ToolbarItem
          name="Execute"
          onClick={() => {}}
          color={theme.colors.primary}
          icon={<PlayCircleOutlined />}
          disabled={true}
        />
      </StyledToolbar>
    </NoSsr>
  );
}
