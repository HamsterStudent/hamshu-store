import { ICartItem } from "@/app/_types/cartType";
import { db } from "@/firebase";
import axios from "axios";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

export async function POST(req: Request, res: Response) {
  const request = await req.json();
  const {
    merchant_uid,
    amount,
    cartItems,
  }: { merchant_uid: string; amount: number; cartItems: ICartItem[] } = request;

  try {
    // 액세스 토큰(access token) 발급 받기
    const getToken = await axios({
      url: "https://static-api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" },
      data: {
        imp_key: `${process.env.API_KEY}`, // REST API 키
        imp_secret: `${process.env.API_SECRET}`, // REST API Secret
      },
    });
    // console.log(getToken);
    // console.log(cartItems);
    let tempArr: string[] = [];
    cartItems.map((x) => tempArr.push(x.name));
    let tempItemArr: {
      name: string;
      qty: number;
    }[] = [];
    cartItems.map((x) => tempItemArr.push({ name: x.name, qty: x.qty }));

    const prodData = await axios({
      url: `http://localhost:3000/api/product`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        query: `
        query  {
          preVerifyProd(names: ${JSON.stringify(tempArr)}) {
            id 
            name
            tag
            price
          }
        }
      `,
      },
    });
    const {
      data: {
        data: { preVerifyProd },
      },
    } = prodData;

    const calculateTotalPrice = (
      products: {
        id: string;
        name: string;
        tag: string[];
        price: number;
      }[],
      quantities: {
        name: string;
        qty: number;
      }[],
    ) => {
      const totalPriceArray = [];
      for (const item of quantities) {
        const product = products.find((prod) => prod.name === item.name);

        if (product) {
          const totalPrice = product.price * item.qty;
          totalPriceArray.push({ name: item.name, totalPrice });
        }
      }
      return totalPriceArray;
    };

    const result = calculateTotalPrice(preVerifyProd, tempItemArr);
    const totalAmount = result.reduce((acc, cur) => {
      return acc + cur.totalPrice;
    }, 0);

    if (totalAmount !== amount)
      return Response.json("가격 불일치", {
        status: 500,
      });

    const { access_token } = getToken.data.response; // 인증 토큰

    const getData = await axios({
      url: `https://static-api.iamport.kr/payments/prepare?_token=${access_token}`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        merchant_uid: merchant_uid,
        amount: totalAmount,
      },
    });
    const data = getData.data.response;

    const doc = await addDoc(collection(db, "payment"), {
      createdAt: Date.now(),
      merchant_uid: merchant_uid,
      dbAmount: totalAmount,
      status: "ready",
    });

    return Response.json({ ...data, status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json("결제를 취소합니다", {
      status: 500,
    });
  }
}
