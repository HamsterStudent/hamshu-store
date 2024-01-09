import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import useCart from "../_hooks/useCart";

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
  const { loading, cartItems, itemsPrice, showSidebar } = useCart().cartData;
  const { addToCartHandler, removeFromCartHandler, hideSideBarHandler } =
    useCart();

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
            <Link href="/order">장바구니 바로가기</Link>
          </div>
        </div>
      )}
      <div onClick={hideSideBarHandler}>닫기</div>
    </CartSideBarWrap>
  );
}
