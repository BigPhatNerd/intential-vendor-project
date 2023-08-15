import { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import RegistrationContext from "../../../context/registration/registrationContext";
import { Container, Row, Button, Form } from "react-bootstrap";
import background from "../../../img/vending.jpg";

const Login = () => {
  const registrationContext = useContext(RegistrationContext);
  const { admin, login, setAlert } = registrationContext;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
    email: {
      color: "white",
    },
    password: {
      color: "white",
    },
  };
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login(email, password);
    }
  };

  if (admin.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div style={styles.container} className="darkOverlay">
      <Container className="pt-3">
        <Row className="justify-content-center m-2">
          <h1 style={styles.h1}>Sign In </h1>
        </Row>

        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group controlId="formBasicEmail">
            <div style={styles.email}>
              <Form.Label>Email</Form.Label>
            </div>
            <Form.Control
              onChange={(e) => onChange(e)}
              value={email}
              name="email"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <div style={styles.password}>
              <Form.Label>Password</Form.Label>
            </div>
            <Form.Control
              onChange={(e) => onChange(e)}
              value={password}
              name="password"
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="ml-2 mt-2">
          <p style={styles.p}>
            Don’t have an account?&nbsp;{" "}
            <Link to="/register">Register here</Link>
          </p>
        </Row>
        <Row className="ml-2 mt-2">
          <p style={styles.p}>
            Forgot password?&nbsp;{" "}
            <Link to="/reset-password-initiate">Reset password</Link>
          </p>
        </Row>
        <Row className="ml-2 mt-2">
          <Button variant="primary" as={Link} to="/">
            Return to vending
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
