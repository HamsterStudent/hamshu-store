"use client";
import CheckoutWizard from "@/app/_components/checkoutWizard";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PlaceOrderScreen() {
  const {
    cartItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
    shippingAddress,
    paymentMethod,
    loading,
  } = useSelector((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  return (
    <div>
      <CheckoutWizard activeStep={3} />
      <h1>Place Order</h1>
      {loading ? (
        <div>Loading</div>
      ) : cartItems.length === 0 ? (
        <div>
          Cart is empth. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div>
          <div>
            <h2>Shipping Address</h2>
            <div>
              {shippingAddress.fullName}, {shippingAddress.address},{" "}
              {shippingAddress.city}, {shippingAddress.postalCode}, ,
              {shippingAddress.country}
            </div>
            <div>
              <Link href="/shipping">Edit</Link>
            </div>
          </div>
          <div>
            <h2>Payment Method</h2>
            <div>{paymentMethod}</div>
            <div>
              <Link href="/payment">Edit</Link>
            </div>
          </div>
          <div>
            <h2>Order Items</h2>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <Link href={`/product/${item.id}`}>
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                    {item.name}
                  </Link>
                  <p>{item.quantity}</p>
                  <p>${item.price}</p>
                  <p>{item.qty * item.price}</p>
                </li>
              ))}
            </ul>
            <Link href="/cart">Edit</Link>
          </div>
          <div>
            <h2>Order Summery</h2>
            <ul>
              <li>
                <h3>Items</h3>
                <p>${itemsPrice}</p>
              </li>
              {/* <li>
                <h3>Tax</h3>
                <p>${taxPrice}</p>
              </li> */}
              <li>
                <h3>Shipping</h3>
                <p>${shippingPrice}</p>
              </li>
              <li>
                <h3>Total</h3>
                <p>${totalPrice}</p>
              </li>
              <li>
                <button onClick={() => alert("Not implemented")}>
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
