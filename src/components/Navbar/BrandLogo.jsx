import { Link } from "react-router-dom";
import styled from "styled-components";

 
export default function BrandLogo() {
    return (
      <StyledBrand to="/home" >
        <span >Gaming accessories</span>
      </StyledBrand>
    );
  }



  const StyledBrand = styled(Link)`
    text-decoration: none;
    font-size:1.3rem;
    font-weight: bold;
    color: black;
  `