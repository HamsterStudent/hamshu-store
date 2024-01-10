import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";

const Title = styled.h1`
  font-family: "UhBeeSe_hyun";
`;
const slide = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
`;
const dimmedOpacity = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
  .openAni {
    animation: ${slide} 0.3s ease-in-out;
  }
`;

const Contents = styled.div`
  width: 80%;
  height: 100%;
  background-color: #fff;
`;

const Dimmed = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: #2525257d;
  animation: ${dimmedOpacity} 0.3s ease-in-out;
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
  return <Contents className="openAni">{children}</Contents>;
};

const SidebarMain = ({ children, isOpen }: ISideberMain) => {
  if (!isOpen) {
    return null;
  }
  if (typeof document !== "undefined") {
    const modalRoot = document.getElementById("appInner");
    if (!modalRoot) {
      return null;
    }
    return createPortal(<SidebarWrap>{children}</SidebarWrap>, modalRoot);
  }
};

export const Sidebar = Object.assign(SidebarMain, {
  Title: SidebarTitle,
  Dimmed: SidebarDimmed,
  Contents: SidebarContents,
});
