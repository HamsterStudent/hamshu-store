import {
  addToCart,
  hideSideBar,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
} from "@/_redux/slices/cartSlice";
import {
  ICartItem,
  ICartState,
  IInitialState,
} from "@/app/(route)/cart/_types/cartType";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

interface IAddress {
  fullName: string;
  number: number;
  email: string;
  address: string;
  postalCode: string;
  detailAddress: string;
}

export default function useCart() {
  // useSelector //
  const cartItems: ICartItem[] = useSelector(
    (state: ICartState) => state.cart.cartItems,
  );
  const itemsPrice = useSelector((state: ICartState) => state.cart.itemsPrice);
  const shippingPrice = useSelector(
    (state: ICartState) => state.cart.shippingPrice,
  );
  const totalPrice = useSelector((state: ICartState) => state.cart.totalPrice);
  const taxPrice = useSelector((state: ICartState) => state.cart.taxPrice);
  const shippingAddress = useSelector(
    (state: ICartState) => state.cart.shippingAddress,
  );
  const paymentMethod = useSelector(
    (state: ICartState) => state.cart.paymentMethod,
  );
  const loading = useSelector((state: ICartState) => state.cart.loading);
  // useSelector //

  const cartData: IInitialState = {
    cartItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
    shippingAddress,
    paymentMethod,
    loading,
  };
  const cartEdit = useDispatch();

  const hideSideBarHandler = () => {
    cartEdit(hideSideBar());
  };

  const addToCartHandler = (product: any, qty: number) => {
    cartEdit(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id: string) => {
    cartEdit(removeFromCart(id));
  };
  const saveShippingAddressHandler = (data: IAddress) => {
    cartEdit(saveShippingAddress(data));
  };
  const savePaymentMethodHandler = ({ paymentMethod }: any) => {
    cartEdit(savePaymentMethod(paymentMethod));
  };
  return {
    cartData,
    hideSideBarHandler,
    addToCartHandler,
    removeFromCartHandler,
    saveShippingAddressHandler,
    savePaymentMethodHandler,
  };
}
