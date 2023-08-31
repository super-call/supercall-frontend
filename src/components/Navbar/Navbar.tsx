import React from "react";
import { StyledNavbar } from "./StyledNavbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { styled } from "styled-components";
import NoSsr from "../NoSsr";
import { Space } from "antd";
import Menu from "../Menu/Menu";

const StyledLogo = styled(Image)`
  cursor: default;
  margin-top: 0.3rem;
`;

export default function Navbar() {
  return (
    <NoSsr>
      <StyledNavbar>
        <Space size={30}>
          <StyledLogo
            src={"/images/branding/logo-main.png"}
            alt="logo"
            width={160}
            height={40}
          />
          <Menu />
        </Space>
        <ConnectButton />
      </StyledNavbar>
    </NoSsr>
  );
}
