import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<AppState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
