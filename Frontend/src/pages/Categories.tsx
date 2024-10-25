import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { GridList, Heading } from "@components/common";
import { Loading } from "@components/feedback";
import { TCategory } from "@customTypes/category";
import {
  actGetCategories,
  categoriesRecordsCleanUp,
} from "@store/Categories/CategoriesSlice";
import { Category } from "@components/eCommerce";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(actGetCategories());

    return () => {
      dispatch(categoriesRecordsCleanUp());
    };
  }, [dispatch]);

  return (
    <Loading loading={loading} error={error}>
      <Heading title="Categories" />
      <GridList<TCategory>
        records={records}
        renderItem={(record) => <Category {...record} />}
      />
    </Loading>
  );
};

export default Categories;
