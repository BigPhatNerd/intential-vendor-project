import { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Container, Row, Button, Form } from "react-bootstrap";
import background from "../../../img/vending.jpg";
import RegistrationContext from "../../../context/registration/registrationContext";

const ResetPassword = () => {
  const registrationContext = useContext(RegistrationContext);
  const { admin, handlePasswordReset } = registrationContext;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

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
    p: {
      color: "white",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    handlePasswordReset(token, password);
  };

  if (admin.didResetPassword) {
    return <Redirect to="/login" />;
  }

  return (
    <div style={styles.container}>
      <Container className="pt-3">
        <Row className="justify-content-center m-2">
          <h1 style={styles.h1}>Reset Password</h1>
        </Row>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicPassword1">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword2">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Reset Password
          </Button>
        </Form>

        <Row className="ml-2 mt-2">
          <p style={styles.p}>{message}</p>
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

export default ResetPassword;
