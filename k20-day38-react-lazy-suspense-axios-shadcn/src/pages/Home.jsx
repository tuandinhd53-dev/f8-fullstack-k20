import { Link } from "react-router-dom";

const projects = [
    {
        number: "01",
        title: "Product Catalog",
        subtitle: "Product Discovery",
        description:
            "Khám phá danh sách sản phẩm, lọc theo danh mục và hiển thị dữ liệu trực tiếp từ API.",
        technologies: ["Axios", "TanStack Query", "Filtering"],
        path: "/catalog",
        color: "blue",
        icon: "▦",
    },
    {
        number: "02",
        title: "Product Management",
        subtitle: "Inventory Control",
        description:
            "Quản lý thông tin sản phẩm với chức năng thêm mới, chỉnh sửa và kiểm tra dữ liệu.",
        technologies: ["Mutation", "Dialog", "Validation"],
        path: "/management",
        color: "violet",
        icon: "▤",
    },
    {
        number: "03",
        title: "Product Detail",
        subtitle: "Customer Experience",
        description:
            "Hiển thị thông tin chi tiết và tải nội dung đánh giá khi người dùng có nhu cầu.",
        technologies: ["React.lazy", "Suspense", "Reviews"],
        path: "/detail",
        color: "emerald",
        icon: "◫",
    },
];

const colorStyles = {
    blue: {
        icon: "bg-blue-50 text-blue-600",
        label: "bg-blue-50 text-blue-700",
        link: "text-blue-600 hover:text-blue-800",
        border: "hover:border-blue-300",
    },
    violet: {
        icon: "bg-violet-50 text-violet-600",
        label: "bg-violet-50 text-violet-700",
        link: "text-violet-600 hover:text-violet-800",
        border: "hover:border-violet-300",
    },
    emerald: {
        icon: "bg-emerald-50 text-emerald-600",
        label: "bg-emerald-50 text-emerald-700",
        link: "text-emerald-600 hover:text-emerald-800",
        border: "hover:border-emerald-300",
    },
};

function Home() {
    return (
        <main className="min-h-screen bg-[#F5F7FA] text-slate-900">
            <div className="mx-auto max-w-6xl px-6 py-8">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-slate-200 pb-6">
                    <div className="text-xl font-bold tracking-tight">
                        K20 React Lazy - Suspense Axios - Shadcn
                        <span className="text-blue-600">.</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-xs font-medium text-slate-600">
                            React Development · Day 38
                        </span>
                    </div>
                </header>

                {/* Hero */}
                <section className="grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-center md:py-20">
                    <div>
                        <p className="text-sm font-bold tracking-widest text-blue-600">
                            MY DEVELOPMENT JOURNEY
                        </p>

                        <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                            Building Web
                            <span className="block text-blue-600">
                                Applications.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                            Không chỉ xây dựng giao diện, mà còn thực hành cách
                            ứng dụng hoạt động: lấy dữ liệu, quản lý trạng thái
                            và tối ưu trải nghiệm người dùng.
                        </p>
                    </div>

                    <div className="flex gap-8 rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm">
                        <div>
                            <p className="text-3xl font-extrabold text-slate-900">
                                03
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Projects
                            </p>
                        </div>

                        <div className="w-px bg-slate-200" />

                        <div>
                            <p className="text-3xl font-extrabold text-slate-900">
                                38
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Learning day
                            </p>
                        </div>
                    </div>
                </section>

                {/* Projects */}
                <section className="pb-16">
                    <div className="mb-7 flex items-end justify-between">
                        <div>
                            <p className="text-xs font-bold tracking-widest text-slate-400">
                                PROJECT COLLECTION
                            </p>
                            <h2 className="mt-2 text-2xl font-bold">
                                Featured Projects
                            </h2>
                        </div>

                        <span className="text-sm text-slate-500">01 — 03</span>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {projects.map((project) => {
                            const styles = colorStyles[project.color];

                            return (
                                <article
                                    key={project.path}
                                    className={`group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${styles.border}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${styles.icon}`}
                                        >
                                            {project.icon}
                                        </div>

                                        <span className="text-3xl font-bold text-slate-200">
                                            {project.number}
                                        </span>
                                    </div>

                                    <p className="mt-7 text-xs font-bold tracking-wider text-slate-400">
                                        {project.subtitle}
                                    </p>

                                    <h3 className="mt-2 text-xl font-bold tracking-tight">
                                        {project.title}
                                    </h3>

                                    <p className="mt-3 min-h-20 text-sm leading-6 text-slate-500">
                                        {project.description}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className={`rounded-md px-2.5 py-1.5 text-xs font-medium ${styles.label}`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        to={project.path}
                                        className={`mt-7 flex items-center justify-between border-t border-slate-100 pt-5 text-sm font-bold ${styles.link}`}
                                    >
                                        Truy cập dự án
                                        <span className="transition-transform group-hover:translate-x-1">
                                            →
                                        </span>
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </section>

                {/* Footer */}
                <footer className="flex flex-col gap-3 border-t border-slate-200 py-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-semibold text-slate-700">
                        K20 · React Projects
                    </p>

                    <p className="text-xs text-slate-400">
                        React · Vite · Tailwind CSS · Axios · TanStack Query
                    </p>
                </footer>
            </div>
        </main>
    );
}

export default Home;
