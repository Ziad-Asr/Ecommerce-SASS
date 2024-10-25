import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetCategories,
  categoriesRecordsCleanUp,
} from "@store/Categories/CategoriesSlice";

const useCategories = () => {
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

  return { loading, error, records };
};

export default useCategories;
