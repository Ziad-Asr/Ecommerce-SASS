import useCart from "./useCart";
import { Heading } from "@components/common";
import { Loading } from "@components/feedback";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";

const Cart = () => {
  const { loading, error, products, changeQuantityHandler, removeItemHandler } =
    useCart();
  return (
    <>
      <Heading title="Your Cart" />
      <Loading loading={loading} error={error}>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice products={products} />
          </>
        ) : (
          "Your Cart is empty"
        )}
      </Loading>
    </>
  );
};

export default Cart;
