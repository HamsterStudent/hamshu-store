"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IInitialState } from "@/app/(route)/cart/_types/cartType";
import DaumPostcode, { Address } from "react-daum-postcode";
import { Dialog } from "@/app/_shared/_components/dialog";
import useCart from "@/app/(route)/cart/_hooks/useCart";
import { IAddress } from "../_types/orderType";

export default function Shipping({
  onNext,
  cartData,
}: {
  onNext: () => void;
  cartData: IInitialState;
}) {
  const { shippingAddress } = cartData;
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<IAddress>();
  const { saveShippingAddressHandler } = useCart();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const inputList: (keyof IAddress)[] = [
    "fullName",
    "number",
    "email",
    "address",
    "postalCode",
    "detailAddress",
  ];

  useEffect(() => {
    setInputValueFromUseForm(inputList, shippingAddress);
  }, [shippingAddress]);

  const addressCompleteHandler = (data: Address) => {
    setInputValueFromUseForm(["postalCode", "address"], data);
    setShowAddressModal(false);
  };

  const setInputValueFromUseForm = (
    array: (keyof IAddress)[],
    data: IAddress | Address,
  ) => {
    if ("zonecode" in data) {
      const { zonecode, roadAddress } = data;
      setValue(array[0], zonecode);
      setValue(array[1], roadAddress);
    } else if ("fullName" in data) {
      array.map((x) => {
        setValue(x, data[x]);
      });
    }
  };

  const formDataFromUseForm = (): IAddress => {
    const {
      fullName,
      number,
      email,
      address,
      postalCode,
      detailAddress,
    }: IAddress = getValues();
    return { fullName, number, email, address, postalCode, detailAddress };
  };

  const saveShippingDataWithRedux = (data: IAddress) => {
    saveShippingAddressHandler(data);
  };

  const submitHandler = () => {
    const formData = formDataFromUseForm();
    saveShippingDataWithRedux(formData);
    onNext();
  };

  return (
    <div>
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
              {...register("number", {
                required: "-없이 입력해 주세요",
                pattern: {
                  value: /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g,
                  message: "숫자만 입력해 주세요",
                },
              })}
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
            <Dialog isOpen={showAddressModal}>
              <Dialog.Dimmed />
              <Dialog.Content>
                <DaumPostcode onComplete={addressCompleteHandler} />
              </Dialog.Content>
            </Dialog>
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
            <label htmlFor="postalCode">우편번호</label>
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
            <label htmlFor="detailAddress">상세주소</label>
            <input
              id="detailAddress"
              autoFocus
              {...register("detailAddress", {
                required: "Please enter detailAddress",
              })}
            />
            {errors.detailAddress && (
              <div>{errors.detailAddress.message?.toString()}</div>
            )}
          </li>
        </ul>

        <div>
          <button>Next</button>
        </div>
      </form>
    </div>
  );
}
