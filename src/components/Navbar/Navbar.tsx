import React from "react";
import { StyledNavbar } from "./StyledNavbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { StyledLogo } from "./StyledLogo";
import Image from "next/image";

export default function Navbar() {
  return (
    <StyledNavbar>
      <StyledLogo>
        <Image
          src={"/images/branding/logo-main.png"}
          alt="logo"
          width={160}
          height={40}
        />
      </StyledLogo>
      <ConnectButton />
    </StyledNavbar>
  );
}
