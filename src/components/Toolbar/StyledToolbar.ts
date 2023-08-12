import { styled } from "styled-components";

export const StyledToolbar = styled.div`
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0.9rem;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: #fff;
  box-sizing: border-box;
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
`;
