"use client";
import { savePaymentMethod } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CheckoutWizard from "../../_components/checkoutWizard";

interface IPaymentMethod {
  paymentMethod: string;
}

export default function Shipping() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setValue("paymentMethod", paymentMethod);
  }, [paymentMethod, router, setValue, shippingAddress]);

  const submitHandler = ({ paymentMethod }: IPaymentMethod) => {
    dispatch(savePaymentMethod(paymentMethod));
    router.push("/order");
  };

  return (
    <div>
      <CheckoutWizard activeStep={2} />
      <form onSubmit={handleSubmit(submitHandler)}>
        <h1>Payment Method</h1>
        {["PayPal", "Stripe", "CashOnDelivery"].map((payment) => (
          <div key={payment}>
            <input
              type="radio"
              //   name="paymentMethod"
              id={payment}
              value={payment}
              {...register("paymentMethod", {
                required: "Please select payment method",
              })}
            />
            <label htmlFor={payment}>{payment}</label>
          </div>
        ))}
        {errors.paymentMethod?.message && (
          <div>{errors.paymentMethod.message.toString()}</div>
        )}
        <div>
          <button>Next</button>
        </div>
      </form>
    </div>
  );
}
