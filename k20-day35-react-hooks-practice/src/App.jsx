import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import AudioPlayerPage from "./pages/AudioPlayerPage.jsx";
import ModalPage from "./pages/ModalPage.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/shop" element={<ShopPage />} />

            <Route path="/audio-player" element={<AudioPlayerPage />} />

            <Route path="/custom-modal" element={<ModalPage />} />

            <Route
                path="*"
                element={
                    <h1 className="p-8 text-2xl font-bold">
                        404 - Không tìm thấy trang
                    </h1>
                }
            />
        </Routes>
    );
}

export default App;
