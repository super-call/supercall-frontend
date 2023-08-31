import React from "react";
import styled from "styled-components";

import Layout from "@/components/Layout/Layout";
import ManageABIView from "@/views/ManageABIView";

export const StyledContent = styled.div`
  padding: 15vh 5vw;
  background-color: #f5f5f5;
`;

export default function ManageABI() {
  return (
    <Layout>
      <StyledContent>
        <ManageABIView />
      </StyledContent>
    </Layout>
  );
}
