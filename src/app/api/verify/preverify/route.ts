import { db } from "@/firebase";
import axios from "axios";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

export async function POST(req: Request, res: Response) {
  const request = await req.json();
  const { merchant_uid, amount } = request;
  const doc = await addDoc(collection(db, "payment"), {
    createdAt: Date.now(),
    merchant_uid: merchant_uid,
    dbAmount: amount,
    status: "ready",
  });
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

    const { access_token } = getToken.data.response; // 인증 토큰

    const getData = await axios({
      url: `https://static-api.iamport.kr/payments/prepare?_token=${access_token}`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        merchant_uid: merchant_uid,
        amount: amount,
      },
    });
    const data = getData.data.response;
    return Response.json({ ...data, status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json("결제를 취소합니다", {
      status: 500,
    });
  }
}
