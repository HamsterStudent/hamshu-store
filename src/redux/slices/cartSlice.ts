import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface IInitialState {
  loading: boolean;
  cartItems: any;
  shippingAddress: any;
}

const initialState: IInitialState = Cookies.get("cart")
  ? { ...JSON.parse(Cookies.get("cart")!), loading: true, showSidebar: false }
  : { loading: true, showSlidbar: false, cartItems: [], shippingAddress: {} };

const addDecimals = (num: any) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: any, action: any) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x: any) => x.id === item.id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x: any) =>
          x.id === existItem.id ? item : x,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc: any, item: any) => acc + item.price * item.qty,
          0,
        ),
      );
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);
      state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));
      state.totalPrice = addDecimals(
        Number(state.itemPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice),
      );
      Cookies.set("cart", JSON.stringify(state));
    },
    removeFromCart: (state: any, action) => {
      state.cartItems = state.cartItems.filter(
        (x: any) => x.id !== action.payload,
      );
      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc: any, item: any) => acc + item.price * item.qty,
          0,
        ),
      );
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);
      state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));
      state.totalPrice = addDecimals(
        Number(state.itemPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice),
      );
      Cookies.set("cart", JSON.stringify(state));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      Cookies.set("cart", JSON.stringify(state));
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, hideLoading } =
  cartSlice.actions;

export default cartSlice.reducer;
