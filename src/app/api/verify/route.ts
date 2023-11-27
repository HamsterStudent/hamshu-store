import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

var db = [
  {
    id: "mid_1701064725675",
    amount: 3500,
  },
  {
    id: "mid_1701067997135",
    amount: 2000,
  },
];
export async function POST(req: Request, res: Response) {
  const request = await req.json();
  const { imp_uid, merchant_uid } = request;

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
    // const order = await Orders.findById(paymentData.merchant_uid);
    // const amountToBePaid = order.amount; // 결제 되어야 하는 금액

    console.log(merchant_uid, paymentData.merchant_uid);
  } catch (e) {
    request.status(400).send(e);
  }

  return NextResponse.json({ message: "Hello World" });
}
