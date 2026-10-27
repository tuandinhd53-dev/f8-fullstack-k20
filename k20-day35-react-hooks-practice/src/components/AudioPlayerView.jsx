function Icon({ name, size = 20, strokeWidth = 1.7 }) {
    const icons = {
        audio: (
            <>
                <path d="M3 10v4M7 6v12M11 9v6M15 4v16M19 8v8M23 11v2" />
            </>
        ),
        music: (
            <>
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
            </>
        ),
        play: <path d="m8 5 12 7-12 7V5Z" />,
        pause: (
            <>
                <path d="M8 5h3v14H8z" />
                <path d="M15 5h3v14h-3z" />
            </>
        ),
        previous: (
            <>
                <path d="M6 5v14" />
                <path d="m19 5-10 7 10 7V5Z" />
            </>
        ),
        next: (
            <>
                <path d="M18 5v14" />
                <path d="m5 5 10 7-10 7V5Z" />
            </>
        ),
        volume: (
            <>
                <path d="M4 10v4h4l5 4V6l-5 4H4Z" />
                <path d="M16 9a5 5 0 0 1 0 6" />
                <path d="M18.5 6.5a9 9 0 0 1 0 11" />
            </>
        ),
        mute: (
            <>
                <path d="M4 10v4h4l5 4V6l-5 4H4Z" />
                <path d="m17 9 5 6m0-6-5 6" />
            </>
        ),
        list: (
            <>
                <path d="M9 6h11M9 12h11M9 18h11" />
                <circle cx="4" cy="6" r=".7" />
                <circle cx="4" cy="12" r=".7" />
                <circle cx="4" cy="18" r=".7" />
            </>
        ),
        headphones: (
            <>
                <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
                <rect x="3" y="13" width="4" height="7" rx="2" />
                <rect x="17" y="13" width="4" height="7" rx="2" />
            </>
        ),
    };

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0"
        >
            {icons[name]}
        </svg>
    );
}

