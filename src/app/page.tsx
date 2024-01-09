"use client";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import NewImage from "public/assets/mainimg/main.png";
import DishImage from "public/assets/mainimg/dish.png";
import KeyringImage from "public/assets/mainimg/keyring.png";
import PhotoCardImage from "public/assets/mainimg/photocard.png";
import Footer from "./_shared/_components/footer";
import New from "./_components/(mainTap)/new";

import { data } from "@/_utils/data";
import { hideLoading } from "@/_redux/slices/cartSlice";
import useShowSidebar from "./_shared/_hooks/useShowSidebar";
import ProdList from "./_shared/_components/(product)/prodList";

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
  const dispatch = useDispatch();
  const { SidebarWrapper, openSidebar, closeSidebar } = useShowSidebar();

  useEffect(() => {
    dispatch(hideLoading());
  }, [dispatch]);

  const cateData = ["신상품", "식기", "포토카드", "키링", "베스트"];
  const { bestProducts } = data;

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const {
      currentTarget: { textContent, className },
    } = e;

    setCurname(`${textContent}`);
  };
  return (
    <>
      {SidebarWrapper}
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
          <New data={bestProducts} />
        ) : curname === "식기" ? (
          <ProdList dataName={"dish"} />
        ) : curname === "포토카드" ? (
          <ProdList dataName={"photo"} />
        ) : curname === "키링" ? (
          <ProdList dataName={"keyring"} />
        ) : curname === "베스트" ? (
          <ProdList dataName={"dish"} />
        ) : null}
      </ContentsWrap>
      <Footer />
    </>
  );
}
