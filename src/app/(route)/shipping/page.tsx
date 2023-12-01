"use client";
import { saveShippingAddress } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CheckoutWizard from "../../_components/checkoutWizard";
import { IRootState } from "@/app/_types/cartType";
import Postcode from "./_components/postcode";

interface IAddress {
  fullName: string;
  number: number;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function Shipping() {
  // useSelector //
  const shippingAddress = useSelector(
    (state: IRootState) => state.cart.shippingAddress,
  );
  // useSelector //
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IAddress>();
  const router = useRouter();
  const dispatch = useDispatch();

  const [showAddressModal, setShowAddressModal] = useState(false);

  useEffect(() => {
    if (!shippingAddress) return;
    setValue("fullName", shippingAddress.fullName);
    setValue("number", shippingAddress.number);
    setValue("email", shippingAddress.email);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    fullName,
    number,
    email,
    address,
    city,
    postalCode,
    country,
  }: IAddress) => {
    dispatch(
      saveShippingAddress({
        fullName,
        number,
        email,
        address,
        city,
        postalCode,
        country,
      }),
    );
    router.push("/payment");
  };

  return (
    <div>
      {showAddressModal ? <Postcode /> : null}
      <CheckoutWizard activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)}>
        <h1>배송 정보</h1>
        <ul>
          <li>
            <label htmlFor="fullName">수령인</label>
            <input
              id="fullName"
              autoFocus
              {...register("fullName", { required: "Please enter full name" })}
            />
            {errors.fullName && (
              <div>{errors.fullName.message?.toString()}</div>
            )}
          </li>
          <li>
            <label htmlFor="number">연락처</label>
            <input
              id="number"
              autoFocus
              {...register("number", { required: "-없이 입력해 주세요" })}
            />
            {errors.number && <div>{errors.number.message?.toString()}</div>}
          </li>
          <li>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              autoFocus
              {...register("email", { required: "Please enter email" })}
            />
            {errors.email && <div>{errors.email.message?.toString()}</div>}
          </li>
          <li>
            <label htmlFor="address">배송지</label>
            <input
              id="address"
              autoFocus
              {...register("address", {
                required: "Please enter address",
                minLength: {
                  value: 3,
                  message: "Address is more than 2 chars",
                },
              })}
            />
            {errors.address && <div>{errors.address.message?.toString()}</div>}
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowAddressModal(true);
              }}
            >
              우편번호 검색
            </button>
          </li>
          <li>
            <label htmlFor="city">city</label>
            <input
              id="city"
              autoFocus
              {...register("city", {
                required: "Please enter city",
              })}
            />
            {errors.city && <div>{errors.city.message?.toString()}</div>}
          </li>
          <li>
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
          </li>
          <li>
            <label htmlFor="country">country</label>
            <input
              id="country"
              autoFocus
              {...register("country", {
                required: "Please enter country",
              })}
            />
            {errors.country && <div>{errors.country?.message?.toString()}</div>}
          </li>
        </ul>

        <div>
          <button>Next</button>
        </div>
      </form>
    </div>
  );
}
