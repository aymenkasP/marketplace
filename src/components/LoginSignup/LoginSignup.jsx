import React from "react";
import styled from "styled-components";

export default function LoginSignup({ children }) {
  return (
    <>
      <StyledPageContainer>
        <StyledCard>{children}</StyledCard>
      </StyledPageContainer>
    </>
  );
}

const StyledPageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;

  .alert {
    background-color: rgba(250, 102, 102, 0.767);
    padding: 0.1rem 1.4rem;
    width: 100%;
    font-weight: 500;
    border-radius: 5px;
    color: whitesmoke;
    text-align: center;
    text-transform: capitalize;
  }

  button {
    border: none;
    width: 100%;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    margin-top: 1rem;
    cursor: pointer;
    background-color: black;
    color: white;
  }

  .dont-have-an-account {
    margin-top: 2rem;
    margin-bottom: 1.7rem;
  }
`;

const StyledCard = styled.div`
  display: grid;
  
  place-items: center;
  gap: 1rem;
  padding: 1rem 3rem;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 5px 5px 10px #dbdbdb, -5px -5px 10px #ffffff;
`;
