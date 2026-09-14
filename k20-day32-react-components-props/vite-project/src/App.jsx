import { useState } from "react";
import UserProfileCard from "./components/UserProfileCard";
import ProductList from "./components/ProductList";
import FaqList from "./components/FaqList";

const products = [
    {
        id: 1,
        name: "iPhone 15",
        price: 20000000,
        image: "https://cdn.tgdd.vn/Products/Images/42/281570/iphone-15-1-3.jpg",
        inStock: true,
        discountPercent: 10,
    },
    {
        id: 2,
        name: "MacBook Air M2",
        price: 25000000,
        image: "https://cdn.tgdd.vn/Products/Images/44/282827/apple-macbook-air-m2-2022-01.jpg",
        inStock: true,
        discountPercent: 15,
    },
    {
        id: 3,
        name: "AirPods Pro",
        price: 6000000,
        image: "https://cdn.tgdd.vn/Products/Images/54/289781/airpods-pro-2nd-generation-0.jpg",
        inStock: false,
        discountPercent: 0,
    },
    {
        id: 4,
        name: "Apple Watch",
        price: 9000000,
        image: "https://www.apple.com/newsroom/images/2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/article/Apple-Watch-S9-hero-230912_Full-Bleed-Image.jpg.xlarge.jpg",
        inStock: true,
        discountPercent: 20,
    },

    {
        id: 5,
        name: "Samsung Galaxy S24",
        price: 18990000,
        image: "https://images.samsung.com/vn/smartphones/galaxy-s24/images/galaxy-s24-highlights-color-carousel-global.jpg?imbypass=true",
        inStock: true,
        discountPercent: 10,
    },
    {
        id: 6,
        name: "iPad Air M2",
        price: 16990000,
        image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/ipad-air-11-inch-m2.png",
        inStock: true,
        discountPercent: 15,
    },
    {
        id: 7,
        name: "Sony WH-1000XM5",
        price: 8490000,
        image: "https://cdn.shopify.com/s/files/1/0298/6259/2571/files/01_70b09324-e4c2-4170-ae9e-97fa9a90dcb0.png?v=1766480286",
        inStock: true,
        discountPercent: 20,
    },
    {
        id: 8,
        name: "Logitech MX Master 3S",
        price: 2490000,
        image: "https://resource.logitech.com/w_544,h_544,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/2025-update/mx-master-3s-graphite-sustainability-gallery-4.png",
        inStock: false,
        discountPercent: 0,
    },
    {
        id: 9,
        name: "Dell UltraSharp 27",
        price: 11990000,
        image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/u-series/u2723qe/media-gallery/monitor-u2723qe-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=872&qlt=100,1&resMode=sharp2&size=872,804&chrss=full",
        inStock: true,
        discountPercent: 12,
    },
    {
        id: 10,
        name: "Keychron K2",
        price: 2290000,
        image: "https://www.keychron.com/cdn/shop/products/Keychron-K2-wireless-mechanical-keyboard-for-Mac-Windows-iOS-Gateron-switch-red-with-type-C-RGB-white-backlight-aluminum-frame.jpg?v=1650445549&width=900",
        inStock: false,
        discountPercent: 0,
    },
    {
        id: 11,
        name: "JBL Flip 6",
        price: 2990000,
        image: "https://vn.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwb29c2f4e/pdp/JBL_Flip_6_Lifestyle_03_904x560px.png",
        inStock: true,
        discountPercent: 15,
    },
    {
        id: 12,
        name: "Anker PowerCore 20K",
        price: 1290000,
        image: "https://cdn.shopify.com/s/files/1/0614/8109/1153/files/A1268013.png?v=1720583958&width=1600",
        inStock: true,
        discountPercent: 0,
    },
];

const faqData = [
    {
        id: 1,
        question: "React là gì?",
        answer: "React là thư viện JavaScript dùng để xây dựng giao diện người dùng bằng các component có thể tái sử dụng.",
        category: "React",
        isHot: true,
    },
    {
        id: 2,
        question: "Component trong React dùng để làm gì?",
        answer: "Component giúp chia giao diện thành các phần nhỏ, độc lập và có thể tái sử dụng.",
        category: "React",
        isHot: true,
    },
    {
        id: 3,
        question: "Props trong React là gì?",
        answer: "Props là dữ liệu được truyền từ component cha xuống component con.",
        category: "React",
        isHot: false,
    },
    {
        id: 4,
        question: "useState dùng để làm gì?",
        answer: "useState cho phép component lưu trữ và cập nhật dữ liệu trạng thái.",
        category: "React Hook",
        isHot: true,
    },
    {
        id: 5,
        question: "Tại sao khi dùng map() cần có key?",
        answer: "Key giúp React xác định từng phần tử trong danh sách để quản lý và cập nhật giao diện hiệu quả hơn.",
        category: "React",
        isHot: false,
    },
];

