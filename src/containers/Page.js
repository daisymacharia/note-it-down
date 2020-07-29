import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Login, Logout } from "../components";
import { AllNotes, UpdateNote, NewNote } from "./";

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(250px, 2fr);
  grid-template-rows: 4rem 1fr;
  height: 100%auto;
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
  background-color: #4563eb;
  outline: none;
  cursor: pointer;
  z-index: 2;
`;

const RightWrapper = styled.div`
  grid-area: 1/1/-1/2;
`;
const LoginWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-area: 1/2/2/-1;
  border-bottom: solid 0.06rem #d9d9dd;
  align-items: center;
  padding: 1rem;
`;

const Page = () => {
  const { isAuthenticated } = useAuth0();
  const [displayedNote, setDisplayedNote] = useState("new");
  const { loading, error, data } = useQuery(NOTES_QUERY);

  const [deleteNote] = useMutation(DELETE_NOTE_QUERY, {
    update(cache, { data: { deleteNote } }) {
      const { allNotes } = cache.readQuery({ query: NOTES_QUERY });
      const newNotes = allNotes.filter((note) => note._id !== deleteNote._id);
      cache.writeQuery({
        query: NOTES_QUERY,
        data: { allNotes: newNotes },
      });
    },
  });

  useEffect(() => {
    if (data?.allNotes.length === 0) {
      setDisplayedNote("new");
    } else {
      setDisplayedNote(data?.allNotes[0]);
    }
  }, [data]);

  const selectNote = (note) => {
    let target_id = note;
    let selected = "";
    if (target_id !== "new") {
      selected = data.allNotes.find((note) => {
        return note._id === target_id._id;
      });
    } else {
      selected = "new";
    }
    setDisplayedNote(selected);
  };

  const addNote = () => {
    setDisplayedNote("new");
  };

  if (loading) return <PageWrapper>Loading...</PageWrapper>;
  if (error) return `Error! ${error.message}`;

  return (
    <PageWrapper>
      <LoginWrapper>{isAuthenticated ? <Logout /> : <Login />}</LoginWrapper>
      <RightWrapper>
        <AddNoteButton onClick={addNote}>+</AddNoteButton>
        <AllNotes notes={data} selectNote={selectNote} />
      </RightWrapper>

      {displayedNote === "new" ? (
        <NewNote displayedNote={displayedNote} />
      ) : (
        <UpdateNote deleteNote={deleteNote} displayedNote={displayedNote} />
      )}
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
      participants {
        name
      }
      organization
    }
  }
`;

const DELETE_NOTE_QUERY = gql`
  mutation deleteNote($_id: ID!) {
    deleteNote(_id: $_id) {
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
