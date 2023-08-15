import { useContext, useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import RegistrationContext from "../../context/registration/registrationContext";
import VendingContext from "../../context/vending/vendingContext";
import { priceCentsToDollars } from "../../utils/helpers";
import background from "../../img/vending.jpg";
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
  const [updates, setUpdates] = useState({});
  const productRefs = useRef([]);
  const quantityRefs = useRef([]);

  const styles = {
    adminContainer: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh",
    },
    h2: {
      color: "white",
    },
    h4: {
      color: "white",
    },
    p: {
      color: "white",
    },
  };
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
      const productMax = {
        Fizz: 100,
        Pop: 100,
        Cola: 200,
        "Mega Pop": 50,
      };

      if (productMax[product.name] && value > productMax[product.name]) {
        value = productMax[product.name];
        ref.value = product.quantity;
        setAlert(
          `Maximum qty for ${product.name} is ${productMax[product.name]}`,
          "success"
        );
        return;
      }

      if (value <= product.quantity) {
        value = product.quantity;
        ref.value = product.quantity;
        setAlert("Cannot remove items from machine", "danger");
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

      const newUpdates = { ...updates };
      delete newUpdates[id];
      setUpdates(newUpdates);
    }
  };

  const handleReset = (index, product) => {
    productRefs.current[index].value = priceCentsToDollars(product.priceCents);
    quantityRefs.current[index].value = product.quantity;

    const newUpdates = { ...updates };
    delete newUpdates[product._id];
    setUpdates(newUpdates);
  };

  const handleLogoutClick = () => {
    logout();
  };

  if (!admin.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div style={styles.adminContainer}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12}>
            <h2 style={styles.h2} className="mt-5">
              Admin Dashboard
            </h2>
            <h4 style={styles.h4}>
              Max qty is 100 and inventory cannot be reduced
            </h4>
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
                      // min={product.quantity}
                      // max="100"
                      defaultValue={product.quantity}
                      ref={(input) => (quantityRefs.current[index] = input)}
                      onChange={(e) =>
                        handleChange(
                          product._id,
                          "quantity",
                          parseInt(e.target.value, 10),
                          quantityRefs.current[index]
                        )
                      }
                      onKeyDown={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </InputGroup>
                  <Card.Subtitle className="mb-2 text-muted">
                    Total stocked: {product.totalStocked}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    Total dispensed: {product.totalDispensed}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    Total sales: ${priceCentsToDollars(product.totalSales)}
                  </Card.Subtitle>
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
              variant="primary"
              onClick={handleLogoutClick}
              className="mb-3"
            >
              Logout
            </Button>
            <p style={styles.p}>
              Return to the <Link to="/">vending machine</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
