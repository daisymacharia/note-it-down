import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { Search } from "../components";

const NotesContainer = styled.div`
  display: flex;
  grid-area: 1/1/-1/2;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem 0;
  border-right: ${(props) => props.theme.border};
  overflow: hidden;
`;

const Wrapper = styled.div`
  position: relative;
  overflow-y: scroll;
`;

const NoteCard = styled.button`
  display: grid;
  grid-template-columns: minmax(5rem, 1fr) 2fr;
  width: 100%;
  height: 8rem;
  border: none;
  border-top: ${(props) => props.theme.border};
  background-color: transparent;
  outline: none;

  &:hover {
    background-color: #4563eb;
    box-shadow: 0px 1px #e6e9ec;
    color: #f9f9f9;
  }

  &:last-child {
    border-bottom: ${(props) => props.theme.border};
  }
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-right: ${(props) => props.theme.border};
  height: 100%;
`;

const ContentContainer = styled.div`
  padding: 0.5rem;
  height: 100%;
  p {
    font-size: 0.7rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  height: 5rem;
`;

const Sort = styled.div``;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1rem;

  li {
    margin-bottom: 0.5rem;
  }
`;

const AllNotes = ({ notes, selectNote, setDirection, direction }) => {
  const [searchedNotes, setNotes] = useState(notes.allNotes);
  const [searchNotes, { loading, data }] = useLazyQuery(SEARCH_NOTES_QUERY);

  useEffect(() => {
    if (data && data.allNotes) {
      setNotes(data.allNotes);
    } else {
      setNotes(notes.allNotes);
    }
  }, [data, notes]);

  if (loading) {
    return "loading...";
  }

  const handleKeyDown = (event, searchValue) => {
    if (event.key === "Enter") {
      searchNotes({ variables: { searchText: searchValue } });
    }
  };

  const handleSort = () => {
    let sortDirection = direction === "asc" ? "desc" : "asc";
    setDirection(sortDirection);
  };

  return (
    <NotesContainer>
      <Search handleKeyDown={handleKeyDown} />
      <Header>
        {/* <Sort>
          Sort by date
          {direction === "asc" ? (
            <FaSortDown onClick={handleSort} />
          ) : (
            <FaSortUp onClick={handleSort} />
          )}
        </Sort> */}
        <h1> All Notes </h1>
      </Header>
      <Wrapper>
        {searchedNotes.map((note) => (
          <NoteCard key={note._id} onClick={() => selectNote(note)}>
            <DateContainer>
              <h2>
                <Moment format="dddd" date={note.date} />
              </h2>
              <Moment format="ll" date={note.date} />
            </DateContainer>
            <ContentContainer>
              <h2>{note.title}</h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3> Attendees:</h3>
                <StyledList>
                  {note.participants.map((participant, i) => (
                    <li key={participant.name + i}>{participant.name}</li>
                  ))}
                </StyledList>
              </div>
            </ContentContainer>
          </NoteCard>
        ))}
      </Wrapper>
    </NotesContainer>
  );
};

export default AllNotes;

const SEARCH_NOTES_QUERY = gql`
  query allNotes($searchText: String!) {
    allNotes(
      filter: {
        OR: [
          { title_contains: $searchText }
          { organization_contains: $searchText }
        ]
      }
    ) {
      _id
      title
      body
      participants {
        name
      }
      organization
      body
      date
    }
  }
`;
