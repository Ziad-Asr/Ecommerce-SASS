import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "./Error.module.css";
const { notFound } = styles;

const Error = () => {
  return (
    <Container className={notFound}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/" replace={true}>
        Return to home
      </Link>
    </Container>
  );
};

export default Error;
