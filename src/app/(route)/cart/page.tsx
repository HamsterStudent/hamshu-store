"use client";
import { IRootState } from "@/app/_types/cartType";
import {
  addToCart,
  hideSideBar,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const dispatch = useDispatch();
  const router = useRouter();
  // useSelector //
  const loading = useSelector((state: IRootState) => state.cart.loading);
  const cartItems = useSelector((state: IRootState) => state.cart.cartItems);
  const itemsPrice = useSelector((state: IRootState) => state.cart.itemsPrice);
  // useSelector //
  useEffect(() => {
    dispatch(hideSideBar());
  }, []);

  const addToCartHandler = (product: any, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : cartItems.length === 0 ? (
          <div>
            cart is empty. <Link href="/">Go shopping</Link>
          </div>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id}>
                <div>
                  <Link href={`/product/${item.id}`}>
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                    {item.name}
                  </Link>
                </div>
                <div>
                  <select
                    value={item.qty}
                    onChange={(e) => {
                      addToCartHandler(item, Number(e.target.value));
                    }}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>${item.price}</div>
                <div>
                  <button onClick={() => removeFromCartHandler(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <ul>
          <li>
            <div>
              Subtotal({cartItems.reduce((a, c) => a + c.qty, 0)}) : $
              {itemsPrice}
            </div>
          </li>
          <li>
            <button onClick={() => router.push("/shipping")}>
              Proceed to checkout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
