import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import RegistrationContext from "../../context/registration/registrationContext";
import VendingContext from "../../context/vending/vendingContext";
import axios from "axios";
import { priceCentsToDollars } from "../../utils/helpers";

const Landing = () => {
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
            <button onClick={() => dispenseProduct(product._id)}>
              Dispense
            </button>
          </div>
        ))}
      </div>

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
