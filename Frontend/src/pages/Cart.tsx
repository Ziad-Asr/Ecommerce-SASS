import { Heading } from "@components/common";
import { CartItem, CartSubtotalPrice } from "@components/eCommerce";

const Cart = () => {
  return (
    <>
      <Heading>Cart</Heading>

      <CartItem />
      <CartItem />
      <CartItem />

      <CartSubtotalPrice />
    </>
  );
};

export default Cart;
