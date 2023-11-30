import React from "react";
import styled from "styled-components";

const CheckoutWrap = styled.div`
  border: solid 1px;
`;

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <CheckoutWrap>
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div key={step}>{step}</div>
        ),
      )}
    </CheckoutWrap>
  );
}
