import Link from "next/link";
import styled from "styled-components";

const HeaderWrap = styled.section`
  width: 100%;
  height: 42.5px;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 99;
`;

export default function Header() {
  return (
    <HeaderWrap>
      <Link href="/">HAMSHUVER</Link>
    </HeaderWrap>
  );
}
