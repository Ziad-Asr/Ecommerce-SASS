import styles from "./styles.module.css";

const CartSubtotalPrice = () => {
  //   const subtotal = products.reduce((accumulator, el) => {
  //     const price = el.price;
  //     const quantity = el.quantity;
  //     if (quantity && typeof quantity === "number") {
  //       return accumulator + price * quantity;
  //     } else {
  //       return accumulator;
  //     }
  //   }, 0);

  return (
    <div className={styles.container}>
      <span>Subtotal:</span>
      <span>200</span>
    </div>
  );
};

export default CartSubtotalPrice;
