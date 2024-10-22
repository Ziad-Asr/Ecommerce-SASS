import { TProduct } from "@customTypes/products";
import { createSlice } from "@reduxjs/toolkit";
import { getCartTotalQuantitySelector } from "./selectors/index";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { TLoading } from "@customTypes/shared";

interface ICartState {
  items: { [key: string]: number }; // id: quantity (key in object => Js always transform it to a (string))
  productsFullInfo: TProduct[]; // Comes from backend each time I visit shopping cart page
  loading: TLoading;
  error: null | string;
}

// Beacuse may product info change (price -image - ...) we only store it's (id - quantity)
// And each time I visit cart page => I make a call to backend with (ids) here in my state
// Backend response with the (full info) of these products
// I merge these full info with the quantity I have here , then show results to the user.

const initialState: ICartState = {
  items: {}, // id: quantity
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const id = action.payload;

      // If id exists in the items object
      if (state.items[id]) {
        state.items[id]++; // (increase) it's value by 1
      } else {
        state.items[id] = 1; // (intialize) value with 1
      }
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (el) => el.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export { getCartTotalQuantitySelector, actGetProductsByItems };
export const { addToCart, cartItemChangeQuantity, cartItemRemove } =
  CartSlice.actions;
export default CartSlice.reducer;
