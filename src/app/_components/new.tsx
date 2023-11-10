import styled from "styled-components";
import ProdList from "./prodList";
import Image from "next/image";

import FolderImg from "public/assets/banner/folder.png";
import BannerImg from "public/assets/banner/banner.png";
import WeeklyImg from "public/assets/banner/weekly_banner.png";

const CategoryList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  li {
    width: 75px;
    height: 32px;
  }
`;

const Info = styled.p`
  padding: 7px;
  background-color: #e6e7e7;
  border-radius: 30px;
  margin: 20px 10px 0 10px;
  font-size: 0.7rem;
  font-family: "UhBeeSe_hyun";
`;

const Banner = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    position: relative !important;
    object-fit: contain;
  }
`;
interface INew {
  data: { name: string; img: string; price: number }[];
  title?: string;
}
export default function New({ data }: INew) {
  return (
    <>
      <Info>www.핫하다 핫해 새로나온 따끈한 햄슈....co.kr</Info>

      <ProdList data={data} />

      <Banner>
        <Image src={FolderImg} alt="main" placeholder="blur" fill />
      </Banner>

      <ProdList data={data} title="아크릴스탠드" />

      <Banner>
        <Image src={BannerImg} alt="main" placeholder="blur" fill />
      </Banner>
      <Banner>
        <Image src={WeeklyImg} alt="main" placeholder="blur" fill />
      </Banner>
    </>
  );
}
