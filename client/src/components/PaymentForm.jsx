import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = ({ onPayment, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);
    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (paymentMethod.error) {
      console.log(paymentMethod.error);
      return;
    }

    onPayment();
  };

  return (
    <form onSubmit={handlePaymentSubmit}>
      <CardElement />
      <button type="submit">Pay and Dispense</button>
      <button onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default PaymentForm;
