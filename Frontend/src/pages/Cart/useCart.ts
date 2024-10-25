import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfoCleanUp,
} from "@store/cart/CartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";

const useCart = () => {
  const dispatch = useAppDispatch();

  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems()); // This returns only fullInfo of items in the cart
    return () => {
      promise.abort();
      dispatch(cleanCartProductsFullInfoCleanUp());
    };
  }, [dispatch]);

  // Add (quantity) to (productsFullInfo) of each item
  const products = productsFullInfo.map((el) => {
    return {
      ...el,
      quantity: items[el.id],
    };
  });

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );

  return { loading, error, products, changeQuantityHandler, removeItemHandler };
};

export default useCart;
