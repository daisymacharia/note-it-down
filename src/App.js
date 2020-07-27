import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { AllNotes, NewNote, Sidebar, Page } from "./containers";
import theme from "./theme";

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: 100vh;
`;

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <PageContainer>
          <Sidebar />
          <Route exact path="/" component={Page} />
          {/* <Route exact path="/newnote" component={NewNote} /> */}
        </PageContainer>
      </ThemeProvider>
    </Router>
  );
}
