import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { appRoutes } from "core/routes/routes";
import {
  MaybeCredential,
  decodeAssertion,
  encodeAssertResponse,
} from "lib/helpers/web-auth-n.helper";
import { ExpirySession, tokenKey } from "lib/utils";
import { NavigateFunction } from "react-router-dom";
import authService from "services/auth.service";
import { actions } from "store/reducers/auth.reducers";

export const loginJWT = (
  navigate: NavigateFunction,
  from: string,
  data: {
    email: string;
    password: string;
  }
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.loginBegin());

      const res = await authService.login(data);

      ExpirySession.set(tokenKey, res.data.data.access_token);

      dispatch(actions.loginSuccess(true));
      navigate(from, { replace: true });
    } catch (err: any) {
      const axiosError = err as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message;
      dispatch(actions.loginError(msg || "Error"));
    }
  };
};

export const signUpJWT = (
  navigate: NavigateFunction,
  from: string,
  data: {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    phone: string;
    password: string;
  }
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.loginBegin());

      const res = await authService.signUp(data);

      ExpirySession.set(tokenKey, res.data.data.access_token);

      dispatch(actions.loginSuccess(true));
      navigate(from, { replace: true });
    } catch (err: any) {
      const axiosError = err as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message;
      dispatch(actions.loginError(msg || "Error"));
    }
  };
};

export const logOut = (navigate: NavigateFunction) => {
  return async (dispatch: Dispatch) => {
    try {
      ExpirySession.clear();
      dispatch(actions.logOut());
      navigate(appRoutes.SIGN_IN, { replace: true });
    } catch (err) {
      throw err;
    }
  };
};

export const getProfile = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.getProfileBegin());

      const res = await authService.getProfile();
      dispatch(actions.getProfileSuccess(res.data.data));
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message;
      dispatch(actions.getProfileError(msg || "Error"));
    }
  };
};

export const loginWebAuthN = (navigate: NavigateFunction, from: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.loginBegin());

      const rawAssertion = (await authService.assertBegin()).data.data;
      const assertion = decodeAssertion(rawAssertion);

      console.log({ assertion });

      const credential: MaybeCredential = await navigator.credentials
        .get({ publicKey: assertion })
        .catch(() => false);

      console.log({ credential });

      if (!credential) {
        dispatch(actions.loginError("Error getting credentials"));
        return Promise.reject({ error: "No Credentials" });
      }

      const res = await authService.loginWebAuthN({
        challenge: rawAssertion.challenge,
        ...encodeAssertResponse(credential as PublicKeyCredential),
      });

      ExpirySession.set(tokenKey, res.data.data.access_token);

      dispatch(actions.loginSuccess(true));
      navigate(from, { replace: true });
    } catch (err: any) {
      const axiosError = err as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message;
      dispatch(actions.loginError(msg || "Error"));
    }
  };
};
