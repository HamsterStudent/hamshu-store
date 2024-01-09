import Image from "next/image";
import styled from "styled-components";
import FooterImg from "public/assets/banner/footer.png";

const FooterWrap = styled.section`
  position: relative;
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

const TextWrap = styled.div`
  padding: 20px 10px;
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 12px;
  :first-child {
    margin-bottom: 20px;
  }
  :last-child {
    margin-top: 20px;
  }
  .strong {
    font-weight: 700;
  }
`;

export default function Footer() {
  return (
    <FooterWrap>
      <div className="footerImg">
        <Image src={FooterImg} alt="main" placeholder="blur" fill />
      </div>
      <TextWrap>
        <p className="strong">김햄슈(KIM HANSHU)</p>
        <p>디자이너 : 박한빈</p>
        <p>주소 : 서울시 강서구 공항동</p>
        <p>문의메일 : eyis07@naver.com</p>
        <p className="strong">Copyrightⓒ 2022 HAMSHU. All Rights Reserved.</p>
      </TextWrap>
    </FooterWrap>
  );
}
