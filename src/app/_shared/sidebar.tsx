import Link from "next/link";
import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Title = styled.h1`
  font-family: "UhBeeSe_hyun";
`;

const Contents = styled.div`
  width: 80%;
  height: 100%;
  background-color: #fff;
`;

const SidebarWrap = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const Dimmed = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: #2525257d;
`;

interface ISideberMain {
  children: ReactNode;
  isOpen: boolean;
}
interface ITitle {
  children: ReactNode;
}

const SidebarDimmed = ({ children }: { children: ReactNode }) => {
  return <Dimmed>{children}</Dimmed>;
};

const SidebarTitle = ({ children }: ITitle) => {
  return <Title>{children}</Title>;
};
const SidebarContents = ({ children }: ITitle) => {
  return <Contents>{children}</Contents>;
};

const SidebarMain = ({ children, isOpen }: ISideberMain) => {
  const modalRoot = document.getElementById("appInner");
  if (!modalRoot) {
    return null;
  }
  if (!isOpen) {
    return null;
  }
  return createPortal(<SidebarWrap>{children}</SidebarWrap>, modalRoot);
};

export const Sidebar = Object.assign(SidebarMain, {
  Title: SidebarTitle,
  Dimmed: SidebarDimmed,
  Contents: SidebarContents,
});