function formatTime(time) {
    if (!Number.isFinite(time) || time < 0) return "00:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function AudioPlayerView({
    audioRef,
    audioSrc,
    trackTitle,
    tracks = [],
    onSelectTrack,
    isPlaying,
    onPlay,
    onPause,
    isMuted,
    onToggleMute,
    volume,
    volumeUp,
    volumeDown,
    currentTime,
    duration,
    onTimeUpdate,
    onLoadedMetadata,
    onSeek,
    nextIndex,
    prevIndex,
    onEnded,
}) {
    const progress =
        duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

    return (
        <section className="mx-auto w-full max-w-3xl space-y-5 text-gray-900">
            {/* Header */}
            <header className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-gray-900 text-white">
                        <Icon name="audio" size={22} />
                    </div>

                    <div>
                        <h1 className="text-lg font-bold tracking-tight">
                            Audio Studio
                        </h1>
                        <p className="mt-0.5 text-sm text-gray-600">
                            Trình phát nhạc cá nhân
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2">
                    <span
                        className={`size-2 rounded-full ${
                            isPlaying ? "bg-emerald-600" : "bg-gray-300"
                        }`}
                    />
                    <span className="text-xs font-medium text-gray-700">
                        {isPlaying ? "Đang phát" : "Đang chờ"}
                    </span>
                </div>
            </header>

            {/* Player card */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <audio
                    ref={audioRef}
                    src={audioSrc}
                    preload="metadata"
                    onTimeUpdate={onTimeUpdate}
                    onLoadedMetadata={onLoadedMetadata}
                    onEnded={onEnded}
                />

                <div className="p-5 sm:p-7">
                    {/* Track information */}
                    <div className="flex items-center gap-4">
                        <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 sm:size-24">
                            <Icon
                                name="headphones"
                                size={34}
                                strokeWidth={1.5}
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                                NOW PLAYING
                            </p>
                            <h2 className="mt-2 truncate text-lg font-bold sm:text-xl">
                                {trackTitle || "Chưa chọn bài hát"}
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Local music library
                            </p>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-8">
                        <div className="relative h-1.5 rounded-full bg-gray-200">
                            <div
                                className="absolute left-0 top-0 h-full rounded-full bg-gray-800"
                                style={{ width: `${progress}%` }}
                            />

                            <input
                                type="range"
                                min={0}
                                max={duration || 1}
                                step={1}
                                value={Math.min(currentTime, duration || 0)}
                                onChange={(event) =>
                                    onSeek(Number(event.target.value))
                                }
                                aria-label="Tiến trình bài hát"
                                className="absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full bg-transparent accent-gray-800"
                            />
                        </div>

                        <div className="mt-3 flex justify-between text-xs font-medium tabular-nums text-gray-600">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={onToggleMute}
                                aria-label={isMuted ? "Bật tiếng" : "Tắt tiếng"}
                                title={isMuted ? "Bật tiếng" : "Tắt tiếng"}
                                className="flex size-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                                <Icon
                                    name={isMuted ? "mute" : "volume"}
                                    size={20}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={volumeDown}
                                aria-label="Giảm âm lượng"
                                className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-lg text-gray-700 transition hover:bg-gray-50"
                            >
                                −
                            </button>

                            <span className="min-w-11 text-center text-xs font-semibold tabular-nums text-gray-700">
                                {Math.round(volume * 100)}%
                            </span>

                            <button
                                type="button"
                                onClick={volumeUp}
                                aria-label="Tăng âm lượng"
                                className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-lg text-gray-700 transition hover:bg-gray-50"
                            >
                                +
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-4">
                            <button
                                type="button"
                                onClick={prevIndex}
                                aria-label="Bài trước"
                                title="Bài trước"
                                className="flex size-10 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-100"
                            >
                                <Icon name="previous" size={21} />
                            </button>

                            <button
                                type="button"
                                onClick={isPlaying ? onPause : onPlay}
                                aria-label={
                                    isPlaying ? "Tạm dừng" : "Phát nhạc"
                                }
                                className="flex size-12 items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-gray-700 active:scale-95"
                            >
                                <Icon
                                    name={isPlaying ? "pause" : "play"}
                                    size={21}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={nextIndex}
                                aria-label="Bài tiếp theo"
                                title="Bài tiếp theo"
                                className="flex size-10 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-100"
                            >
                                <Icon name="next" size={21} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Playlist */}
                <div className="border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between px-5 py-4 sm:px-7">
                        <div className="flex items-center gap-2">
                            <Icon name="list" size={18} />
                            <h3 className="text-sm font-bold">
                                Danh sách phát
                            </h3>
                        </div>
                        <span className="text-xs font-medium text-gray-600">
                            {tracks.length} bài hát
                        </span>
                    </div>

                    <div className="space-y-1 px-3 pb-3 sm:px-4">
                        {tracks.map((track, index) => {
                            const selected = track.src === audioSrc;

                            return (
                                <button
                                    key={track.id}
                                    type="button"
                                    onClick={() => onSelectTrack(index)}
                                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${
                                        selected
                                            ? "border-gray-200 bg-white shadow-sm"
                                            : "border-transparent hover:bg-white"
                                    }`}
                                >
                                    <span
                                        className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                                            selected
                                                ? "bg-gray-900 text-white"
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {selected && isPlaying ? (
                                            <Icon name="audio" size={17} />
                                        ) : (
                                            <span className="text-xs font-semibold tabular-nums">
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0",
                                                )}
                                            </span>
                                        )}
                                    </span>

                                    <span className="min-w-0 flex-1">
                                        <span
                                            className={`block truncate text-sm font-semibold ${
                                                selected
                                                    ? "text-gray-900"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {track.title}
                                        </span>
                                        <span className="mt-1 block text-xs text-gray-600">
                                            {selected
                                                ? isPlaying
                                                    ? "Đang phát bài này"
                                                    : "Bài đang chọn"
                                                : `Track ${index + 1}`}
                                        </span>
                                    </span>

                                    <span className="text-gray-500">
                                        {selected && isPlaying ? (
                                            <Icon name="pause" size={16} />
                                        ) : (
                                            <Icon name="play" size={15} />
                                        )}
                                    </span>
                                </button>
                            );
                        })}

                        {tracks.length === 0 && (
                            <p className="px-3 py-8 text-center text-sm text-gray-600">
                                Chưa có bài hát trong danh sách.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AudioPlayerView;
