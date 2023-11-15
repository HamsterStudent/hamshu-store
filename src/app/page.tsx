"use client";
import styled from "styled-components";
import Header from "./_components/header";
import Image from "next/image";
import NewImage from "public/assets/mainimg/main.png";
import DishImage from "public/assets/mainimg/dish.png";
import KeyringImage from "public/assets/mainimg/keyring.png";
import PhotoCardImage from "public/assets/mainimg/photocard.png";
import Footer from "./_components/footer";
import ProdList from "./_components/prodList";
import New from "./_components/_mainTap/new";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Dish from "./_components/_mainTap/dish";
import Photocard from "./_components/_mainTap/photocard";
import Keyring from "./_components/_mainTap/keyring";
import Best from "./_components/_mainTap/best";

const ContentsWrap = styled.section`
  border-radius: 20px 20px 0 0;
  position: relative;
  top: -20px;
`;
const CategoryList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #e6e7e7;
  border-radius: 15px 15px 0 0;
  li {
    width: 75px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    font-family: "UhBeeSe_hyun";
    &.active {
      background-color: #fff;
      border-radius: 15px 15px 0 0;
    }
  }
`;

export default function Home() {
  const params = useSearchParams();
  const [curname, setCurname] = useState("신상품");

  console.log(params.get("limit"));

  const cateData = ["신상품", "식기", "포토카드", "키링", "베스트"];

  const prodData = [
    {
      name: "햄슈 에어팟",
      price: 5000,
      img: "/assets/prodimg/airpodcase.png",
    },
    {
      name: "햄슈 카드홀더",
      price: 5000,
      img: "/assets/prodimg/cardholder_01.png",
    },
    {
      name: "햄슈 포토홀더",
      price: 5000,
      img: "/assets/prodimg/photoholder_01.png",
    },
    { name: "햄슈 접시", price: 5000, img: "/assets/prodimg/plate.png" },
    { name: "햄슈 그릇", price: 5000, img: "/assets/prodimg/bowl.png" },
    { name: "햄슈 인형", price: 5000, img: "/assets/prodimg/stuffedham.png" },
  ];

  const dishData = [
    {
      name: "햄슈 그릇",
      price: 5000,
      img: "/assets/prodimg/bowl.png",
    },
    {
      name: "햄슈 접시",
      price: 5000,
      img: "/assets/prodimg/plate.png",
    },
    {
      name: "햄슈 머그",
      price: 5000,
      img: "/assets/prodimg/mug.png",
    },
    {
      name: "햄슈 메이드 접시",
      price: 5000,
      img: "/assets/prodimg/plate_02.png",
    },
  ];

  const photoData = [
    {
      name: "꼬옥 햄슈 포토홀더",
      price: 5000,
      img: "/assets/prodimg/cardholder_02.png",
    },
    {
      name: "메이드 햄슈 카드홀더",
      price: 5000,
      img: "/assets/prodimg/cardholder_01.png",
    },
    {
      name: "메이드 햄슈 포토홀더",
      price: 5000,
      img: "/assets/prodimg/photoholder_01.png",
    },
    {
      name: "햄슈 지구정복자격증",
      price: 5000,
      img: "/assets/prodimg/photoholder_02.png",
    },

    {
      name: "악마 햄슈 포토홀더",
      price: 5000,
      img: "/assets/prodimg/photoholder_04.png",
    },
    {
      name: "천사 햄슈 포토홀더",
      price: 5000,
      img: "/assets/prodimg/photoholder_05.png",
    },
    {
      name: "행운의 햄슈 오마모리",
      price: 5000,
      img: "/assets/prodimg/photoholder_03.png",
    },
  ];

  const keyringData = [
    {
      name: "졸린 햄슈 말랑키링",
      price: 5000,
      img: "/assets/prodimg/keyring_company.png",
    },
    {
      name: "냠냠 햄슈 말랑키링",
      price: 5000,
      img: "/assets/prodimg/keyring_food.png",
    },
    {
      name: "행운의 햄슈 말랑키링",
      price: 5000,
      img: "/assets/prodimg/keyring_lucky.png",
    },
    {
      name: "전단지 햄슈 말랑키링",
      price: 5000,
      img: "/assets/prodimg/keyring_sell.png",
    },
  ];

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const {
      currentTarget: { textContent, className },
    } = e;

    setCurname(`${textContent}`);
  };
  return (
    <>
      <div className="mainImg">
        <Image
          src={
            curname === "신상품"
              ? NewImage
              : curname === "식기"
              ? DishImage
              : curname === "키링"
              ? KeyringImage
              : curname === "포토카드"
              ? PhotoCardImage
              : curname === "베스트"
              ? NewImage
              : ""
          }
          alt="main"
          placeholder="blur"
          fill
        />
      </div>

      <ContentsWrap>
        <CategoryList>
          {cateData.map((x) => {
            return (
              <li
                key={x}
                onClick={(e) => {
                  onClick(e);
                }}
                className={curname === x ? "active" : undefined}
              >
                {x}
              </li>
            );
          })}
        </CategoryList>
        {curname === "신상품" ? (
          <New data={prodData} />
        ) : curname === "식기" ? (
          <Dish data={dishData} />
        ) : curname === "포토카드" ? (
          <Photocard data={photoData} />
        ) : curname === "키링" ? (
          <Keyring data={keyringData} />
        ) : curname === "베스트" ? (
          <Best data={prodData} />
        ) : null}
      </ContentsWrap>
      <Footer />
    </>
  );
}
