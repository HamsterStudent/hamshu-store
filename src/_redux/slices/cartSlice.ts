import { IInitialState } from "@/app/(route)/cart/_types/cartType";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState: IInitialState = Cookies.get("cart")
  ? { ...JSON.parse(Cookies.get("cart")!), loading: true, showSidebar: false }
  : {
      loading: true,
      showSidebar: false,
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "",
    };

const addDecimals = (num: number) => {
  return Math.round(num).toFixed(0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? item : x,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
      );
      state.shippingPrice = 100;
      // state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
      state.totalPrice = addDecimals(
        Number(state.itemsPrice) + Number(state.shippingPrice),
        // 세금
        // + Number(state.taxPrice),
      );
      state.showSidebar = true;
      Cookies.set("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
      );
      state.shippingPrice = 100;
      // state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
      state.totalPrice = addDecimals(
        Number(state.itemsPrice) + Number(state.shippingPrice),
        //세금
        // + Number(state.taxPrice),
      );
      Cookies.set("cart", JSON.stringify(state));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      Cookies.set("cart", JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      Cookies.set("cart", JSON.stringify(state));
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    hideSideBar: (state) => {
      state.showSidebar = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  hideLoading,
  hideSideBar,
} = cartSlice.actions;

export default cartSlice.reducer;
