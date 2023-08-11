import React from "react";
import { StyledNavbar } from "./StyledNavbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { StyledLogo } from "./StyledLogo";

export default function Navbar() {
  return (
    <StyledNavbar>
      <StyledLogo>SuperCall</StyledLogo>
      <ConnectButton />
    </StyledNavbar>
  );
}
