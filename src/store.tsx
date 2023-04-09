import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./redux/reducers";

const store = configureStore({ reducer: Reducer });

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
