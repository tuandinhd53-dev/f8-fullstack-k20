import { Link } from "react-router-dom";

const exercises = [
    {
        number: "01",
        title: "Shop & Shopping Cart",
        description:
            "Thực hành quản lý state dùng chung cho cửa hàng, kết hợp tìm kiếm, lọc sản phẩm và giỏ hàng.",
        concepts: ["useReducer", "useContext", "filter()", "reduce()"],
        path: "/shop",
        icon: "🛍️",
        theme: {
            panel: "bg-sky-50",
            icon: "bg-sky-100",
            accent: "text-sky-700",
            border: "hover:border-sky-300",
            button: "bg-sky-600 hover:bg-sky-700 shadow-sky-100",
        },
    },
    {
        number: "02",
        title: "Audio Player & Stopwatch",
        description:
            "Thực hành tham chiếu phần tử DOM và quản lý giá trị không cần làm component render lại mỗi lần.",
        concepts: ["useRef", "audioRef", "DOM"],
        path: "/audio-player",
        icon: "🎧",
        theme: {
            panel: "bg-amber-50",
            icon: "bg-amber-100",
            accent: "text-amber-700",
            border: "hover:border-amber-300",
            button: "bg-amber-500 hover:bg-amber-600 shadow-amber-100",
        },
    },
    {
        number: "03",
        title: "Custom Modal",
        description:
            "Thực hành để component con tự quản lý trạng thái và cung cấp phương thức cho component cha điều khiển.",
        concepts: ["useImperativeHandle", "useRef", "open()", "close()"],
        path: "/custom-modal",
        icon: "🪟",
        theme: {
            panel: "bg-violet-50",
            icon: "bg-violet-100",
            accent: "text-violet-700",
            border: "hover:border-violet-300",
            button: "bg-violet-600 hover:bg-violet-700 shadow-violet-100",
        },
    },
];

function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50/70 via-white to-sky-50/60 text-slate-800">
            <header className="border-b border-white/80 bg-white/85 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 text-2xl text-white shadow-lg shadow-indigo-200">
                        ✦
                    </div>
                    <div>
                        <h1 className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">
                            React{" "}
                            <span className="text-indigo-600">Hooks Lab</span>
                        </h1>
                        <p className="text-xs font-medium text-slate-500">
                            FULLSTACK K20 · DAY 35
                        </p>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-5 py-9 sm:py-12">
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 px-6 py-9 text-white shadow-xl shadow-indigo-200/60 sm:px-10 sm:py-12">
                    <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
                    <div className="pointer-events-none absolute -bottom-20 right-1/3 h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl" />
                    <div className="relative">
                        <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-bold tracking-wider text-indigo-50">
                            REACT PRACTICE · DAY 35
                        </span>
                        <h2 className="mt-5 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">
                            Học React Hooks
                            <br />
                            <span className="text-yellow-200">
                                qua bài tập thực tế.
                            </span>
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-indigo-50 sm:text-base">
                            Ba bài tập giúp thực hành quản lý state, làm việc
                            với DOM và điều khiển component bằng các React
                            Hooks.
                        </p>
                        <a
                            href=""
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-yellow-50"
                        >
                            Xem bài học <span aria-hidden="true">↓</span>
                        </a>
                    </div>
                </section>

                <section id="exercises" className="scroll-mt-8 pt-10 sm:pt-12">
                    <div>
                        <p className="text-sm font-extrabold tracking-wider text-indigo-600">
                            DAY 35 · LEARNING PATH
                        </p>
                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                            Nội dung bài học
                        </h2>
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {exercises.map((exercise) => (
                            <article
                                key={exercise.number}
                                className={`group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${exercise.theme.border}`}
                            >
                                <div
                                    className={`${exercise.theme.panel} p-5 sm:p-6`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div
                                            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${exercise.theme.icon} text-3xl ring-1 ring-white`}
                                        >
                                            {exercise.icon}
                                        </div>
                                        <span className="text-4xl font-black tracking-tight text-slate-200">
                                            {exercise.number}
                                        </span>
                                    </div>
                                    <h3 className="mt-5 text-xl font-black leading-snug text-slate-900">
                                        {exercise.title}
                                    </h3>
                                </div>

                                <div className="flex flex-1 flex-col p-5 sm:p-6">
                                    <p className="text-sm leading-7 text-slate-600">
                                        {exercise.description}
                                    </p>
                                    <div className="mt-5">
                                        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                                            Kiến thức vận dụng
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {exercise.concepts.map(
                                                (concept) => (
                                                    <span
                                                        key={concept}
                                                        className={`rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold ${exercise.theme.accent}`}
                                                    >
                                                        {concept}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                    <Link
                                        to={exercise.path}
                                        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 ${exercise.theme.button}`}
                                    >
                                        Vào bài tập
                                        <span
                                            aria-hidden="true"
                                            className="transition group-hover:translate-x-1"
                                        >
                                            →
                                        </span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <footer className="mt-12 border-t border-slate-200/80 pt-6 text-center text-sm text-slate-400">
                    React Hooks Lab · Fullstack K20
                </footer>
            </main>
        </div>
    );
}

export default HomePage;
