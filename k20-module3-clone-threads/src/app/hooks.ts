import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Hook đọc dữ liệu từ Redux Store
export const useAppSelector = useSelector.withTypes<RootState>();

// Hook gửi Action đến Redux Store
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
