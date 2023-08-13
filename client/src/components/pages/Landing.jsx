import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import RegistrationContext from "../../context/registration/registrationContext";
import VendingContext from "../../context/vending/vendingContext";
import axios from "axios";
import PaymentForm from "../PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { priceCentsToDollars } from "../../utils/helpers";
import "./Landing.css";

const stripePromise = loadStripe("pk_test_1IDxMXH0bopzjQn32aX3c9tH00ypXzcSHu");

const Landing = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const registrationContext = useContext(RegistrationContext);
  const vendingContext = useContext(VendingContext);
  const { loadAdmin, admin, logout } = registrationContext;
  console.log({ vendingContext, registrationContext });
  const { getProducts, dispenseProduct, products } = vendingContext;
  console.log({ products });
  useEffect(() => {
    loadAdmin();
    getProducts();
    //eslint-disable-next-line
  }, []);

  const handleLogoutClick = () => {
    logout();
  };

  const handleDispenseClick = (product) => {
    setSelectedProduct(product);
    setIsPaymentModalOpen(true);
  };

  const handleSuccessfulPayment = () => {
    console.log("PAYMENT SUCCESSFUL and handleSuccessfulPayment hit");
    dispenseProduct(selectedProduct._id);
    setIsPaymentModalOpen(false);
    setSelectedProduct(null);
    // maybe show some alert or notification to user
  };

  return (
    <div>
      <div>Landing</div>
      <div className="products-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Cost: ${priceCentsToDollars(product.priceCents)}</p>
            <p>Quantity: {product.quantity}</p>
            {/* <button onClick={() => dispenseProduct(product._id)}> */}
            <button onClick={() => handleDispenseClick(product)}>
              Dispense
            </button>
          </div>
        ))}
      </div>

      {/* Stripe Payment Modal */}
      {isPaymentModalOpen && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <Elements stripe={stripePromise}>
              <PaymentForm
                amount={selectedProduct.priceCents}
                onPayment={handleSuccessfulPayment}
                onCancel={() => setIsPaymentModalOpen(false)}
              />
            </Elements>
          </div>
        </div>
      )}

      {!admin.isAuthenticated && (
        <Link to="/login" className="btn btn-primary">
          Admin Login
        </Link>
      )}
      {admin.isAuthenticated && (
        <Link to="/admin" className="btn btn-primary">
          Restock
        </Link>
      )}
      {admin.isAuthenticated && (
        <button onClick={handleLogoutClick} className="btn btn-danger">
          Logout
        </button>
      )}
    </div>
  );
};

export default Landing;
