import React from "react";
import { CustomEditor } from "../components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Container } from "./AddNote";

const NOTE_QUERY = gql`
  query getNote($_id: ID!) {
    getNote(_id: $_id) {
      _id
      title
      body
      participants {
        name
      }
      organization
      date
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation updateNote(
    $_id: ID!
    $organization: String!
    $participants: [PersonInput]!
    $title: String
    $body: String
  ) {
    updateNote(
      _id: $_id
      input: {
        organization: $organization
        participants: $participants
        title: $title
        body: $body
      }
    ) {
      _id
      title
      body
    }
  }
`;

const UpdateNote = ({ displayedNote, deleteNote }) => {
  const { loading, error, data } = useQuery(NOTE_QUERY, {
    variables: {
      _id: displayedNote?._id,
    },
  });
  const [updateNote] = useMutation(UPDATE_NOTE);

  if (loading) return <div>Fetching note</div>;
  if (error) return <div>Error fetching note</div>;

  const note = data;

  return (
    <Container>
      <CustomEditor
        displayedNote={note.getNote}
        updateNote={() => updateNote()}
        deleteNote={deleteNote}
      />
    </Container>
  );
};

export default UpdateNote;
