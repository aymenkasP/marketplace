import styled from "styled-components";
import logout from "./logout.svg";

export default function LogoutBtn({handelLogout}) {

  return (
    
      <StyledButton type="button" onClick={()=> handelLogout()} >
        <StyledImg src={logout} alt="logout" />
      </StyledButton> 

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
