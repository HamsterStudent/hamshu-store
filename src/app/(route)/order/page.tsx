"use client";
import CheckoutWizard from "@/app/_components/checkoutWizard";
import { ICartItem, IRootState } from "@/app/_types/cartType";
import { RequestPayParams, RequestPayResponse } from "iamport-typings";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PlaceOrderScreen() {
  // 어글리패턴
  // const {
  //   cartItems,
  //   itemsPrice,
  //   shippingPrice,
  //   totalPrice,
  //   taxPrice,
  //   shippingAddress,
  //   paymentMethod,
  //   loading,
  // }: IInitialState = useSelector((state) => state.cart);

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

  const router = useRouter();

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const requestPayment = () => {
    if (!window.IMP) return;
    const { IMP } = window;
    IMP.init(`${process.env.IMP_UID}`);

    const data: RequestPayParams = {
      pg: "html5_inicis", // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: +totalPrice, // 결제금액
      name: `${cartItems[0].name} 외 ${cartItems.length}`, // 주문명
      buyer_name: "홍길동", // 구매자 이름
      buyer_tel: "01012341234", // 구매자 전화번호
      buyer_email: "example@example.com", // 구매자 이메일
      buyer_addr: `${shippingAddress.fullName}${shippingAddress.address}${shippingAddress.city}${shippingAddress.postalCode}${shippingAddress.country}`, // 구매자 주소
      buyer_postcode: shippingAddress.postalCode, // 구매자 우편번호
    };

    /* 결제 창 호출 */
    IMP.request_pay(data, callback);
  };

  /* 콜백 함수 정의 */
  const callback = (response: RequestPayResponse) => {
    const { success, error_msg } = response;

    if (success) {
      router.push("/orderresult");
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

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
                <button onClick={() => requestPayment()}>Place Order</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
