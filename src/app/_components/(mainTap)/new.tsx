import styled from "styled-components";
import ProdList from "../../_shared/_components/(product)/prod";
import Image from "next/image";

import FolderImg from "public/assets/banner/folder.png";
import BannerImg from "public/assets/banner/banner.png";
import WeeklyImg from "public/assets/banner/weekly_banner.png";
import { Banner, IProdData, Info } from "@/_style/mainComponentsStyle";
import Link from "next/link";

export default function New({ data }: IProdData) {
  return (
    <>
      <Info>www.핫하다 핫해 새로나온 따끈한 햄슈....co.kr</Info>

      <ProdList data={data} />

      <Link href="/about">
        <Banner>
          <Image src={FolderImg} alt="main" placeholder="blur" fill />
        </Banner>
      </Link>

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
