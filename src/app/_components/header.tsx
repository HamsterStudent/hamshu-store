import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import Hamburger from "public/assets/icon/hamburger.png";
import SerchIcon from "public/assets/icon/icon_search.png";
import { useSelector } from "react-redux";

const HeaderWrap = styled.section`
  width: 100%;
  height: 42.5px;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 99;
  font-size: 1rem;
  font-family: "UhBeeSe_hyun";
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px;
  .imgWrap {
    width: 25px;
    img {
      width: 100%;
      height: 100%;
      position: relative !important;
      object-fit: contain;
    }
  }
`;

export default function Header() {
  const { loading, cartItems } = useSelector((state) => state.cart);
  return (
    <HeaderWrap>
      <div className="imgWrap">
        <Image src={Hamburger} alt="hamburgermenu" />
      </div>
      <Link href="/">HAMSHUVER</Link>
      <div className="imgWrap">
        <Image src={SerchIcon} alt="hamburgermenu" />
      </div>
      <span>{loading ? "" : cartItems.reduce((a, c) => a + c.qty, 0)}</span>
      <Link href="/cart">Cart</Link>
    </HeaderWrap>
  );
}
