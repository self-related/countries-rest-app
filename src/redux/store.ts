import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
    }
});

// export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//export hooks
export const useAppSelector = useSelector.withTypes<RootState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>;