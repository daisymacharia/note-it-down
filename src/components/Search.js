import React, { useState } from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  border-radius: 4px;
  border: solid 0.06rem #d9d9dd;
  height: 3rem;
  margin: 0 0.5rem;
  padding: 0 1rem;
  background: transparent;
`;

const Search = ({ handleKeyDown }) => {
  const [searchValue, setValue] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    let value = event.target.value;
    setValue(value);
  };

  return (
    <SearchInput
      value={searchValue}
      onChange={handleChange}
      onKeyDown={(e) => handleKeyDown(e, searchValue)}
      placeholder="Search notes here"
    />
  );
};

export default Search;
