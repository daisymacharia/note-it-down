import React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  border-radius: 4px;
  border: solid 0.06rem #d9d9dd;
  height: 3rem;
  margin: 0 0.5rem;
  padding: 0 1rem;
  background: transparent;
`;
const Search = () => {
  return <SearchInput placeholder="Search notes here" />;
};

export default Search;
