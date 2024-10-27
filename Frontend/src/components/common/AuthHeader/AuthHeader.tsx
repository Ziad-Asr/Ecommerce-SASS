import { Badge } from "react-bootstrap";

import styles from "./styles.module.css";
const { headerContainer, headerLogo } = styles;

const AuthHeader = () => {
  const urlSlices = window.location.href.split("/");
  const authType = urlSlices[urlSlices.length - 1].split("?");
  const type = authType.includes("login")
    ? "Login"
    : urlSlices.includes("register")
    ? "Register"
    : "";

  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our</span> <Badge bg="info">Ecom</Badge>
        </h1>

        <h2>{type}</h2>
      </div>
    </header>
  );
};

export default AuthHeader;
