import UserSkillBadge from "./UserSkillBadge";

function UserProfileCard({ user }) {
    const skills = [
        {
            id: "role",
            label: "Role",
            value: user.role,
        },
        {
            id: "gender",
            label: "Gender",
            value: user.gender,
        },
        {
            id: "bloodGroup",
            label: "Blood",
            value: user.bloodGroup,
        },
        {
            id: "department",
            label: "Department",
            value: user.company.department,
        },
    ];

    const isOnline = user.id % 2 === 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-violet-100 px-4 py-10 text-slate-800">
            <div className="mx-auto max-w-md">
                <div className="relative">
                    {/* Background decoration */}
                    <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-violet-300/40 blur-3xl" />

                    <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-cyan-300/40 blur-3xl" />

                    {/* Card */}
                    <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl shadow-slate-300/40 backdrop-blur-xl">
                        {/* Header gradient */}
                        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-violet-200/70 via-fuchsia-100/50 to-cyan-200/70" />

                        <div className="relative">
                            {/* Status */}
                            <div className="flex justify-end">
                                <div
                                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                                        isOnline
                                            ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                                            : "border-slate-200 bg-slate-100 text-slate-500"
                                    }`}
                                >
                                    <span
                                        className={`h-2 w-2 rounded-full ${
                                            isOnline
                                                ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                                                : "bg-slate-400"
                                        }`}
                                    />

                                    {isOnline ? "Online" : "Offline"}
                                </div>
                            </div>

                            {/* Avatar */}
                            <div className="mt-5 flex justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 blur-xl opacity-40" />

                                    <img
                                        src={user.image}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className="relative h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
                                    />
                                </div>
                            </div>

                            {/* Name */}
                            <div className="mt-5 text-center">
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                    {user.firstName} {user.lastName}
                                </h1>

                                <p className="mt-1 text-sm font-medium text-violet-600">
                                    {user.company.title}
                                </p>

                                <p className="text-sm text-slate-500">
                                    {user.company.name}
                                </p>
                            </div>

                            {/* Contact */}
                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                        ✉
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400">
                                            Email
                                        </p>

                                        <p className="truncate text-sm font-medium text-slate-700">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                                        ☎
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Phone
                                        </p>

                                        <p className="text-sm font-medium text-slate-700">
                                            {user.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Personal information */}
                            <div className="mt-6">
                                <p className="mb-3 text-sm font-semibold text-slate-700">
                                    Personal information
                                </p>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                                        <p className="text-xs text-slate-400">
                                            Age
                                        </p>

                                        <p className="mt-1 font-semibold text-slate-800">
                                            {user.age}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                                        <p className="text-xs text-slate-400">
                                            City
                                        </p>

                                        <p className="mt-1 truncate font-semibold text-slate-800">
                                            {user.address.city}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                                        <p className="text-xs text-slate-400">
                                            Country
                                        </p>

                                        <p className="mt-1 truncate font-semibold text-slate-800">
                                            {user.address.country}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="mt-6">
                                <p className="mb-3 text-sm font-semibold text-slate-700">
                                    Profile information
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <UserSkillBadge
                                            key={skill.id}
                                            label={skill.label}
                                            skill={skill.value}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Contact button */}
                            <button
                                onClick={() =>
                                    alert(
                                        `Email: ${user.email}\nPhone: ${user.phone}`,
                                    )
                                }
                                className="mt-7 w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-300 active:translate-y-0"
                            >
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfileCard;
