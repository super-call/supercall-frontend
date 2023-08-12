import React from "react";
import { StyledNavbar } from "./StyledNavbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { styled } from "styled-components";

const StyledLogo = styled(Image)`
  cursor: default;
  margin-top: 0.3rem;
`;

export default function Navbar() {
  return (
    <StyledNavbar>
      <StyledLogo
        src={"/images/branding/logo-main.png"}
        alt="logo"
        width={160}
        height={40}
      />
      <ConnectButton />
    </StyledNavbar>
  );
}
