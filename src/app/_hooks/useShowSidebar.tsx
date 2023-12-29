import Link from "next/link";
import React, { ReactNode, useState } from "react";
import styled from "styled-components";

interface ISidebar {
  children: ReactNode;
}

const SidebarWrap = styled.section`
  height: 100%;
  width: 500px;
`;

export default function useShowSidebar(initialOpen = false) {
  const [isShow, setIsShow] = useState(initialOpen);
  const openSidebar = () => setIsShow(true);
  const closeSidebar = () => setIsShow(false);

  const SidebarWrapper = ({ children, ...props }: ISidebar) => (
    <SidebarWrap>
      <Link href="/login">Login &rarr;</Link>
    </SidebarWrap>
  );

  return { SidebarWrapper, openSidebar, closeSidebar };
}
