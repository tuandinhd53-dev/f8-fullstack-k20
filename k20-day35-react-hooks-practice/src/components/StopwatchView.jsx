import React from "react";

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return [
        String(minutes).padStart(2, "0"),
        String(seconds).padStart(2, "0"),
        String(milliseconds).padStart(2, "0"),
    ].join(":");
}

function StopwatchView({
    time = 0,
    laps = [],
    isRunning = false,
    onStart,
    onStop,
    onLap,
    onReset,
    onDeleteLap,
    onDeleteAllLaps,
}) {
    const canReset = time !== 0 || laps.length > 0 || isRunning;

    return (
        <section className="flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
            {/* Header */}
            <header className="flex min-h-24 items-center justify-between gap-4 border-b border-slate-200 px-6 py-5">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Tools / Timer
                    </p>

                    <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                        Stopwatch
                    </h2>
                </div>

                <div
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                        isRunning
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-slate-50 text-slate-500"
                    }`}
                >
                    <span
                        className={`h-2 w-2 rounded-full ${
                            isRunning
                                ? "animate-pulse bg-emerald-500"
                                : "bg-slate-400"
                        }`}
                    />

                    {isRunning ? "Đang chạy" : "Đã dừng"}
                </div>
            </header>

            {/* Timer display: fixed height */}
            <div className="flex h-80 shrink-0 flex-col items-center justify-center px-6 py-6 text-center">
                <p className="mb-4 text-sm font-medium text-slate-500">
                    Thời gian đã trôi qua
                </p>

                <div
                    className="whitespace-nowrap font-mono text-5xl font-semibold tracking-tight tabular-nums text-slate-900 sm:text-7xl"
                    aria-live="off"
                >
                    {formatTime(time)}
                </div>

                <p className="mt-3 text-xs text-slate-400">
                    PHÚT : GIÂY : 1/100 GIÂY
                </p>

                {/* Main controls */}
                <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={onStart}
                        disabled={isRunning}
                        className="inline-flex min-w-28 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:active:scale-100"
                    >
                        <span aria-hidden="true">▶</span>
                        Bắt đầu
                    </button>

                    <button
                        type="button"
                        onClick={onStop}
                        disabled={!isRunning}
                        className="inline-flex min-w-28 items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:active:scale-100"
                    >
                        <span aria-hidden="true">Ⅱ</span>
                        Dừng
                    </button>

                    <button
                        type="button"
                        onClick={onLap}
                        disabled={time === 0}
                        className="inline-flex min-w-28 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-300 disabled:active:scale-100"
                    >
                        <span aria-hidden="true">⚑</span>
                        Lap
                    </button>

                    <button
                        type="button"
                        onClick={onReset}
                        disabled={!canReset}
                        className="inline-flex min-w-28 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-300 disabled:active:scale-100"
                    >
                        <span aria-hidden="true">↻</span>
                        Reset
                    </button>
                </div>
            </div>

            {/* Lap list header */}
            <div className="flex min-h-24 shrink-0 items-center border-t border-slate-200 bg-slate-50/70 px-6 py-4">
                <div className="flex w-full flex-wrap items-center justify-between gap-3">
                    <div>
                        <h3 className="font-semibold text-slate-900">
                            Vòng thời gian
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            {laps.length} mốc đã ghi nhận
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onDeleteAllLaps}
                        disabled={laps.length === 0}
                        className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300 disabled:hover:bg-white"
                    >
                        Xóa tất cả mốc
                    </button>
                </div>
            </div>

            {/* Lap list: fixed height, scroll independently */}
            <div className="h-56 shrink-0 overflow-y-auto overscroll-contain">
                {laps.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-400">
                            ◷
                        </div>

                        <p className="mt-3 text-sm font-medium text-slate-600">
                            Chưa có mốc thời gian
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Bấm Lap khi đồng hồ đang chạy để ghi lại mốc.
                        </p>
                    </div>
                ) : (
                    [...laps].reverse().map((lapTime, index) => {
                        const lapIndex = laps.length - 1 - index;
                        const lapNumber = lapIndex + 1;

                        return (
                            <div
                                key={`${lapIndex}-${lapTime}`}
                                className="group flex items-center justify-between border-b border-slate-100 px-6 py-3.5 transition hover:bg-slate-50"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-slate-100 px-2 text-xs font-bold tabular-nums text-slate-600 group-hover:bg-slate-200">
                                        {String(lapNumber).padStart(2, "0")}
                                    </span>

                                    <div>
                                        <p className="text-xs font-medium text-slate-500">
                                            Mốc {lapNumber}
                                        </p>

                                        <p className="mt-0.5 font-mono text-base font-semibold tabular-nums text-slate-800">
                                            {formatTime(lapTime)}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => onDeleteLap?.(lapIndex)}
                                    aria-label={`Xóa mốc ${lapNumber}`}
                                    title={`Xóa mốc ${lapNumber}`}
                                    className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                >
                                    Xóa
                                </button>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Footer */}
            <footer className="flex min-h-14 shrink-0 items-center justify-between border-t border-slate-200 bg-white px-6 py-3">
                <span className="text-xs text-slate-400">
                    Stopwatch · Practice project
                </span>

                <span className="text-xs font-medium tabular-nums text-slate-500">
                    {laps.length} / mốc
                </span>
            </footer>
        </section>
    );
}

export default StopwatchView;
