"use client";
import { addToCart } from "@/_redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICartItem, IRootState } from "../_types/cartType";

interface IAddToCart {
  product: {
    id: string;
    name: string;
    img?: string | undefined;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
    description: string;
  };
  showQty: boolean;
  redirect: boolean;
  increasePerClick: boolean;
}

export default function AddToCart({
  product,
  showQty = true,
  redirect = false,
  increasePerClick = false,
}: IAddToCart) {
  const dispatch = useDispatch();

  // useSelector //
  const cartItems: ICartItem[] = useSelector(
    (state: IRootState) => state.cart.cartItems,
  );
  // useSelector //

  const router = useRouter();
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    let newQty = qty;
    if (increasePerClick) {
      const existItem = cartItems.find((x) => x.id === product.id);
      if (existItem) {
        if (existItem.qty + 1 <= product.countInStock) {
          newQty = existItem.qty + 1;
        } else {
          return alert("No more product exist");
        }
      }
    }
    dispatch(addToCart({ ...product, qty: newQty }));

    if (redirect) router.push("/cart");
  };

  return (
    <div>
      {product.countInStock > 0 && showQty && (
        <div>
          <div>Qty</div>
          <div>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>{" "}
          </div>
        </div>
      )}
      <div>
        {product.countInStock > 0 ? (
          <button onClick={addToCartHandler}>Add to cart</button>
        ) : (
          <button disabled>Out of stock</button>
        )}
      </div>
    </div>
  );
}
