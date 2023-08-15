import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Button, Form } from "react-bootstrap";
import background from "../../../img/vending.jpg";
import RegistrationContext from "../../../context/registration/registrationContext";

const ResetPasswordInitiate = () => {
  const registrationContext = useContext(RegistrationContext);
  const { handlePasswordResetInitiate } = registrationContext;
  const [email, setEmail] = useState("");

  const styles = {
    container: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh",
    },
    h1: {
      color: "white",
    },
    email: {
      color: "white",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handlePasswordResetInitiate(email);
  };

  return (
    <div style={styles.container}>
      <Container className="pt-3">
        <Row className="justify-content-center m-2">
          <h1 style={styles.h1}>Reset Password</h1>
        </Row>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <div style={styles.email}>
              <Form.Label>Email</Form.Label>
            </div>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Request Reset Link
          </Button>
        </Form>

        <Row className="ml-2 mt-2">
          <p style={styles.p}> </p>
        </Row>

        <Row className="ml-2 mt-2">
          <Button variant="primary" as={Link} to="/">
            Return to Sign In
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPasswordInitiate;
