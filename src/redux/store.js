// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import roleReducer from "./slice/roleSlice";
import headerReducer from "./slice/headerSlice";
import menuReducer from "./slice/menuSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    header: headerReducer,
    menu: menuReducer,
  },
});

export default store;
