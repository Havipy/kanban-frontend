import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import authReducer from "./authSlice";

const store = configureStore({
	reducer: {
		tasks: taskReducer,
		auth: authReducer
	}
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;