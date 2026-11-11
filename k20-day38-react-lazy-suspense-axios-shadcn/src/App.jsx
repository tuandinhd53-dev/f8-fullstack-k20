import ProductCatalog from "./pages/ProductCatalog";
import ProductManagement from "./pages/ProductManagement";
import ProductDetail from "./pages/ProductDetail";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<ProductCatalog />} />
            <Route path="/management" element={<ProductManagement />} />
            <Route path="/detail" element={<ProductDetail />} />
        </Routes>
    );
}

export default App;
