import React from "react";
import { StyledLayout } from "./StyledLayout";
import Navbar from "../Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StyledLayout>
      <Navbar />
      {children}
    </StyledLayout>
  );
}
