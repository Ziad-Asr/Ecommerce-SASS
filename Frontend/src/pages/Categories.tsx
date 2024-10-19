import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { GridList } from "@components/common";
import { Loading } from "@components/feedback";
import { TCategory } from "@customTypes/category";
import { actGetCategories } from "@store/Categories/CategoriesSlice";
import { Category } from "@components/eCommerce";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }
    // In eCommerce apps, it is not logic to call categories api every time I visit categories page
    // (Because it is not usual that categories are changing every day or every hour)
    // But it is logic to call products api each time because products are updated eventually
  }, [dispatch, records]);

  return (
    <Loading loading={loading} error={error}>
      <GridList<TCategory>
        records={records}
        renderItem={(record) => <Category {...record} />}
      />
    </Loading>
  );
};

export default Categories;
