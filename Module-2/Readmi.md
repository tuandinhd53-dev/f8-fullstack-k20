# Spotify Web Player Clone

> Dự án thực hành xây dựng lại giao diện và các chức năng chính của Spotify Web Player bằng Vanilla JavaScript trong quá trình học F8 Fullstack K20.

**Live Demo:**

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+ Modules)
- Tailwind CSS v4
- Font Awesome
- Vite
- REST API
- LocalStorage
- Vercel

---

## ✨ Features

### Authentication

- Register / Login / Logout
- Access Token authentication
- Guest mode
- Hiển thị thông tin người dùng

### Home & Search

- Trending Searches
- Universal Search
- Debounce Search
- Trending Tracks
- Trending Artists
- Popular Albums
- Playlists

### Music Player

- Play / Pause
- Previous / Next
- Seek
- Volume
- Shuffle / Repeat
- Player Queue
- Lưu và khôi phục trạng thái Player bằng LocalStorage

### Library

- My Playlists
- Liked Songs
- Followed Playlists
- Search / Filter / Sort
- Create Playlist
- Edit Playlist
- Upload Playlist Cover
- Delete Playlist
- Resize Sidebar

### Detail

- Track
- Artist
- Album
- Playlist
- Like / Unlike
- Follow / Unfollow
- Add Track to Playlist
- Play Track
- Quản lý Playlist cá nhân

---

## 📚 What I Practiced

- DOM Manipulation
- Event Delegation
- Async / Await
- Fetch API
- REST API
- Data Flow
- State Management
- LocalStorage
- HTML Audio API
- JavaScript Modules
- Debounce
- Dynamic Rendering

---

## 📂 Project Structure

```text
src/
├── assets/
│   └── style.css
│
├── libs/
│   ├── httpRequest.js
│   ├── toast.js
│   ├── guestModal.js
│   └── resizableSidebar.js
│
├── pages/
│   ├── home/
│   │   ├── home.js
│   │   └── sidebar.js
│   │
│   ├── detail/
│   │   ├── detail.js
│   │   ├── detailActions.js
│   │   ├── detailRender.js
│   │   └── playlistModal.js
│   │
│   └── player/
│       └── player.js
│
└── main.js
```

## 5. Cài đặt & chạy dự án

Yêu cầu
Node.js 18+
npm
Cài đặt
npm install
Development
npm run dev
Build
npm run build
Preview
npm run preview

API configuration được quản lý bằng biến môi trường và không được công khai trong repository.

👨‍💻 Author

Đinh Văn Tuấn

F8 Fullstack K20
