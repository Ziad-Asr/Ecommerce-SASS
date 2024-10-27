import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  cleanUpProductsRecords,
} from "@store/Products/ProductsSlice";

const useProducts = () => {
  const params = useParams();
  const productPrefix = params.prefix;
  const dispatch = useAppDispatch();

  const { loading, error, records } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsId);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0, // Because (cartItems) here holds [{productID: productQuantity}, ....]
    isLiked: wishlistItemsId.includes(el.id),
    isAuthenticated: userAccessToken ? true : false,
  }));
  // Here I made the same array of products + (quantity) key
  // This helps me in (Fair Distribution Policy)

  useEffect(() => {
    const promise = dispatch(
      actGetProductsByCatPrefix(params.prefix as string)
    );
    // I used (casting) here I will not reach this state exept I make sure that the whole url is string in routes

    return () => {
      dispatch(cleanUpProductsRecords());
      promise.abort();
    }; // remove products from global state on leaving products page
  }, [dispatch, params]);

  return { loading, error, productsFullInfo, productPrefix };
};

export default useProducts;
