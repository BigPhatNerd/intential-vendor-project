import React, { useEffect, useContext, useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import RegistrationContext from "../../context/registration/registrationContext";
import VendingContext from "../../context/vending/vendingContext";
import { priceCentsToDollars } from "../../utils/helpers";

const Admin = () => {
  const registrationContext = useContext(RegistrationContext);
  const { admin, logout, setAlert } = registrationContext;
  const vendingContext = useContext(VendingContext);
  const { products, updateProduct } = vendingContext;
  console.log({ registrationContext, vendingContext });

  const [updates, setUpdates] = useState({});

  const handleChange = (id, key, value, ref) => {
    const product = products.find((p) => p._id === id);
    if (key === "quantity" && value === product.quantity) {
      const newUpdates = { ...updates };
      delete newUpdates[id];
      setUpdates(newUpdates);
      return;
    }
    if (key === "priceCents" && value === product.priceCents) {
      const newUpdates = { ...updates };
      delete newUpdates[id];
      setUpdates(newUpdates);
      return;
    }
    if (key === "quantity") {
      if (value <= product.quantity) {
        value = product.quantity;
        setAlert("Cannot remove items from machine", "danger");
        return;
      }
      if (value > 100) {
        value = 100;
        setAlert("Maximum qty is 100", "danger");
        return;
      }
    }

    if (key === "priceCents" && ref) {
      ref.value = priceCentsToDollars(value);
    }

    const productUpdates = updates[id] || {};
    productUpdates[key] = value;
    setUpdates({
      ...updates,
      [id]: productUpdates,
    });
  };

  const handleUpdate = (id) => {
    if (updates[id]) {
      const updatedProductInfo = {
        id: id,
        ...updates[id],
      };
      updateProduct(updatedProductInfo, admin.id);

      // Optionally, clear the updates for this product after successful update
      const newUpdates = { ...updates };
      delete newUpdates[id];
      setUpdates(newUpdates);
      // I need to set alert for successful update
      // Set alert for errors
    }
  };

  const handleReset = (index, product) => {
    // Reset the ref input fields to their original values
    productRefs.current[index].value = priceCentsToDollars(product.priceCents);
    quantityRefs.current[index].value = product.quantity;

    // Clear any updates for this product
    const newUpdates = { ...updates };
    delete newUpdates[product._id];
    setUpdates(newUpdates);
  };

  const handleLogoutClick = () => {
    logout(); // Calling the logout function from your context
    // You can add more actions here if needed after logging out, like redirecting the user
  };

  const productRefs = useRef([]);
  const quantityRefs = useRef([]);

  if (!admin.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h2>Admin Dashboard</h2>
      <div className="products-list">
        {products.map((product, index) => (
          <div key={product._id} className="product-item">
            <h2>{product.name}</h2>
            {/* Display last updated by email */}
            {product.lastUpdatedBy && product.lastUpdatedBy.email ? (
              <div className="updated-by">
                <span>Last updated by: {product.lastUpdatedBy.email}</span>
              </div>
            ) : null}
            <div>
              <label>Price ($):</label>
              <input
                type="number"
                step="0.01"
                ref={(input) => (productRefs.current[index] = input)}
                defaultValue={priceCentsToDollars(product.priceCents)}
                onChange={(e) =>
                  handleChange(
                    product._id,
                    "priceCents",
                    parseFloat(e.target.value) * 100,
                    productRefs.current[index]
                  )
                }
              />
            </div>
            <div>
              <label>Quantity:</label>
              <input
                type="number"
                step="1"
                min={product.quantity}
                max="100"
                defaultValue={product.quantity}
                ref={(input) => (quantityRefs.current[index] = input)}
                onChange={(e) =>
                  handleChange(
                    product._id,
                    "quantity",
                    parseInt(e.target.value, 10)
                  )
                }
              />
            </div>
            {updates[product._id] && (
              <>
                <button onClick={() => handleUpdate(product._id)}>
                  Update
                </button>
                <button onClick={() => handleReset(index, product)}>
                  Reset
                </button>
              </>
            )}
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
