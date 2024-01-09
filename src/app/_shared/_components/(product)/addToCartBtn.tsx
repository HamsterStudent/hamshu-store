"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useCart from "../../../(route)/cart/_hooks/useCart";
import { IAddToCart } from "../../../(route)/cart/_types/cartType";

export default function AddToCartBtn({
  product,
  showQty = true,
  redirect = false,
  increasePerClick = false,
}: IAddToCart) {
  const { addToCartHandler } = useCart();

  const { cartItems } = useCart().cartData;

  const router = useRouter();
  const [qty, setQty] = useState(1);

  const addToCart = () => {
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
    addToCartHandler({ ...product }, newQty);

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
          <button onClick={addToCart}>Add to cart</button>
        ) : (
          <button disabled>Out of stock</button>
        )}
      </div>
    </div>
  );
}
