import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CartSideBar() {
  const { loading, cartItems, itemsPrice } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const addToCartHandler = (product: any, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <div>cart is empty</div>
      ) : (
        <div>
          <div>subtotal</div>
          <div>${itemsPrice}</div>
          <div>
            <Link href="/cart">Go to cart</Link>
          </div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <Link href={`/product/${item.id}`}>
                <Image
                  src={item.img}
                  alt={item.name}
                  width={50}
                  height={50}
                ></Image>
              </Link>
              <select
                value={item.qty}
                onChange={(e) => addToCartHandler(item, Number(e.target.value))}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
