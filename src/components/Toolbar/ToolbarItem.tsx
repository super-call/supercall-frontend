import React from "react";
import { StyledToolbarItem } from "./StyledToolbarItem";
import { Tooltip } from "antd";
import theme from "@/styles/theme";
import { IToolbarItem } from "@/types/propTypes";

export default function ToolbarItem({
  name,
  onClick,
  icon,
  color = theme.colors.black,
  disabled,
}: IToolbarItem): JSX.Element {
  return (
    <Tooltip title={name} color={color} key={name}>
      <StyledToolbarItem
        color={color}
        onClick={() => {
          if (disabled) return;
          onClick();
        }}
        disabled={disabled}
      >
        {icon}
      </StyledToolbarItem>
    </Tooltip>
  );
}
