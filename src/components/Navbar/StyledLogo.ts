import styled from "styled-components";

export const StyledLogo = styled.div`
  cursor: pointer;
  background-color: black;
  padding: 0 10px;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;
