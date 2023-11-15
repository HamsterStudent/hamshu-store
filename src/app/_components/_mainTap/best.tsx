import Image from "next/image";
import { Banner, IProdData, Info } from "../mainComponentsStyle";
import ProdList from "../prodList";

export default function Best({ data }: IProdData) {
  return (
    <>
      <Info>www.햄슈 품속에 소중한 사람을 품어보세요.co.kr</Info>

      <ProdList data={data} />
    </>
  );
}
