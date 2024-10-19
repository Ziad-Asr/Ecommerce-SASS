import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actGetCategories } from "../store/Categories/CategoriesSlice";

import { Container, Row, Col } from "react-bootstrap";
import { Category } from "../components/eCommerce";
import { useEffect } from "react";

const Categories = () => {
  const { records, loading, error } = useAppSelector(
    (state) => state.categories
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (records.length === 0) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records]);
  // In eCommerce apps, it is not logic to call categories api every time I visit categories page
  // (Because it is not usual that categories are changing every day or every hour)
  // But it is logic to call products api each time because products are updated eventually

  const categoriesList = records
    ? records.map((record) => (
        <Col
          key={record.id}
          xs={6}
          md={3}
          className="d-flex justify-content-center mb-5 mt-2"
        >
          <Category {...record} />
        </Col>
      ))
    : "There are no records";

  return (
    <Container>
      <Row>{categoriesList}</Row>
    </Container>
  );
};

export default Categories;
