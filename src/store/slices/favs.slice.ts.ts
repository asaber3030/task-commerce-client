import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const saveToStorage = (state: number[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("favs-list", JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

const initialCartState: number[] = JSON.parse(localStorage.getItem("favs-list") || "[]");

const cartSlice = createSlice({
  name: "favourites",
  initialState: initialCartState,
  reducers: {
    addToFavourties: (state, { payload }: { payload: number }) => {
      if (!state.includes(payload)) {
        state.push(payload);
        toast.success("Item has been added to favourites successfully!");
        saveToStorage(state);
      } else {
        toast.error("Item is already in the favourites.");
      }
    },

    removeFromFavourites: (state, { payload }: { payload: number }) => {
      const itemIndex = state.findIndex((item) => item === payload);
      if (itemIndex !== -1) {
        state.splice(itemIndex, 1);
        toast.success("Item has been removed from favourites.");
        saveToStorage(state);
      } else {
        toast.error("Item not found in the favourites.");
      }
    }
  }
});

export default cartSlice.reducer;
export const { addToFavourties, removeFromFavourites } = cartSlice.actions;
