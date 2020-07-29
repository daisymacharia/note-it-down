import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const StyledImg = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 20%;
  background-color: #4563eb;

  img {
    width: 100%;
    height: 100%;
    border-radius: 20%;
    background-color: transparent;
  }
`;
export const Avatar = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <StyledImg>
        <img src={user.picture} alt={user.name} />
      </StyledImg>
    )
  );
};
