import { CartItem } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const saveToStorage = (state: CartItem[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("cart-list", JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

const initialCartState: CartItem[] = JSON.parse(localStorage.getItem("cart-list") || "[]");

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, { payload }: { payload: CartItem }) => {
      const findItem = state.find((item) => item.id === payload.id);
      if (!findItem) {
        state.push(payload);
        toast.success("Item has been added to cart successfully!");
        saveToStorage(state);
      } else {
        toast.error("Item is already in the cart.");
      }
    },
    removeFromCart: (state, { payload }: { payload: number }) => {
      const itemIndex = state.findIndex((item) => item.id === payload);
      if (itemIndex !== -1) {
        state.splice(itemIndex, 1);
        toast.success("Item has been removed from cart.");
        saveToStorage(state);
      } else {
        toast.error("Item not found in the cart.");
      }
    },
    increaseQuantity: (state, { payload }: { payload: number }) => {
      const findItem = state.find((item) => item.id === payload);
      if (findItem) {
        findItem.quantity += 1;
        findItem.totalPrice = findItem.quantity * findItem.unitPrice;
        saveToStorage(state);
      } else {
        toast.error("Item not found in the cart.");
      }
    },
    decreaseQuantity: (state, { payload }: { payload: number }) => {
      const findItem = state.find((item) => item.id === payload);
      if (findItem) {
        findItem.quantity = Math.max(1, findItem.quantity - 1);
        findItem.totalPrice = findItem.quantity * findItem.unitPrice;
        saveToStorage(state);
      } else {
        toast.error("Item not found in the cart.");
      }
    },
    emptyCart: (state) => {
      state.length = 0; // Clear the array
      saveToStorage(state);
      toast.success("Cart has been emptied.");
    },
    setCart: (state, { payload }: { payload: CartItem[] }) => {
      state.splice(0, state.length, ...payload); // Replace current state
      saveToStorage(state);
    }
  }
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, emptyCart, setCart } =
  cartSlice.actions;
