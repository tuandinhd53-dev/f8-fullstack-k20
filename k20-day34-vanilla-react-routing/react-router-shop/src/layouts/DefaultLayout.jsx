import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

function DefaultLayout() {
    return (
        <>
            <ScrollToTop />

            <Header />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}

export default DefaultLayout;
