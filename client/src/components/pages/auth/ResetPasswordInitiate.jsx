import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Button, Form } from "react-bootstrap";
import background from "../../../img/rope.jpg";

const ResetPasswordInitiate = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const styles = {
    container: {
      backgroundImage: `url(${background})`,
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
    console.log({ email });
    try {
      const response = await axios.post("/api/auth/reset-password-initiate", {
        email,
      });
      console.log({ response });
      setMessage(response.data || response.data.message);
    } catch (error) {
      console.log({ error });
      if (error.response) {
        setMessage(error.response.data || error.response.data.message);
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <Container className="pt-3">
        <Row className="justify-content-center m-2">
          <h1 style={styles.h1}>Reset Password</h1>
        </Row>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
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

export default ResetPasswordInitiate;
