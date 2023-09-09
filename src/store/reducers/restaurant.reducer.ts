import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRestaurant, IRestaurantState } from "models/restaurants";

const initialState: IRestaurantState = {
  restaurants: {
    data: [],
    error: "",
    loading: false,
  },
  restaurant: {
    data: null,
    error: "",
    loading: false,
  },
};

export const RestaurantSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getRestaurantBegin: (state) => {
      state.restaurants.loading = true;
      state.restaurants.error = "";
    },
    getRestaurantSuccess: (state, action: PayloadAction<IRestaurant[]>) => {
      state.restaurants.loading = false;
      state.restaurants.data = action.payload;
      state.restaurants.error = "";
    },
    getRestaurantError: (state, action: PayloadAction<string>) => {
      state.restaurants.loading = false;
      state.restaurants.error = action.payload;
    },
    getARestaurantBegin: (state) => {
      state.restaurant.loading = true;
      state.restaurant.error = "";
    },
    getARestaurantSuccess: (state, action: PayloadAction<IRestaurant>) => {
      state.restaurant.loading = false;
      state.restaurant.data = action.payload;
      state.restaurant.error = "";
    },
    getARestaurantError: (state, action: PayloadAction<string>) => {
      state.restaurant.loading = false;
      state.restaurant.error = action.payload;
    },
  },
});

export const actions = RestaurantSlice.actions;

export default RestaurantSlice.reducer;
