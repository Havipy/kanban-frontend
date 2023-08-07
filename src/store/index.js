import { configureStore } from "@reduxjs/toolkit"
import taskReducer from "./taskSlice"
import authReducer from "./authSlice"
export default configureStore({
	reducer: {
		tasks: taskReducer,
		auth: authReducer
	}
})