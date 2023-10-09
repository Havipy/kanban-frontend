import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import authReducer from "./authSlice";
import sectionReducer from "./sectionSlice";
import boardReducer from "./boardSlice";

const store = configureStore({
	reducer: {
		tasks: taskReducer,
		auth: authReducer,
		sections: sectionReducer,
		board: boardReducer,
	}
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;