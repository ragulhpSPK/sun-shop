import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import userSlice from "./userSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    user: userSlice,
  },
});
