import Image from "next/image";
import { Banner, IProdData, Info } from "../mainComponentsStyle";
import ProdList from "../prodList";

export default function Keyring({ data }: IProdData) {
  return (
    <>
      <Info>
        www.햄슈그릇에 먹으면 건강해지고 더 맛있어집니다. 진짜임.co.kr
      </Info>

      <ProdList data={data} />
    </>
  );
}
