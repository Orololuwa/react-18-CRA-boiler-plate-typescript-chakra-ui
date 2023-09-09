import { useAppDispatch, useAppSelector } from "core/hooks/use-redux";
import { appRoutes } from "core/routes/routes";
import { ExpirySession, tokenKey } from "lib/utils";
import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { getProfile } from "store/action-creators/auth.actions";
import { getRestaurants } from "store/action-creators/restaurant.action";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const [isLoggedIn] = useAppSelector((state) => [state.auth.isLoggedIn]);
  ExpirySession.get(tokenKey);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    dispatch(getRestaurants());
  }, []);

  if (!isLoggedIn) {
    return (
      <Navigate to={appRoutes.SIGN_IN} state={{ from: location }} replace />
    );
  }

  return children;
};

export default AuthGuard;
