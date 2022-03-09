import { Link } from "react-router-dom";
import styled from "styled-components";





export default function NavBtnSignLogin({ handelLogout }) {
  return (
    <StyledBtnContainer>
      <StyledBtnLink $inputColor="transparent" to="login">Log in</StyledBtnLink>
      <StyledBtnLink  to="signup"> Sign up </StyledBtnLink>
    </StyledBtnContainer>
  );
}

const StyledBtnContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap:1rem;
`;

const StyledBtnLink = styled(Link)`
 
  background-clip: padding-box;
  background-color:  ${props => props.$inputColor || "black"};
  border: 1px solid transparent;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: ${props => props.$inputColor === "transparent" ? "black" : "white"};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.25;
  padding: calc(.50rem - 1px) calc(1.5rem - 1px);
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  
  width: auto;

    &:hover , &:focus {
      background-color: #444343;
      color: white;
}
    

`
