import { Link } from "react-router-dom";
import styled from "styled-components";
import Messages from "./Messages.svg";

export default function AccountMessages() {
  return (
    <Link to={ `messages` } >
      <StyledButton type="button">
        <StyledImg src={Messages} alt="Messages" />
      </StyledButton> 
    </Link>
  );
}

const StyledButton = styled.button`
  display: flex;
  background: whitesmoke;
  border-radius: 22px;
  padding: 9px;
  border: none;
  width: 37px;
  cursor: pointer;
`;
const StyledImg = styled.img`
  width: 100%;
`;
