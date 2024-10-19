import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { GridList } from "@components/common";
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

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));
    // I used (casting) here I will not reach this state exept I make sure that the whole url is string in routes

    return () => {
      dispatch(productsCleanUp());
    }; // remove products from global state on leaving products page
  }, [dispatch, params]);

  return (
    <Loading loading={loading} error={error}>
      <GridList<TProduct>
        records={records}
        renderItem={(record) => <Product {...record} />}
      />
    </Loading>
  );
};

export default Products;