function App() {
    const [page, setPage] = useState("home");

    function handleSelectFaq(id) {
        alert(`Bạn đã chọn câu hỏi có ID: ${id} `);
    }

    function handleAddToCart(product, finalPrice) {
        alert(`${product.name} - ${finalPrice.toLocaleString("vi-VN")}₫`);
    }

    return (
        <main className="min-h-screen bg-[#121212] px-6 py-10 text-white">
            {/* Header */}
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 text-center">
                    <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#1ED760]">
                        React Practice
                    </p>

                    <h1 className="text-4xl font-bold">
                        Components & Props & JSX
                    </h1>

                    <p className="mt-3 text-[#B3B3B3]">Bài tập React Day 32</p>
                </div>

                {/* Menu */}
                <div className="grid gap-5 md:grid-cols-3">
                    <button
                        onClick={() => setPage("profile")}
                        className="group rounded-2xl border border-white/10 bg-[#1F1F1F] p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-[#1ED760]/40 hover:bg-[#242424]"
                    >
                        <span className="text-sm font-medium text-[#1ED760]">
                            Bài 01
                        </span>

                        <h2 className="mt-2 text-xl font-bold">
                            UserProfileCard
                        </h2>

                        <p className="mt-2 text-sm text-[#B3B3B3]">
                            Components, Props, Events và Conditional Rendering
                        </p>

                        <span className="mt-5 inline-block text-sm font-medium text-white transition group-hover:text-[#1ED760]">
                            Xem bài →
                        </span>
                    </button>

                    <button
                        onClick={() => setPage("product")}
                        className="group rounded-2xl border border-white/10 bg-[#1F1F1F] p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-[#1ED760]/40 hover:bg-[#242424]"
                    >
                        <span className="text-sm font-medium text-[#1ED760]">
                            Bài 02
                        </span>

                        <h2 className="mt-2 text-xl font-bold">ProductList</h2>

                        <p className="mt-2 text-sm text-[#B3B3B3]">
                            Props, map, tính giá, Badge và Callback Props
                        </p>

                        <span className="mt-5 inline-block text-sm font-medium text-white transition group-hover:text-[#1ED760]">
                            Xem bài →
                        </span>
                    </button>

                    <button
                        onClick={() => setPage("faq")}
                        className="group rounded-2xl border border-white/10 bg-[#1F1F1F] p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-[#1ED760]/40 hover:bg-[#242424]"
                    >
                        <span className="text-sm font-medium text-[#1ED760]">
                            Bài 03
                        </span>

                        <h2 className="mt-2 text-xl font-bold">
                            FAQ Accordion
                        </h2>

                        <p className="mt-2 text-sm text-[#B3B3B3]">
                            List, Conditional Rendering và Callback
                        </p>

                        <span className="mt-5 inline-block text-sm font-medium text-white transition group-hover:text-[#1ED760]">
                            Xem bài →
                        </span>
                    </button>
                </div>

                {/* Bài 1 */}
                {page === "profile" && (
                    <section className="mt-12">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#1ED760]">Bài 01</p>

                                <h2 className="text-2xl font-bold">
                                    UserProfileCard
                                </h2>
                            </div>

                            <button
                                onClick={() => setPage("home")}
                                className="rounded-full border border-white/10 px-4 py-2 text-sm text-[#B3B3B3] transition hover:border-white/30 hover:text-white"
                            >
                                ← Quay lại
                            </button>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6">
                            <UserProfileCard
                                name="Đinh Tuấn"
                                jobTitle="Fresher Front-end Developer"
                                isOnline={true}
                                skills={["HTML", "CSS", "JavaScript"]}
                                avatar="https://picsum.photos/200/300"
                            />

                            <UserProfileCard
                                name="Bé Đình"
                                jobTitle="Front-end Developer"
                                isOnline={false}
                                skills={["React", "CSS", "JavaScript"]}
                                avatar="https://picsum.photos/200/300"
                            />
                        </div>
                    </section>
                )}

                {/* Bài 2 - chưa làm */}
                {page === "product" && (
                    <section className="mt-12 rounded-2xl border border-white/10 bg-[#1F1F1F] p-10 text-center">
                        <p className="text-[#1ED760]">Bài 02</p>

                        <h2 className="mt-2 text-2xl font-bold">ProductList</h2>

                        <ProductList
                            products={products}
                            onAddToCart={handleAddToCart}
                        />
                    </section>
                )}

                {/* Bài 3 - chưa làm */}
                {page === "faq" && (
                    <section className="mt-12 rounded-2xl border border-white/10 bg-[#1F1F1F] p-10 text-center">
                        <p className="text-[#1ED760]">Bài 03</p>

                        <h2 className="mt-2 text-2xl font-bold">
                            FAQ Accordion
                        </h2>

                        <FaqList
                            onSelectFaq={handleSelectFaq}
                            faqData={faqData}
                        />
                    </section>
                )}
            </div>
        </main>
    );
}

export default App;
