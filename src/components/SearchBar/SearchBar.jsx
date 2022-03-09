import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchSvg from "./SearchBarSvg.svg";




export default function SearchBar({searchQ}) {
  const [SearchQ, setSearchQ] = useState(searchQ  ?? "")

  let navigate = useNavigate();

  return (
    <>
    <StyledSearchBarContainer>
      <StyledSearchBarInput
        placeholder="Search..."
        type="text"
        value={SearchQ}
        onChange={({target}) => setSearchQ(target.value)}
        onKeyDown={({key})=> key === "Enter" && navigate(`/search/?q=${SearchQ}`)}
      />
      <StyledSearchBarButton  to={`/search/?q=${SearchQ}`}>
        <img src={SearchSvg} alt="" />
      </StyledSearchBarButton>
    </StyledSearchBarContainer>
    
  </>
  );
}

const StyledSearchBarContainer = styled.div`
  display: flex;
  flex: 0.3;
  padding: 5px;
  border-radius: 15px;
  border: 0;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.06);


  @media (max-width: 642px) {
    max-width: 300px   ;
    margin: auto;

  }


`;
const StyledSearchBarInput = styled.input`
  width: 100%;
  flex: 1;
  padding: 5px 1rem;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
`;
const StyledSearchBarButton = styled(Link)`
  border: none;
  max-width: 2rem;
  background: transparent;

  img {
    width:25px;
  }
  
`;
