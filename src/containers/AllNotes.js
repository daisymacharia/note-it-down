import React from "react";
import styled from "styled-components";
import Moment from "react-moment";
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
  height: 5rem;
`;

const AllNotes = ({ data, selectNote }) => {
  return (
    <NotesContainer>
      <Search />
      <Header>
        <h1> All Notes </h1>
      </Header>
      <Wrapper>
        {data.allNotes.map((note) => (
          <NoteCard key={note._id} onClick={() => selectNote(note)}>
            <DateContainer>
              <h2>
                <Moment format="dddd" date={note.date} />
              </h2>
              <Moment format="ll" date={note.date} />
            </DateContainer>
            <ContentContainer>
              <h2>{note.title}</h2>
            </ContentContainer>
          </NoteCard>
        ))}
      </Wrapper>
    </NotesContainer>
  );
};

export default AllNotes;
