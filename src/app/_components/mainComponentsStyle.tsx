import styled from "styled-components";

export interface IProdData {
  data: {
    id: string;
    name: string;
    img: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
    description: string;
  }[];

  title?: string;
}

export const CategoryList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  li {
    width: 75px;
    height: 32px;
  }
`;

export const Info = styled.p`
  padding: 7px;
  background-color: #e6e7e7;
  border-radius: 30px;
  margin: 20px 10px 0 10px;
  font-size: 0.7rem;
  font-family: "UhBeeSe_hyun";
`;

export const Banner = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    position: relative !important;
    object-fit: contain;
  }
`;
