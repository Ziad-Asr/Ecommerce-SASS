import { configureStore } from "@reduxjs/toolkit";
import categories from "./Categories/CategoriesSlice";

export const store = configureStore({
  reducer: { categories },
});

export type RootState = ReturnType<typeof store.getState>; // In components, when I type (state.) it gives me a list of available reducers
export type AppDispatch = typeof store.dispatch; // In components, this make sure that action (like actGetCategories) is exist when I am (dispatcing) it

export default store;
