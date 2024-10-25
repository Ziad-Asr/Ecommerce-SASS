import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
import { axiosErrorHandler } from "@utils";
import { TProduct } from "@types";

type TResponse = TProduct[];

// This action is used to send cart items ids to the backend and (get all these items info)
// And put them in (productsFullInfo) in the slice

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);

    if (!itemsId.length) {
      return fulfillWithValue([]);
    }
    // I made this condition here to not execute the rest of the code
    // But I return an empty array, because in (fulfiled) it expects to get an array in (action.payload)

    try {
      const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join("&");
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`,
        { signal }
      ); // localhost:5000://products?id=1&id=2&id=3&... => return all items in the cart
      // Do not return all items info, only return info of cart items (items of these ids)

      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByItems;
