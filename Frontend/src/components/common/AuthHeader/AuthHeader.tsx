import { Badge } from "react-bootstrap";

import styles from "./styles.module.css";
const { headerContainer, headerLogo } = styles;

const AuthHeader = () => {
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our</span> <Badge bg="info">Ecom</Badge>
        </h1>

        <h2>Login</h2>
      </div>
    </header>
  );
};

export default AuthHeader;
