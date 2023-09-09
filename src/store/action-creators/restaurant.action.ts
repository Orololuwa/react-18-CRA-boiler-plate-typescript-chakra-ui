import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import restaurantsService from "services/restaurants.service";
import { actions } from "store/reducers/restaurant.reducer";

export const getRestaurants = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.getRestaurantBegin());

      const res = await restaurantsService.getRestaurants();
      dispatch(actions.getRestaurantSuccess(res.data));
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message;
      dispatch(actions.getRestaurantError(msg || "Error"));
    }
  };
};

export const getARestaurant = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.getARestaurantBegin());

      const res = await restaurantsService.getARestaurant(id);
      dispatch(actions.getARestaurantSuccess(res.data));
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message;
      dispatch(actions.getARestaurantError(msg || "Error"));
    }
  };
};
