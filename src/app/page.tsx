"use client";
import styled from "styled-components";
import Header from "./_components/header";
import Image from "next/image";
import ExImage from "public/assets/mainimg/main.png";
import Footer from "./_components/footer";
import ProdList from "./_components/prodList";
import New from "./_components/new";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Background = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  --dot-bg: #fff5e3;
  --dot-color: #cc7777;
  --dot-size: 2px;
  --dot-space: 40px;
  background: linear-gradient(
        90deg,
        var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
        transparent 1%
      )
      center / var(--dot-space) var(--dot-space),
    linear-gradient(
        var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
        transparent 1%
      )
      center / var(--dot-space) var(--dot-space),
    var(--dot-color);
`;

const AppWrap = styled.div`
  width: 430px;
  max-height: 914px;
  height: 100%;
  padding: 20px;
  background-color: #646464;
  border-radius: 20px;
  border: solid 0.7px;
  box-sizing: border-box;

  .mainImg {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      position: relative !important;
      object-fit: contain;
    }
  }
`;

const AppInner = styled.div`
  background-color: #fff;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ContentsWrap = styled.section`
  border-radius: 20px 20px 0 0;
  position: relative;
  top: -30px;
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

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const {
      currentTarget: { textContent, className },
    } = e;

    setCurname(`${textContent}`);
  };
  return (
    <main>
      <Background>
        <AppWrap>
          <AppInner>
            <Header />
            <div className="mainImg">
              <Image src={ExImage} alt="main" placeholder="blur" fill />
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

              <New data={prodData} />
            </ContentsWrap>
            <Footer />
          </AppInner>
        </AppWrap>
      </Background>
    </main>
  );
}
