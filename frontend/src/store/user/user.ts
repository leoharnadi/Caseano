import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { setUserState, UserState } from "./userSlice";

export const useUserData = () => useSelector((state: AppState) => state.user);

export const useSetUserState = () => {
  const dispatch = useDispatch();

  return (authData: UserState) => {
    dispatch(setUserState(authData));
  };
};
