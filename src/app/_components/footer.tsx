import Image from "next/image";
import styled from "styled-components";
import ExImage from "public/assets/banner/footer.png";

const FooterWrap = styled.section`
  .footerImg {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      position: relative !important;
      object-fit: contain;
      display: block;
    }
  }
`;

export default function Footer() {
  return (
    <FooterWrap>
      <div className="footerImg">
        <Image src={ExImage} alt="main" placeholder="blur" fill />
      </div>
    </FooterWrap>
  );
}
