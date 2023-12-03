"use client";
import { saveShippingAddress } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CheckoutWizard from "../../_components/checkoutWizard";
import { IRootState } from "@/app/_types/cartType";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

interface IAddress {
  fullName: string;
  number: number;
  email: string;
  address: string;
  detailAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

const ModalWrap = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: #2525257d;
  z-index: 9;
`;
const Modal = styled.div`
  width: 95%;
  border-radius: 20px;
  overflow: hidden;
`;

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
  const [zipCode, setZipcode] = useState<string>("");
  const [roadAddress, setRoadAddress] = useState<string>("");
  const completeHandler = (data: any) => {
    console.log(data);
    setZipcode(data.zonecode); // 추가
    setRoadAddress(data.roadAddress); // 추가
    setShowAddressModal(false);
  };

  useEffect(() => {
    if (!shippingAddress) return;
    setValue("fullName", shippingAddress.fullName);
    setValue("number", shippingAddress.number);
    setValue("email", shippingAddress.email);
    setValue("address", shippingAddress.address);
    setValue("detailAddress", shippingAddress.detailAddress);
    setValue("postalCode", shippingAddress.postalCode);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    fullName,
    number,
    email,
    address,
    detailAddress,
    postalCode,
  }: IAddress) => {
    dispatch(
      saveShippingAddress({
        fullName,
        number,
        email,
        address,
        detailAddress,
        postalCode,
      }),
    );
    router.push("/payment");
  };

  return (
    <div>
      {showAddressModal ? (
        <ModalWrap>
          <Modal>
            <DaumPostcode onComplete={completeHandler} />
          </Modal>
        </ModalWrap>
      ) : null}
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
              value={roadAddress}
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
            <label htmlFor="postalCode">우편번호</label>
            <input
              id="postalCode"
              value={zipCode}
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
            {errors.city && <div>{errors.city.message?.toString()}</div>}
          </li>
        </ul>

        <div>
          <button>Next</button>
        </div>
      </form>
    </div>
  );
}
