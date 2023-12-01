import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

const ModalWrap = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: #252525;
  opacity: 0.5;
`;
const Modal = styled.div`
  width: 95%;
  border-radius: 20px;
  overflow: hidden;
`;

export default function Postcode() {
  const [zipCode, setZipcode] = useState<string>("");
  const [roadAddress, setRoadAddress] = useState<string>("");
  const completeHandler = (data: any) => {
    setZipcode(data.zonecode); // 추가
    setRoadAddress(data.roadAddress); // 추가
  };
  return (
    <ModalWrap>
      <Modal>
        <DaumPostcode onComplete={completeHandler} />
      </Modal>
    </ModalWrap>
  );
}
