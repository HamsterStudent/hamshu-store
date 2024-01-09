"use client";
import React, { useState } from "react";
import Shipping from "./shipping";
import Payment from "./payment";
import OrderResult from "./orderResult";
import Order from "./order";
import useCart from "@/app/(route)/cart/_hooks/useCart";

export default function OrderProcess() {
  const { cartData } = useCart();

  const [step, setStep] = useState<
    "Shipping Address" | "Payment Method" | "Place Order" | "Order Result"
  >("Shipping Address");

  return (
    <main>
      {step === "Shipping Address" && (
        <Shipping
          onNext={() => setStep("Payment Method")}
          cartData={cartData}
        />
      )}
      {step === "Payment Method" && (
        <Payment onNext={() => setStep("Place Order")} cartData={cartData} />
      )}
      {step === "Place Order" && (
        <Order onNext={() => setStep("Payment Method")} cartData={cartData} />
      )}
      {step === "Order Result" && <OrderResult />}
    </main>
  );
}
