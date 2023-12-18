"use client";
import React, { useState } from "react";
import Shipping from "./_components/shipping";
import Payment from "./_components/payment";
import { ICartItem, IInitialState, IRootState } from "@/app/_types/cartType";
import { useSelector } from "react-redux";
import Cart from "./_components/cart";
import OrderResult from "./_components/orderResult";
import Order from "./_components/order";

export default function OrderProcess() {
  // useSelector //
  const cartItems: ICartItem[] = useSelector(
    (state: IRootState) => state.cart.cartItems,
  );
  const itemsPrice = useSelector((state: IRootState) => state.cart.itemsPrice);
  const shippingPrice = useSelector(
    (state: IRootState) => state.cart.shippingPrice,
  );
  const totalPrice = useSelector((state: IRootState) => state.cart.totalPrice);
  const taxPrice = useSelector((state: IRootState) => state.cart.taxPrice);
  const shippingAddress = useSelector(
    (state: IRootState) => state.cart.shippingAddress,
  );
  const paymentMethod = useSelector(
    (state: IRootState) => state.cart.paymentMethod,
  );
  const loading = useSelector((state: IRootState) => state.cart.loading);
  // useSelector //

  const reduxData: IInitialState = {
    cartItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
    shippingAddress,
    paymentMethod,
    loading,
  };

  const [step, setStep] = useState<
    "Shipping Address" | "Payment Method" | "Place Order" | "Order Result"
  >("Shipping Address");

  return (
    <main>
      {step === "Shipping Address" && (
        <Shipping
          onNext={() => setStep("Payment Method")}
          reduxData={reduxData}
        />
      )}
      {step === "Payment Method" && (
        <Payment onNext={() => setStep("Place Order")} reduxData={reduxData} />
      )}
      {step === "Place Order" && (
        <Order onNext={() => setStep("Payment Method")} reduxData={reduxData} />
      )}
      {step === "Order Result" && <OrderResult />}
    </main>
  );
}
