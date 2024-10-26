import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthHeader } from "@components/common";

import styles from "./styles.module.css";
const { container, wrapper } = styles;

const AuthLayout = () => {
  return (
    <Container className={container}>
      <AuthHeader />
      <div className={wrapper}>
        <Outlet />
      </div>
    </Container>
  );
};

export default AuthLayout;
