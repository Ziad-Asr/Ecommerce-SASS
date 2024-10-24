import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { GridList, Heading } from "@components/common";
import { Loading } from "@components/feedback";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/Products/ProductsSlice";
import { TProduct } from "@customTypes/products";
import { Product } from "@components/eCommerce";

const Products = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const { loading, error, records } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsId);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0, // Because (cartItems) here holds [{productID: productQuantity}, ....]
    isLiked: wishlistItemsId.includes(el.id),
  }));
  // Here I made the same array of products + (quantity) key
  // This helps me in (Fair Distribution Policy)

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));
    // I used (casting) here I will not reach this state exept I make sure that the whole url is string in routes

    return () => {
      dispatch(productsCleanUp());
    }; // remove products from global state on leaving products page
  }, [dispatch, params]);

  return (
    <>
      <Heading>
        <span className="text-capitalize">{params.prefix}</span> Products
      </Heading>
      <Loading loading={loading} error={error}>
        <GridList<TProduct>
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Products;
