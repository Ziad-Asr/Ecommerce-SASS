import { Badge } from "react-bootstrap";

import styles from "./styles.module.css";
const { headerContainer, headerLogo } = styles;

const AuthHeader = () => {
  const urlSlices = window.location.href.split("/");
  const authType = urlSlices[urlSlices.length - 1].replace(/^\w/, (c) =>
    c.toUpperCase()
  );

  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our</span> <Badge bg="info">Ecom</Badge>
        </h1>

        <h2>{authType}</h2>
      </div>
    </header>
  );
};

export default AuthHeader;
