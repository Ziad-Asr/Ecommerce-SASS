import { TProduct } from "@customTypes/products";
import { createSlice } from "@reduxjs/toolkit";
import { getCartTotalQuantitySelector } from "./selectors/index";

interface ICartState {
  items: { [key: number]: number }; // id: quantity
  productFullInfo: TProduct[]; // Comes from backend each time I visit shopping cart page
}

// Beacuse may product info change (price -image - ...) we only store it's (id - quantity)
// And each time I visit cart page => I make a call to backend with (ids) here in my state
// Backend response with the (full info) of these products
// I merge these full info with the quantity I have here , then show results to the user.

const initialState: ICartState = {
  items: {},
  productFullInfo: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const id = action.payload;

      // If id exists in the items object
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
  },
});

export { getCartTotalQuantitySelector };
export const { addToCart } = CartSlice.actions;
export default CartSlice.reducer;
