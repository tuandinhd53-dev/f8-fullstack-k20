import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    // Đăng ký các Reducer (Slice)
    reducer: {},
});

// Lấy kiểu dữ liệu toàn bộ Redux State
export type RootState = ReturnType<typeof store.getState>;

// Lấy kiểu dữ liệu Dispatch
export type AppDispatch = typeof store.dispatch;
