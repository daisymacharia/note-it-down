import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AllNotes, NewNote } from "./";

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(250px, 2fr);
`;

const AddNoteButton = styled.button`
  height: 3rem;
  width: 3rem;
  position: absolute;
  left: 80px;
  bottom: 4rem;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  background-color: #3c2bb0;
  outline: none;
  cursor: pointer;
`;

const Page = () => {
  const [displayedNote, setDisplayedNote] = useState("new");
  const { loading, error, data } = useQuery(NOTES_QUERY);

  useEffect(() => {
    if (data?.allNotes.length === 0) {
      setDisplayedNote("new");
    } else {
      setDisplayedNote(data?.allNotes[0]);
    }
  }, [data]);

  const selectNote = (e, note) => {
    console.log(note);

    let target_id = note;
    let selected = "";
    if (target_id !== "new") {
      selected = data.allNotes.find((note) => {
        return note._id === target_id;
      });
    } else {
      selected = "new";
    }
    setDisplayedNote(selected);
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <PageWrapper>
      <AddNoteButton>+</AddNoteButton>
      <AllNotes data={data} selectNote={selectNote} />
      <NewNote displayedNote={displayedNote} />
    </PageWrapper>
  );
};

export default Page;

const NOTES_QUERY = gql`
  {
    allNotes {
      title
      body
      _id
      date
    }
  }
`;
