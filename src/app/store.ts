import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../app/features/usersSlice";
// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  user: userReducer,
});
export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
