"use client";
import { saveShippingAddress } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CheckoutWizard from "../../_components/checkoutWizard";

interface IAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
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
  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress) return;
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }: IAddress) => {
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country }),
    );
    router.push("/payment");
  };

  return (
    <div>
      <CheckoutWizard activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)}>
        <h1>Shipping Address</h1>
        <div>
          <label htmlFor="fullName">FullName</label>
          <input
            id="fullName"
            autoFocus
            {...register("fullName", { required: "Please enter full name" })}
          />
          {errors.fullName && <div>{errors.fullName.message?.toString()}</div>}
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            autoFocus
            {...register("address", {
              required: "Please enter address",
              minLength: { value: 3, message: "Address is more than 2 chars" },
            })}
          />
          {errors.address && <div>{errors.address.message?.toString()}</div>}
        </div>
        <div>
          <label htmlFor="city">city</label>
          <input
            id="city"
            autoFocus
            {...register("city", {
              required: "Please enter city",
            })}
          />
          {errors.city && <div>{errors.city.message?.toString()}</div>}
        </div>
        <div>
          <label htmlFor="postalCode">postalCode</label>
          <input
            id="postalCode"
            autoFocus
            {...register("postalCode", {
              required: "Please enter postalCode",
            })}
          />
          {errors.postalCode && (
            <div>{errors.postalCode.message?.toString()}</div>
          )}
        </div>
        <div>
          <label htmlFor="country">country</label>
          <input
            id="country"
            autoFocus
            {...register("country", {
              required: "Please enter country",
            })}
          />
          {errors.country && <div>{errors.contry?.message?.toString()}</div>}
        </div>
        <div>
          <button>Next</button>
        </div>
      </form>
    </div>
  );
}
