export interface IRootState {
  cart: IInitialState;
}

export interface IInitialState {
  loading: boolean;
  showSidebar?: boolean;
  cartItems: ICartItem[];
  shippingAddress: {
    fullName: string;
    number: number;
    email: string;
    address: string;
    detailAddress: string;
    postalCode: string;
  };
  paymentMethod: string;
  itemsPrice: string;
  shippingPrice: number;
  totalPrice: string;
  taxPrice?: string;
}

export interface ICartItem {
  countInStock: number;
  description: string;
  id: string;
  img: string;
  name: string;
  numReviews: number;
  price: number;
  qty: number;
  rating: number;
  quantity: number;
}
[];
