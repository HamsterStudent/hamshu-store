import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import Hamburger from "public/assets/icon/hamburger.png";
import SerchIcon from "public/assets/icon/icon_search.png";
import { useSelector } from "react-redux";
import { ICartItem, IRootState } from "../_types/cartType";
import CartSideBar from "../_components/cartSideBar";
import { useState } from "react";

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

  // useSelector //
  const loading = useSelector((state: IRootState) => state.cart.loading);
  const cartItems: ICartItem[] = useSelector(
    (state: IRootState) => state.cart.cartItems,
  );
  const showSidebar = useSelector(
    (state: IRootState) => state.cart.showSidebar,
  );
  // useSelector //
  return (
    <HeaderWrap>
      <IconWrap>
        <div className="imgWrap">
          <Image src={Hamburger} alt="hamburgermenu" />
        </div>
        <Link href="/">HAMSHUVER</Link>
      </IconWrap>

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
