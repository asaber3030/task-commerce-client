import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cart.slice";
import shoppingCartSheetReducer from "./slices/shopping-cart-sheet.slice";
import favouritesReducer from "./slices/favs.slice.ts";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      shoppingCartSheet: shoppingCartSheetReducer,
      favourites: favouritesReducer
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
