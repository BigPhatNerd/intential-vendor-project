import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import RegistrationContext from "../../context/registration/registrationContext";
import VendingContext from "../../context/vending/vendingContext";
import axios from "axios";
import PaymentForm from "../PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { priceCentsToDollars } from "../../utils/helpers";
import { downloadFile } from "../../utils/helpers";
import Dispensary from "../Dispensary";
import vendingSound from "../../img/vending_sound.mp3";
import clickSound from "../../img/click_sound.mp3";

import "./Landing.css";

const stripePromise = loadStripe("pk_test_1IDxMXH0bopzjQn32aX3c9tH00ypXzcSHu");

const Landing = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDispensed, setIsProductDispensed] = useState(false);

  const registrationContext = useContext(RegistrationContext);
  const vendingContext = useContext(VendingContext);
  const { loadAdmin, admin, logout, setAlert } = registrationContext;
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

  const playVendingSound = () => {
    const audio = new Audio(vendingSound);
    audio.play();
  };

  const playClick = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  const handleDispenseClick = (product) => {
    playClick();
    setSelectedProduct(product);
    setIsPaymentModalOpen(true);
  };

  const handleSuccessfulPayment = async () => {
    console.log("PAYMENT SUCCESSFUL and handleSuccessfulPayment hit");
    playVendingSound();
    const success = await downloadFile(selectedProduct._id);
    if (success) {
      dispenseProduct(selectedProduct._id);
      setIsPaymentModalOpen(false);
      setSelectedProduct(null);
      setAlert("Purchase successful", "success");
      setIsProductDispensed(true);
      setTimeout(() => {
        setIsProductDispensed(false);
      }, 5000);
    } else {
      setIsPaymentModalOpen(false);
      setSelectedProduct(null);
      setAlert("Purchase failed", "danger");
    }
  };

  return (
    <div>
      <div className="vending-area">
        <div className="vending-machine-container">
          <div className="vending-machine">
            <div className="products-list">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="product-item"
                  onClick={() => handleDispenseClick(product)} // Here's the onClick event.
                >
                  <h2>{product.name}</h2>
                  <p className="product-description">{product.description}</p>
                  <p>Cost: ${priceCentsToDollars(product.priceCents)}</p>
                  <p>Quantity: {product.quantity}</p>
                  {/* Remove the button from here. */}
                </div>
              ))}
            </div>
            <Dispensary isProductDispensed={isProductDispensed} />
          </div>
          <div className="admin-buttons">
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
        </div>
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
    </div>
  );
};

export default Landing;
