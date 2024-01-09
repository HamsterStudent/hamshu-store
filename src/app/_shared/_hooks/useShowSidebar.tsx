import Link from "next/link";
import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { Sidebar } from "../_components/sidebar";

interface ISidebar {
  children: ReactNode;
}

const SidebarWrap = styled.section`
  height: 100%;
  width: 500px;
`;

export default function useShowSidebar(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const openSidebar = () => {
    setIsOpen(true);
  };
  const closeSidebar = () => setIsOpen(false);

  const SidebarWrapper = ({ children, ...props }: ISidebar) => (
    <Sidebar isOpen={isOpen}>
      <Sidebar.Dimmed>
        <Sidebar.Contents>
          <Sidebar.Title>Hamshu</Sidebar.Title>
          {children}
        </Sidebar.Contents>
      </Sidebar.Dimmed>
    </Sidebar>
  );

  return { SidebarWrapper, openSidebar, closeSidebar };
}
