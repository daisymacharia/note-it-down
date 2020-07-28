import React from "react";
import styled from "styled-components";

const SearchButton = styled.button`
  position: ${(props) => (props.position ? props.position : "relative")};
  border-radius: 4px;
  font-size: 13px;
  padding: 0.5rem;
  color: white;
  border: none;
  background-color: #4563eb;
  margin: 0.35em 0 0.35rem 0.35rem;
  right: ${(props) => (props.right ? props.right : "unset")};
  justify-self: ${(props) => (props.justifySelf ? props.justifySelf : "unset")};
`;

const Search = (props) => {
  return <SearchButton {...props} />;
};

export default Search;
