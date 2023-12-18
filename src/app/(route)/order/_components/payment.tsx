"use client";
import { savePaymentMethod } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IInitialState, IRootState } from "@/app/_types/cartType";

interface IPaymentMethod {
  paymentMethod: string;
}

export default function Payment({
  onNext,
  reduxData,
}: {
  onNext: () => void;
  reduxData: IInitialState;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { shippingAddress, paymentMethod } = reduxData;

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setValue("paymentMethod", paymentMethod);
  }, [paymentMethod, router, setValue, shippingAddress]);

  const submitHandler = ({ paymentMethod }: any) => {
    dispatch(savePaymentMethod(paymentMethod));
    onNext();
  };

  return (
    <div>
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
