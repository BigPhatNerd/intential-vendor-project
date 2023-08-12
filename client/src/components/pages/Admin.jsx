import React, { useEffect, useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import RegistrationContext from "../../context/registration/registrationContext";
import VendingContext from "../../context/vending/vendingContext";

const Admin = () => {
  const registrationContext = useContext(RegistrationContext);
  const { admin, logout } = registrationContext;
  const vendingContext = useContext(VendingContext);
  const { products, updateProduct } = vendingContext;
  console.log({ registrationContext, vendingContext });

  const handleUpdate = (id, updatedProduct) => {
    updateProduct(id, updatedProduct);
  };

  const handleLogoutClick = () => {
    logout(); // Calling the logout function from your context
    // You can add more actions here if needed after logging out, like redirecting the user
  };
  if (!admin.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <h2>Admin Dashboard</h2>
      <div className="products-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <h2>{product.name}</h2>
            <label>
              Price ($):
              <input
                type="number"
                value={product.priceCents / 100}
                onChange={(e) =>
                  handleUpdate(product._id, {
                    priceCents: e.target.value * 100,
                  })
                }
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  handleUpdate(product._id, { quantity: e.target.value })
                }
              />
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleLogoutClick} className="btn btn-danger">
        Logout
      </button>
      <div>
        <p>
          Return to the <Link to="/">vending machine</Link>.
        </p>
      </div>
    </>
  );
};

export default Admin;
