import styled from "styled-components";

const ProdListWrap = styled.div`
  margin: 10px 0;
  h2 {
    display: inline-block;
    position: relative;
    padding-left: 55px;
    height: 30px;
    &::before {
      content: "";
      width: 35px;
      height: 35px;
      position: absolute;
      top: 0;
      left: 10px;
      background: url("/assets/icon/icon_folder.png") no-repeat;
      background-size: contain;
    }
  }
  .imgWrap {
    width: 100px;
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
      position: relative !important;
      object-fit: contain;
    }
  }
`;

const ProdListInner = styled.ul`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 49%;
    margin-bottom: 10px;

    .prodImg {
      width: 100%;
      position: relative;
      border: 5px solid transparent;
      border-image: url("/assets/icon/prodline.png") 17 round;
      img {
        width: 100%;
        height: 100%;
        position: relative !important;
        object-fit: contain;
        display: block;
      }
    }
  }
`;

const ProdDesc = styled.div`
  margin-top: 5px;
  font-size: 0.8rem;
  font-family: "UhBeeSe_hyun";
`;

interface IProdList {
  data: { name: string; img: string; price: number }[];
  title?: string;
}

export default function ProdList({ data, title }: IProdList) {
  return (
    <ProdListWrap>
      {title ? (
        <h2>
          <div className="imgWrap">
            <img src="/assets/title/acrylic_title.png" alt="acrylic_title" />
          </div>
          {/* {title} */}
        </h2>
      ) : null}

      <ProdListInner>
        {data.map((x) => {
          return (
            <li key={x.name}>
              <div className="prodImg">
                <div className="decoBorder"></div>
                <img src={x.img} alt={x.name} />
              </div>
              <ProdDesc>
                <p>{x.price}$</p>
                <p>{x.name}</p>
              </ProdDesc>
            </li>
          );
        })}
      </ProdListInner>
    </ProdListWrap>
  );
}
