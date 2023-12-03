import axios from "axios";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export async function POST(req: Request, res: Response) {
  const request = await req.json();
  const { imp_uid, merchant_uid, amount } = request;

  try {
    // 액세스 토큰(access token) 발급 받기
    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" },
      data: {
        imp_key: `${process.env.API_KEY}`, // REST API 키
        imp_secret: `${process.env.API_SECRET}`, // REST API Secret
      },
    });

    const { access_token } = getToken.data.response; // 인증 토큰

    // imp_uid로 포트원 서버에서 결제 정보 조회
    const getPaymentData = await axios({
      // imp_uid 전달
      url: `https://api.iamport.kr/payments/${imp_uid}`,
      // GET method
      method: "get",
      // 인증 토큰 Authorization header에 추가
      headers: { Authorization: access_token },
    });
    const paymentData = getPaymentData.data.response; // 조회한 결제 정보

    const { amount, status } = paymentData;

    // DB에서 결제되어야 하는 금액 조회
    // Firestore 쿼리 수행
    const q = query(collection(db, "payment"));
    const qSnap = await getDocs(q);
    let amountToBePaid;
    let dbId;
    for (let i = 0; i < qSnap.docs.length; i++) {
      if (paymentData.merchant_uid === qSnap.docs[i].data().merchant_uid) {
        console.log(i, qSnap.docs[i].data().merchant_uid);
        dbId = qSnap.docs[i].data().id;
        amountToBePaid = qSnap.docs[i].data().dbAmount;
      }
    }
    // DB금액, 지불금액 검증
    if (amount === amountToBePaid) {
      // await updateDoc(doc(db, "payment", dbId), { status: status });
      switch (status) {
        case "paid": // 결제 완료
          return Response.json("일반 결제 성공", { status: 200 });
      }
    } else {
      throw Response.json("위조된 결제시도", {
        status: 400,
      });
    }
  } catch (error) {
    return Response.json("An error occurred", {
      status: 500,
    });
  }
}
