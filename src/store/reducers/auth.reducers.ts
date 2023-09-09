import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, IProfile } from "models/auth";
import { tokenKey, ExpirySession } from "lib/utils";

const initialState: AuthState = {
  isLoggedIn: !!ExpirySession.get(tokenKey),
  loading: false,
  error: "",
  profile: {
    data: null,
    error: "",
    loading: false,
  },
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginBegin: (state: AuthState) => {
      state.loading = true;
      state.error = "";
    },
    loginSuccess: (state: AuthState, action: PayloadAction<boolean>) => {
      state.loading = false;
      state.isLoggedIn = action.payload;
      state.error = "";
    },
    loginError: (state: AuthState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logOut: (state: AuthState) => {
      state.isLoggedIn = false;
    },
    getProfileBegin: (state: AuthState) => {
      state.profile.loading = true;
      state.profile.error = "";
    },
    getProfileSuccess: (state: AuthState, action: PayloadAction<IProfile>) => {
      state.profile.loading = false;
      state.profile.data = action.payload;
      state.profile.error = "";
    },
    getProfileError: (state: AuthState, action: PayloadAction<string>) => {
      state.profile.loading = false;
      state.profile.error = action.payload;
    },
  },
});

export const actions = AuthSlice.actions;

export default AuthSlice.reducer;
