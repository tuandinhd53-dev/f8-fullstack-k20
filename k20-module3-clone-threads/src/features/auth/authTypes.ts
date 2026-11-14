// Thông tin tài khoản người dùng nhận được từ API
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;

    // Các trường có thể không có giá trị từ backend
    email_verified_at: string | null;
    bio: string | null;

    is_private: boolean;
    verified: boolean;

    created_at: string;
    updated_at: string;

    // Người dùng có thể chưa thiết lập ảnh đại diện
    avatar_url: string | null;
}

// Quản lý trạng thái xác thực trong Redux
export interface AuthState {
    // null khi chưa lấy được thông tin người dùng
    user: User | null;

    // Xác định người dùng đã đăng nhập hay chưa
    isAuthenticated: boolean;

    // Xác định ứng dụng đang kiểm tra trạng thái đăng nhập
    isLoading: boolean;
}

// Chứa hai loại token backend trả về khi đăng nhập
export interface AuthTokens {
    access_token: string;
    refresh_token: string;
}

// Dữ liệu người dùng nhập vào form Login
export interface LoginCredentials {
    // Có thể là email hoặc username
    login: string;
    password: string;
}
