import React from "react";
import styled from "styled-components";
import Moment from "react-moment";

const NotesContainer = styled.div`
  display: flex;
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
  grid-template-columns: 8rem 1fr;
  height: 8rem;
  border: none;
  border-top: ${(props) => props.theme.border};
  background-color: transparent;

  &:hover {
    background-color: #f7f7f7;
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
  console.log(data);
  return (
    <NotesContainer>
      <Header>
        <h1> All Notes </h1>
      </Header>
      <Wrapper>
        {data.allNotes.map((note) => (
          <NoteCard key={note._id} onClick={(e, note) => selectNote(e, note)}>
            <DateContainer>
              <h2>
                <Moment format="dddd" date={note.date} />
              </h2>
              <Moment format="ll" date={note.date} />
            </DateContainer>
            <ContentContainer>
              <h2>{note.title}</h2>
              {/* <p>{note.2body}</p> */}
            </ContentContainer>
          </NoteCard>
        ))}
      </Wrapper>
    </NotesContainer>
  );
};

export default AllNotes;
