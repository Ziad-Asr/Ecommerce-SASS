import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Container } from "react-bootstrap";

import styles from "./styles.module.css";
const { notFound } = styles;

const Error = () => {
  const error = useRouteError(); // This hook allows me catch the error [[ 1)I made in routes , 2)to get the error server returned ]]

  let errorStatus: number;
  let errorStatusText: string;

  if (isRouteErrorResponse(error)) {
    // I amde this error
    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else {
    // server made this error
    errorStatus = 404;
    errorStatusText = "Page Not Found";
  }

  return (
    <Container className={notFound}>
      <h1>{errorStatus}</h1>
      <p>{errorStatusText}</p>
      <Link to="/" replace={true}>
        Return to home
      </Link>
    </Container>
  );
};

export default Error;
