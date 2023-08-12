import { IToolbarItem } from "@/types/propTypes";
import { styled } from "styled-components";

export const StyledToolbarItem = styled.div<Partial<IToolbarItem>>`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${({ color }) => color};
  border-radius: 0.5rem;
  color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  width: 55px;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;
