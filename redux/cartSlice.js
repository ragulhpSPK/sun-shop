import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addproduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload[0].price;
    },

    reset: (state) => {
      state = initialState;
    },
  },
});

export const { addproduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
