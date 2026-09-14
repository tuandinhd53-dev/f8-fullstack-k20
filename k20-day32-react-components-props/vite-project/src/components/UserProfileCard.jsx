function UserProfileCard({ name, jobTitle, isOnline, skills, avatar }) {
    return (
        <div className="group w-full max-w-sm rounded-3xl border border-white/10 bg-[#181818] p-6 text-white shadow-2xl transition duration-300 hover:-translate-y-2 hover:border-[#1ed760]/40">
            {/* Avatar */}
            <div className="relative mx-auto mb-5 h-28 w-28">
                <img
                    className="h-full w-full rounded-full object-cover ring-4 ring-[#1ed760]/20 transition duration-300 group-hover:ring-[#1ed760]/50"
                    src={avatar}
                    alt={name}
                />

                {/* Online indicator */}
                <span
                    className={`absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-[#181818] ${
                        isOnline ? "bg-[#1ed760]" : "bg-gray-500"
                    }`}
                ></span>
            </div>

            {/* Info */}
            <div className="text-center">
                <h2 className="text-2xl font-bold">{name}</h2>

                <p className="mt-1 text-sm text-[#B3B3B3]">{jobTitle}</p>

                {/* Status */}
                <div
                    className={`mt-3 text-sm font-medium ${
                        isOnline ? "text-[#1ed760]" : "text-gray-500"
                    }`}
                >
                    ● {isOnline ? "Đang hoạt động" : "Ngoại tuyến"}
                </div>
            </div>

            {/* Skills */}
            <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                    Kỹ năng
                </p>

                <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="rounded-full border border-white/10 bg-[#242424] px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:border-[#1ed760]/40 hover:text-white"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Contact */}
            <button
                onClick={() => alert(`Đang kết nối với ${name}...`)}
                className="mt-6 w-full rounded-full bg-[#1ed760] py-3 font-bold text-black transition duration-200 hover:scale-[1.02] hover:bg-[#1ed760] active:scale-95"
            >
                Liên hệ
            </button>
        </div>
    );
}

export default UserProfileCard;
