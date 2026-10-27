# K20 - Day 35: React Hooks Practice

Dự án thực hành chuyên sâu về **React Hooks** (`useReducer`, `useContext`, `useRef`, `useEffect`, và `useImperativeHandle`), được chia thành 3 phần chính tương ứng với các bài tập nâng cao: Quản lý giỏ hàng Shop, Trình phát nhạc kết hợp Đồng hồ bấm giờ, và Modal tương tác bằng Ref.

---

## 🛠 Công nghệ sử dụng

- **React 19** & **Vite** (Xây dựng và đóng gói ứng dụng)
- **Tailwind CSS v4** (Thiết kế giao diện responsive, hiện đại)
- **React Router DOM** (Định tuyến giữa các trang bài tập)
- **Lucide React** (Biểu tượng giao diện)

---

## 📦 Cấu trúc thư mục dự án

```text
k20-day35-react-hooks-practice/
├── public/
│   └── audio/              # File âm thanh mẫu (den.mp3, rum.mp3, son-tung.mp3)
├── src/
│   ├── assets/             # Tài nguyên tĩnh (hình ảnh, v.v.)
│   ├── components/         # Các component giao diện nhỏ
│   │   ├── AudioPlayerView.jsx
│   │   ├── Modal.jsx
│   │   ├── ShopView.jsx
│   │   ├── Stopwatch.jsx
│   │   └── StopwatchView.jsx
│   ├── contexts/           # React Context (ShopContext)
│   ├── data/               # Dữ liệu tĩnh giả lập (audioTracks.js, products.js)
│   ├── pages/              # Các trang chính của bài tập
│   │   ├── AudioPlayerPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── ModalPage.jsx
│   │   └── ShopPage.jsx
│   ├── reducers/           # Reducer xử lý logic (shopReducer.js)
│   ├── App.jsx             # Cấu hình định tuyến (Routes)
│   ├── index.css           # Cấu hình Tailwind CSS v4
│   └── main.jsx            # Điểm khởi chạy ứng dụng
├── package.json
└── vite.config.js


🚀 Chi tiết các bài tập


Bài 1: Shop – useReducer + useContext (/shop)
Mục tiêu: Quản lý sản phẩm, bộ lọc và giỏ hàng toàn cục.

Chức năng:

Hiển thị danh sách sản phẩm với thông tin chi tiết.

Tìm kiếm sản phẩm theo tên và lọc theo danh mục đồng thời.

Thêm, xóa sản phẩm và thay đổi số lượng trong giỏ hàng (tối thiểu là 1).

Tự động tính toán tổng số lượng sản phẩm và tổng tiền thanh toán.

Bài 2: Audio Player + Stopwatch – useRef (/audio & /stopwatch)
Phần A (Audio Player): Sử dụng useRef để điều khiển trực tiếp thẻ <audio> (Phát, tạm dừng, điều chỉnh âm lượng, bật/tắt tiếng) với danh sách bài hát mẫu trong thư mục public/audio/.

Phần B (Stopwatch): Đồng hồ bấm giờ chuẩn xác với các nút Start, Stop, Reset. Đảm bảo dọn dẹp bộ đếm (clearInterval) trong useEffect cleanup khi component unmount.

Bài 3: Custom Modal – useImperativeHandle (/modal)
Mục tiêu: Xây dựng Modal tùy chỉnh có thể được điều khiển trực tiếp từ component cha thông qua useRef.

Chức năng:

Modal tự quản lý trạng thái hiển thị bên trong.

Sử dụng useImperativeHandle để phơi bày hai phương thức open() và close() ra bên ngoài.

Tích hợp sự kiện xác nhận (Đồng ý) truyền ngược lên component cha và nút đóng modal linh hoạt.
```

🏃 Hướng dẫn chạy dự án tại local
Cài đặt các gói thư viện:

Bash
npm install
Khởi động môi trường phát triển:

Bash
npm run dev
Mở trình duyệt theo đường dẫn hiển thị trên terminal (thường là http://localhost:5173).
