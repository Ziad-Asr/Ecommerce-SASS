import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/Products/ProductsSlice";
import { useParams } from "react-router-dom";

const Products = () => {
  const { records, loading, error } = useAppSelector((state) => state.products);
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));
    // I used (casting) here I will not reach this state exept I make sure that the whole url is string in routes

    return () => {
      dispatch(productsCleanUp());
    }; // remove products from global state on leaving products page
  }, [dispatch, params]);

  const ProductsList = records
    ? records.map((record) => (
        <Col
          key={record.id}
          xs={6}
          md={3}
          className="d-flex justify-content-center mb-5 mt-2"
        >
          <Product {...record} />
        </Col>
      ))
    : "There are no records";

  return (
    <Container>
      <Row>{ProductsList}</Row>
    </Container>
  );
};

export default Products;
