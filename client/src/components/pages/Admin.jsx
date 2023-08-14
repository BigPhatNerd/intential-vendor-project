import React, { useEffect, useContext, useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import RegistrationContext from "../../context/registration/registrationContext";
import VendingContext from "../../context/vending/vendingContext";
import { priceCentsToDollars } from "../../utils/helpers";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

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
    console.log({ key, value, priceCents: product.priceCents });
    if (key === "priceCents" && value === product.priceCents) {
      const newUpdates = { ...updates };
      delete newUpdates[id];
      setUpdates(newUpdates);
      return;
    }
    if (key === "quantity") {
      if (value <= product.quantity) {
        value = product.quantity;
        console.log({ value, ref: ref });
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
  console.log({ quantityRefs: quantityRefs.current[0] });
  if (!admin.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12}>
            <h2>Admin Dashboard</h2>
            <h4>Max qty is 100 and inventory cannot be reduced</h4>
          </Col>
        </Row>
        <Row>
          {products.map((product, index) => (
            <Col md={6} key={product._id}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  {product.lastUpdatedBy && product.lastUpdatedBy.email ? (
                    <Card.Subtitle className="mb-2 text-muted">
                      Last updated by: {product.lastUpdatedBy.email}
                    </Card.Subtitle>
                  ) : null}
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Price ($):</InputGroup.Text>
                    <FormControl
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
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Quantity:</InputGroup.Text>
                    <FormControl
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
                      onKeyDown={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </InputGroup>
                  {updates[product._id] && (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => handleUpdate(product._id)}
                      >
                        Update
                      </Button>{" "}
                      <Button
                        variant="secondary"
                        onClick={() => handleReset(index, product)}
                      >
                        Reset
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <Button
              variant="danger"
              onClick={handleLogoutClick}
              className="mb-3"
            >
              Logout
            </Button>
            <p>
              Return to the <Link to="/">vending machine</Link>.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Admin;
