import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import ProductExplorer from "./pages/ProductExplorer";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/exercises/user-profile" element={<UserProfile />} />

            <Route path="/exercises/products" element={<ProductExplorer />} />
        </Routes>
    );
}

export default App;
