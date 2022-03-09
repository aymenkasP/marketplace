import React from "react";
import styled from "styled-components";

export default function Notification({ Message, variant }) {
  return (
    <StyledNotificationContainer $variant={variant}>
      <p>{Message} </p>
    </StyledNotificationContainer>
  );
}

const StyledNotificationContainer = styled.div`
  background-color: ${(props) =>
    props.$variant === "error" ? "#e26868" : "#54c354"};
  border-radius: 5px;
  padding: 1rem;
  margin-top: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  color: whitesmoke;
`;
