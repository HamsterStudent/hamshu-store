import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div>
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div key={step}>{step}</div>
        ),
      )}
    </div>
  );
}
