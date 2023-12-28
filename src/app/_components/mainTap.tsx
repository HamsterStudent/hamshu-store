import Image from "next/image";

import axios from "axios";
import { useEffect, useState } from "react";
import { Info } from "../../_style/mainComponentsStyle";
import ProdList from "../_shared/prodList";

export default function MainTap({ dataName }: { dataName: string }) {
  const [prodData, setProdData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [dataName]);
  const fetchData = async () => {
    try {
      const response = await axios.post("/api/product", {
        query: `
        query {
          productsCate(tag: ["${dataName}"]) {
            id
            img
            name
            price
            tag
          }
        }
      `,
      });
      const {
        data: {
          data: { productsCate },
        },
      } = response;
      setProdData(productsCate);
    } catch (error) {
      console.error("hamsterProd:", error);
    }
  };
  return (
    <>
      <Info>
        www.햄슈그릇에 먹으면 건강해지고 더 맛있어집니다. 진짜임.co.kr
      </Info>

      <ProdList data={prodData} />
    </>
  );
}
