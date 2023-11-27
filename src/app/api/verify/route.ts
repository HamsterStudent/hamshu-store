import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { merchant_uid, amount } = req.body;

    console.log(merchant_uid, amount);

    // try {
    //   const response = await axios({
    //     url: "https://api.iamport.kr/payments/prepare",
    //     method: "post",
    //     headers: { "Content-Type": "application/json" },
    //     data: {
    //       merchant_uid: merchant_uid,
    //       amount: amount,
    //     },
    //   });

    //   res.status(200).json(response.data);
    // } catch (error) {
    //   console.error("Error verifying payment:", error);
    //   res.status(500).json({ error: "Error verifying payment" });
    // }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
  return NextResponse.json({ res });
}
