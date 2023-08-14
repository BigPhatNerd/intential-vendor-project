import React, { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import RegistrationContext from "../context/registration/registrationContext";
import axios from "axios";
import "./PaymentForm.css";

const PaymentForm = ({ onPayment, onCancel, amount }) => {
  const registrationContext = useContext(RegistrationContext);
  const { setAlert } = registrationContext;
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");

  const handlePaymentSubmit = async (event) => {
    console.log("handlePaymentSubmit");
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.log({ error });
      return;
    }

    try {
      const response = await axios.post("/stripe/charge", {
        source: token.id,
        email,
        amount, // and any other data you want to send
      });

      const data = response.data;
      console.log({ data });
      if (data.charge && data.charge.status === "succeeded") {
        console.log({ data });
        setAlert("Payment successful", "success");
        onPayment();
      } else {
        // Handle error (you could set an error state here to show to the user)
        console.log(data.message);
        setAlert(data.message, "danger");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setAlert(`Error processing payment: ${error}`, "danger");
    }
  };

  return (
    <form onSubmit={handlePaymentSubmit}>
      <div className="payment-form">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <CardElement />
      <button type="submit">Pay and Dispense</button>
      <button onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default PaymentForm;
