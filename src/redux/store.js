// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import roleReducer from "./slice/roleSlice";
import headerReducer from "./slice/headerSlice";
import menuReducer from "./slice/menuSlice";
import flashacardReducer from "./slice/flashcardSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    header: headerReducer,
    menu: menuReducer,
    flashcardReducer: flashacardReducer,
  },
});

export default store;
