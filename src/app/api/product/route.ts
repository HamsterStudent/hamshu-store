import { NextResponse } from "next/server";

const prodList = [
  {
    id: "1",
    name: "햄슈 에어팟",
    img: "/assets/prodimg/airpodcase.png",
    price: 30,
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "2",
    name: "햄슈 카드홀더",
    price: 1362,
    img: "/assets/prodimg/cardholder_01.png",
    countInStock: 10,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "3",
    name: "햄슈 포토홀더",
    price: 39,
    img: "/assets/prodimg/photoholder_01.png",
    countInStock: 10,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "4",
    name: "햄슈 접시",
    price: 100,
    img: "/assets/prodimg/plate.png",
    countInStock: 10,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "5",
    name: "햄슈 그릇",
    price: 100,
    img: "/assets/prodimg/bowl.png",
    countInStock: 10,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "6",
    name: "햄슈 인형",
    price: 100,
    img: "/assets/prodimg/stuffedham.png",
    countInStock: 10,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
];

export async function GET(req: Request) {
  return NextResponse.json(prodList);
}
