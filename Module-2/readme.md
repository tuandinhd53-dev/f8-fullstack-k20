# 🎵 Spotify Web Player Clone

> A Spotify Web Player clone built with **Vanilla JavaScript** as a practical project during my F8 Fullstack K20 learning journey.

**Live Demo:** https://f8-fullstack-k20.vercel.app/

---

## 📌 About The Project

This project recreates the core interface and functionality of the Spotify Web Player using **Vanilla JavaScript**, **REST API**, and **HTML Audio API**.

The main goal was not only to reproduce the UI, but also to practice how a real web application handles:

- Authentication
- API requests
- Application state
- Data flow
- Dynamic rendering
- Music playback
- User playlists
- LocalStorage persistence
- Modular JavaScript architecture

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3**
- **Vanilla JavaScript (ES6+ Modules)**
- **Tailwind CSS v4**
- **Font Awesome**
- **Vite**
- **REST API**
- **LocalStorage**
- **HTML Audio API**
- **Vercel**

---

## ✨ Features

### 🔐 Authentication

- Register
- Login
- Logout
- Access Token authentication
- Guest mode
- Display authenticated user information
- Persistent authentication state

### 🏠 Home & Search

- Trending Searches
- Universal Search
- Debounced Search
- Trending Tracks
- Trending Artists
- Popular Albums
- Playlists
- Dynamic search results

### 🎵 Music Player

- Play / Pause
- Previous / Next
- Seek
- Volume control
- Shuffle
- Repeat
- Player Queue
- Track progress
- Persistent player state using LocalStorage

### 📚 Library

- My Playlists
- Liked Songs
- Followed Playlists
- Search
- Filter
- Sort
- Create Playlist
- Edit Playlist
- Upload Playlist Cover
- Delete Playlist
- Resizable Sidebar

### 📄 Detail Pages

- Track
- Artist
- Album
- Playlist
- Like / Unlike Track
- Follow / Unfollow
- Add Track to Playlist
- Play Track
- Manage Personal Playlists

---

## 🧠 What I Practiced

This project helped me practice several important frontend concepts:

### JavaScript

- DOM Manipulation
- Event Delegation
- Event Handling
- ES6 Modules
- Async / Await
- Promise
- Fetch API
- REST API
- Debounce
- Dynamic Rendering

### Data & State

- Data Flow
- State Management
- LocalStorage
- API Authentication
- Synchronizing UI with application state
- Managing data separately from UI rendering

### Browser APIs

- HTML Audio API
- LocalStorage
- URLSearchParams

### Application Architecture

- Modular JavaScript
- Separation of responsibilities
- Reusable utility modules
- Dynamic component rendering
- API abstraction

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

---

## 🔄 Application Flow

The application follows a simple data flow:

```text
User Interaction
       ↓
Event Handler
       ↓
API Request / State Update
       ↓
Application State
       ↓
Render UI
       ↓
User sees updated interface
```

For example:

```text
User clicks Like
       ↓
Send API request
       ↓
Update liked state
       ↓
Update player / library state
       ↓
Re-render affected UI
```

This helped me understand the relationship between **data, state, events, and UI** instead of only manipulating the DOM directly.

---

## 🔑 Authentication Flow

```text
Login / Register
       ↓
API Authentication
       ↓
Receive Access Token
       ↓
Save Token to LocalStorage
       ↓
Attach Bearer Token to API Requests
       ↓
Render Authenticated UI
```

Protected API requests use the authenticated user's access token.

---

## 💾 LocalStorage

LocalStorage is used to persist important client-side state such as:

- Access Token
- Player state
- Current track
- Playback information
- User-related client state

This allows parts of the application to remain available after refreshing the page.

---

## 🚀 Getting Started

### Requirements

- Node.js 18+
- npm

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate to the project:

```bash
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Deployment

The project is deployed using **Vercel**.

**Live Demo:**
https://f8-fullstack-k20.vercel.app/

---

## 📚 Learning Context

This project was developed as part of my **F8 Fullstack K20** learning journey.

The project focuses on practicing frontend fundamentals and understanding how different parts of a web application work together:

```text
UI
 ↓
Events
 ↓
JavaScript Logic
 ↓
State
 ↓
API
 ↓
Data
 ↓
UI Update
```

Rather than only focusing on copying the Spotify interface, the project was used to practice **data flow, state management, API integration, modular architecture, and real-world JavaScript patterns**.

---

## 👨‍💻 Author

**Đinh Văn Tuấn**

Frontend / Fullstack Developer Learner

- GitHub: https://github.com/tuandinhd53-dev
