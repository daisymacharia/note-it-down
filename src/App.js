import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Sidebar, Page } from "./containers";
import theme from "./theme";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: 100vh;
`;

function App() {
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
export default withAuthenticationRequired(App);
