import Logo from "@assets/svg/cart.svg?react";
import styles from "./styles.module.css";
import { useAppSelector } from "@store/hooks";
import { getCartTotalQuantitySelector } from "@store/cart/CartSlice";

const { basketContainer, basketQuantity } = styles;

const HeaderBaskect = () => {
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);

  // This is how I get the some of all value from an object ({'test': 5, 'test2': 11, ...})
  // reduce() => Used in summition of many values from an array (takes 0 as an initial value)

  return (
    <div className={basketContainer}>
      <Logo title="Basket icon" />
      <div className={basketQuantity}>{totalQuantity}</div>
    </div>
  );
};

export default HeaderBaskect;
