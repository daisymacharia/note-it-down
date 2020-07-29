import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useApolloClient } from "@apollo/client";
import { Button } from "./";

const LoginButton = () => {
  const client = useApolloClient();
  const { logout } = useAuth0();

  return (
    <Button justifySelf="end" onClick={() => logout()}>
      Log Out
    </Button>
  );
};

export default LoginButton;
