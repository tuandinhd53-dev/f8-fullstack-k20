import { Outlet } from "react-router";

function DefaultLayout() {
    return (
        <div>
            <header>Header</header>

            <aside>Sidebar</aside>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default DefaultLayout;
