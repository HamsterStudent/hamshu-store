"use client";
import Image from "next/image";
import styled from "styled-components";
import MainImg from "public/assets/about/main.png";
import AboutDesc from "public/assets/about/desc.png";
import About01 from "public/assets/about/01.png";
import About02 from "public/assets/about/02.png";
import About03 from "public/assets/about/03.png";
import About04 from "public/assets/about/04.png";
import About05 from "public/assets/about/05.png";
import About06 from "public/assets/about/06.png";
import About07 from "public/assets/about/07.png";
import About08 from "public/assets/about/08.png";

const ContentsWrap = styled.section`
  margin: 15px;
  border: 10px solid transparent;
  border-image: url("/assets/icon/prodline.png") 17 round;
`;

const ContentsInner = styled.div`
  background-color: #fffbdd;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  .temp {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 10px solid transparent;
    border-image: url("/assets/icon/prodline.png") 17 round;
  }
  .imgWrap {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      position: relative !important;
      object-fit: contain;
    }
  }
`;

const TopDeco = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "UhBeeSe_hyun";
  font-size: 12px;
  margin: 1px 4px 6px 4px;
  img {
    width: 50px;
  }
`;

export default function About() {
  return (
    <ContentsWrap>
      <TopDeco>
        <p>햄슈 자격증</p>
        <img src="/assets/icon/deco.png" alt="deco" />
      </TopDeco>

      <ContentsInner>
        <div className="imgWrap">
          <Image src={MainImg} alt="main" />
        </div>
        <div className="imgWrap" style={{ width: "90%" }}>
          <Image src={AboutDesc} alt="desc" />
        </div>
        <div className="imgWrap">
          <Image src={About01} alt="desc" />
        </div>
        <div className="imgWrap">
          <Image src={About02} alt="desc" />
        </div>
        <div className="imgWrap">
          <Image src={About03} alt="desc" />
        </div>
        <div className="imgWrap">
          <Image src={About04} alt="desc" />
        </div>
        <div className="imgWrap">
          <Image src={About05} alt="desc" />
        </div>
        <div className="imgWrap">
          <Image src={About06} alt="desc" />
        </div>
        <div className="imgWrap">
          <Image src={About07} alt="desc" />
        </div>
        <div className="imgWrap">
          <Image src={About08} alt="desc" />
        </div>
        <div className="temp"></div>
      </ContentsInner>
    </ContentsWrap>
  );
}
