import { useNavigate } from "react-router-dom";
import { logOut } from "store/action-creators/auth.actions";
import { useAppDispatch } from "./use-redux";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logOut(navigate));
  };

  return { logoutHandler };
};
