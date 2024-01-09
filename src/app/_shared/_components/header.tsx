import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import Hamburger from "public/assets/icon/hamburger.png";
import SerchIcon from "public/assets/icon/icon_search.png";
import CartSideBar from "../../(route)/cart/_components/cartSideBar";
import { useState } from "react";
import useShowSidebar from "../_hooks/useShowSidebar";
import { useRouter } from "next/navigation";
import useCart from "../../(route)/cart/_hooks/useCart";

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

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CartWrap = styled.div`
  font: 400 14px "UhBeeSe_hyun";
`;

export default function Header() {
  const [isShow, setIsShow] = useState(true);
  const { SidebarWrapper, openSidebar, closeSidebar } = useShowSidebar();
  const router = useRouter();

  const { loading, cartItems, showSidebar } = useCart().cartData;

  return (
    <HeaderWrap>
      <IconWrap>
        <div className="imgWrap" onClick={openSidebar}>
          <Image src={Hamburger} alt="hamburgermenu" />
        </div>
        <Link href="/">HAMSHUVER</Link>
      </IconWrap>
      {
        <SidebarWrapper>
          <div onClick={closeSidebar}>close</div>
          <div
            onClick={() => {
              closeSidebar();
              router.push("/login");
            }}
          >
            Login/register
          </div>
        </SidebarWrapper>
      }
      <IconWrap>
        <CartWrap>
          <Link href="/cart">Cart</Link>
          <span>
            {"("}
            {loading ? "" : cartItems.reduce((a, c) => a + c.qty, 0)}
            {")"}
          </span>
        </CartWrap>
        <div className="imgWrap">
          <Image src={SerchIcon} alt="hamburgermenu" />
        </div>
      </IconWrap>

      {showSidebar ? <CartSideBar /> : null}
    </HeaderWrap>
  );
}
