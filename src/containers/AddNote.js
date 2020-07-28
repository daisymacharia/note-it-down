import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { CustomEditor } from "../components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 1rem;
  grid-area: 2/2/-1/-1;
`;

const NewNote = ({ displayedNote }) => {
  const [createNote] = useMutation(NEW_NOTE, {
    update(cache, { data: { createNote } }) {
      const { allNotes } = cache.readQuery({ query: NOTES_QUERY });
      cache.writeQuery({
        query: NOTES_QUERY,
        data: { allNotes: allNotes.concat([createNote]) },
      });
    },
  });

  return (
    <Container>
      <CustomEditor displayedNote={displayedNote} createNote={createNote} />
    </Container>
  );
};

export default NewNote;

const NEW_NOTE = gql`
  mutation createNote($title: String!, $body: String!) {
    createNote(input: { title: $title, body: $body }) {
      _id
      title
      body
      date
    }
  }
`;

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
