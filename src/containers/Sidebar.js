import React from "react";
import styled from "styled-components";
import {
  MdDashboard as Dashboard,
  MdPieChart as PieChart,
  MdSettings as Settings,
  MdChatBubble as ChatBubble,
} from "react-icons/md";
// import { Avatar } from "../components";

const StyledSidebar = styled.div`
  height: 100vh;
  @media all and (min-device-width: 320px) and (max-device-width: 720px) {
    z-index: 10;
    width: 100vw;
    height: 3rem;
    position: relative;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  border-right: ${(props) => props.theme.border};
  padding: 1.8rem 1rem;
  background-color: #f3f2f7;
  display: grid;
  grid-template-rows: auto 1fr auto;

  @media all and (min-device-width: 320px) and (max-device-width: 720px) {
    width: 100vw;
    height: 3rem;
    display: grid;
    border-right: none;
    padding: 0 1rem;
    align-items: center;
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr auto;
    border-bottom: 1px solid #cecfd9;
  }
`;

const Logo = styled.div`
  background-image: url(logo.svg);
  width: 2rem;
  height: 2rem;
`;

const SidebarMenu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media all and (min-device-width: 320px) and (max-device-width: 720px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
`;

const MenuItem = styled.div`
  color: ${(props) => (props.active ? "#4563eb" : "#8992a2")};
  font-size: 1.5rem;
  margin: 1.5rem 0;
  height: 1.55rem;
  font-size: 1.5rem;
  position: relative;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  @media all and (min-device-width: 320px) and (max-device-width: 720px) {
    margin: 0 0.5rem;
  }
`;
export default function Sidebar() {
  return (
    <StyledSidebar>
      <Wrapper>
        <Logo />
        <SidebarMenu>
          <MenuItem active={true}>
            <Dashboard />
          </MenuItem>
          <MenuItem>
            <PieChart />
          </MenuItem>
          <MenuItem>
            <ChatBubble />
          </MenuItem>
          <MenuItem>
            <Settings />
          </MenuItem>
        </SidebarMenu>
        {/* <Avatar width="2rem" height="2rem"></Avatar> */}
      </Wrapper>
    </StyledSidebar>
  );
}
