import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";

let products = [
  {
    id: "햄슈 그릇",
    name: "햄슈 그릇",
    tag: ["dish"],
    price: 5000,
    img: "/assets/prodimg/bowl.png",
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "햄슈 접시",
    name: "햄슈 접시",
    tag: ["dish"],
    price: 5000,
    img: "/assets/prodimg/plate.png",
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "햄슈 머그",
    name: "햄슈 머그",
    tag: ["dish"],
    price: 5000,
    img: "/assets/prodimg/mug.png",
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "햄슈 메이드 접시",
    name: "햄슈 메이드 접시",
    tag: ["dish"],
    price: 5000,
    img: "/assets/prodimg/plate_02.png",
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "꼬옥 햄슈 포토홀더",
    name: "꼬옥 햄슈 포토홀더",
    tag: ["photo"],
    price: 5000,
    img: "/assets/prodimg/cardholder_02.png",
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "메이드 햄슈 카드홀더",
    name: "메이드 햄슈 카드홀더",
    tag: ["photo"],
    price: 5000,
    img: "/assets/prodimg/cardholder_01.png",
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "메이드 햄슈 포토홀더",
    name: "메이드 햄슈 포토홀더",
    tag: ["photo"],
    price: 5000,
    img: "/assets/prodimg/photoholder_01.png",
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "햄슈 지구정복자격증",
    name: "햄슈 지구정복자격증",
    tag: ["photo"],
    price: 5000,
    img: "/assets/prodimg/photoholder_02.png",
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },

  {
    id: "악마 햄슈 포토홀더",
    name: "악마 햄슈 포토홀더",
    tag: ["photo"],
    price: 5000,
    img: "/assets/prodimg/photoholder_04.png",
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "천사 햄슈 포토홀더",
    name: "천사 햄슈 포토홀더",
    tag: ["photo"],
    price: 5000,
    img: "/assets/prodimg/photoholder_05.png",
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "행운의 햄슈 오마모리",
    name: "행운의 햄슈 오마모리",
    tag: ["photo"],
    price: 5000,
    img: "/assets/prodimg/photoholder_03.png",
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "졸린 햄슈 말랑키링",
    name: "졸린 햄슈 말랑키링",
    tag: ["keyring"],
    price: 5000,
    img: "/assets/prodimg/keyring_company.png",
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "냠냠 햄슈 말랑키링",
    name: "냠냠 햄슈 말랑키링",
    tag: ["keyring"],
    price: 5000,
    img: "/assets/prodimg/keyring_food.png",
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "행운의 햄슈 말랑키링",
    name: "행운의 햄슈 말랑키링",
    tag: ["keyring"],
    price: 5000,
    img: "/assets/prodimg/keyring_lucky.png",
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
  {
    id: "전단지 햄슈 말랑키링",
    name: "전단지 햄슈 말랑키링",
    tag: ["keyring"],
    price: 5000,
    img: "/assets/prodimg/keyring_sell.png",
    countInStock: 0,
    rating: 4.5,
    numReviews: 10,
    description: "so cute",
  },
];

const typeDefs = gql`
  type Query {
    hello: String
    allProducts: [Product]
    product(id: ID!): Product
    productsCate(tag: [String]): [Product]
  }

  type Product {
    id: ID!
    name: String!
    tag: [String]
    price: Int!
    img: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "world",
    allProducts() {
      return products;
    },
    product(__: any, { id }: { id: string }) {
      return products.find((prod) => prod.id === id);
    },
    productsCate(__: any, { tag }: { tag: [String] }) {
      return products.filter((product) =>
        product.tag.some((x) => tag.includes(x)),
      );
    },
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  console.log(request);
  return handler(request);
}
