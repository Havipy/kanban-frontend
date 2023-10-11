import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasks/taskSlice";
import authReducer from "./auth/authSlice";
import sectionReducer from "./sections/sectionSlice";
import boardReducer from "./board/boardSlice";

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