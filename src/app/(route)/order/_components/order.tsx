"use client";
import React from "react";
import { IInitialState } from "@/app/(route)/cart/_types/cartType";
import axios from "axios";
import { RequestPayParams, RequestPayResponse } from "iamport-typings";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Order({
  onNext,
  cartData,
}: {
  onNext: () => void;
  cartData: IInitialState;
}) {
  const {
    cartItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
    shippingAddress,
    paymentMethod,
    loading,
  } = cartData;

  const router = useRouter();

  // useEffect(() => {
  //   if (!paymentMethod) {
  //     router.push("/payment");
  //   }
  // }, [paymentMethod, router]);

  const paymentPreVerify = async () => {
    try {
      const { data } = await axios.post("/api/verify/preverify", {
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        amount: +totalPrice, // 결제금액
      });
      requestPayment(data);
    } catch (error) {
      console.error("paymentPreVerify에러! : ", error);
    }
  };

  const requestPayment = (preVerifyData: {
    amount: number;
    merchant_uid: string;
    status: number;
  }) => {
    const data: RequestPayParams = {
      pg: "html5_inicis", // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
      pay_method: "card", // 결제수단
      merchant_uid: preVerifyData.merchant_uid, // 주문번호
      amount: preVerifyData.amount, // 결제금액
      name: `${cartItems[0].name} 외 ${cartItems.length}`, // 주문명
      buyer_name: `${shippingAddress.fullName}`, // 구매자 이름
      buyer_tel: `${shippingAddress.number}`, // 구매자 전화번호
      buyer_email: `${shippingAddress.email}`, // 구매자 이메일
      buyer_addr: `${shippingAddress.address}${shippingAddress.postalCode}${shippingAddress.detailAddress}`, // 구매자 주소
      buyer_postcode: shippingAddress.postalCode, // 구매자 우편번호
    };

    if (typeof window !== "undefined" && window.IMP) {
      const { IMP } = window;
      if (IMP) {
        IMP.init(`${process.env.NEXT_PUBLIC_IMP_UID}`);
        IMP.request_pay(data, callback);
      }
    } else {
      return null;
    }
  };

  /* 콜백 함수 정의 */
  const callback = async (response: RequestPayResponse) => {
    const { success, error_msg, imp_uid, merchant_uid } = response;
    if (!success) {
      alert(`결제에 실패하였습니다. 사유: ${error_msg}`);
      return;
    }
    try {
      const { data } = await axios.post("/api/verify", {
        imp_uid: imp_uid,
        merchant_uid: merchant_uid,
        amount: +totalPrice,
      });

      // console.log(data); // 서버에서 받은 응답 데이터
      // router.push("/orderresult");
      onNext();
    } catch (error) {
      console.error("err : ", error);
    }
  };

  return (
    <div>
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
            <h2>배송정보</h2>
            <div>
              {shippingAddress.address}
              {"("}
              {shippingAddress.postalCode}
              {")"}
              {shippingAddress.detailAddress}
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
                {/* <button onClick={() => requestPayment()}>Place Order</button> */}
              </li>
              <li>
                <button
                  onClick={() => {
                    paymentPreVerify();
                  }}
                >
                  hamster
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
