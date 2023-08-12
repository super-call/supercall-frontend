import React from "react";
import { StyledToolbarItem } from "./StyledToolbarItem";

interface IProps {
  name: string;
  icon: string;
  children: React.ReactNode;
}

export default function ToolbarItem({ children }: IProps) {
  return <StyledToolbarItem></StyledToolbarItem>;
}
