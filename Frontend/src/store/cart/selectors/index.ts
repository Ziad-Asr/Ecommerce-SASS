import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../index";

const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    // items => The return of [ (state) => state.cart.items ]

    const totalQuantity = Object.values(items).reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );

    return totalQuantity;
  }
);

export { getCartTotalQuantitySelector };
