import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "./Avatar.svg";

export default function AccountAvatar({userId}) {
  return (
    <Link to={ `profile/${userId}` } >
      <StyledButton type="button">
        <Img src={Avatar} alt="Profile" />
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
const Img = styled.img`
  width: 100%;
`;
