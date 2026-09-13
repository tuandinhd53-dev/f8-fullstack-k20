function UserProfileCard({
    name,
    jobTitle,
    isOnline,
    skills,
    avatar,
    contact,
}) {
    return (
        <div className="w-[280px] rounded-2xl bg-[#1F1F1F] p-6 text-center text-white shadow-lg">
            <img
                className="mx-auto h-24 w-24 rounded-full object-cover"
                src={avatar}
                alt={name}
            />

            <h2 className="mt-4 text-xl font-bold">{name}</h2>

            <p className="mt-1 text-[#B3B3B3]">{jobTitle}</p>

            <p
                className={
                    isOnline ? "mt-3 text-[#1ED760]" : "mt-3 text-gray-500"
                }
            >
                ● {isOnline ? "Online" : "Offline"}
            </p>

            <div className="my-4 flex flex-wrap justify-center gap-2">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className="rounded-lg bg-[#333] px-3 py-1 text-sm"
                    >
                        {skill}
                    </span>
                ))}
            </div>

            <button
                onClick={() => alert(`Đang kết nối với ${name}...`)}
                className="w-full rounded-full bg-[#1ED760] px-4 py-2 font-semibold text-black transition hover:bg-[#1DB954]"
            >
                Liên hệ
            </button>
        </div>
    );
}

export default UserProfileCard;
