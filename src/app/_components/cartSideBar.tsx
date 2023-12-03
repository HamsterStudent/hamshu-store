import {
  addToCart,
  hideSideBar,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICartItem, IRootState } from "../_types/cartType";
import styled from "styled-components";

const CartSideBarWrap = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  border: dotted 1px;
  background-color: #fff;
  padding: 15px;
  h2,
  a {
    font-size: 1rem;
    font-family: "UhBeeSe_hyun";
  }
`;

const ItemList = styled.ul`
  li {
    display: flex;
    padding: 5px;
    border: dotted 1px;
    img {
      display: block;
      border-radius: 10px;
    }
    p {
      font-size: 0.7rem;
    }
  }
`;
const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const OptionWrap = styled.div``;

export default function CartSideBar() {
  // useSelector //
  const loading = useSelector((state: IRootState) => state.cart.loading);
  const cartItems: ICartItem[] = useSelector(
    (state: IRootState) => state.cart.cartItems,
  );
  const itemsPrice = useSelector((state: IRootState) => state.cart.itemsPrice);
  const showSidebar = useSelector(
    (state: IRootState) => state.cart.showSidebar,
  );
  // useSelector //

  const dispatch = useDispatch();

  const addToCartHandler = (product: ICartItem, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <CartSideBarWrap>
      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <div>cart is empty</div>
      ) : (
        <div>
          <h2>합계</h2>
          <div>${itemsPrice}</div>

          <ItemList>
            {cartItems.map((item) => (
              <li key={item.id}>
                <Link href={`/product/${item.id}`}>
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={50}
                    height={50}
                  ></Image>
                </Link>

                <InfoWrap>
                  <p>{item.name}</p>
                  <OptionWrap>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => removeFromCartHandler(item.id)}>
                      Delete
                    </button>
                  </OptionWrap>
                </InfoWrap>
              </li>
            ))}
          </ItemList>
          <div>
            <Link href="/cart">장바구니 바로가기</Link>
          </div>
        </div>
      )}
      <div
        onClick={() => {
          dispatch(hideSideBar());
        }}
      >
        닫기
      </div>
    </CartSideBarWrap>
  );
}
