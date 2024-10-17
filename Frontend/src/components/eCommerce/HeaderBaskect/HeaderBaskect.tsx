import Logo from "@assets/svg/cart.svg?react";
import styles from "./styles.module.css";

const { basketContainer, basketQuantity } = styles;

const HeaderBaskect = () => {
  return (
    <div className={basketContainer}>
      <Logo title="Basket icon" />
      <div className={basketQuantity}>0</div>
    </div>
  );
};

export default HeaderBaskect;
