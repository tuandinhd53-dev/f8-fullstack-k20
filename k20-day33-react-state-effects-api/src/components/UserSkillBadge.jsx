function UserSkillBadge({ label, skill }) {
    const styles = {
        role: "border-violet-200 bg-violet-50 text-violet-700",
        gender: "border-pink-200 bg-pink-50 text-pink-700",
        blood: "border-red-200 bg-red-50 text-red-700",
        department: "border-cyan-200 bg-cyan-50 text-cyan-700",
    };

    const style =
        styles[label.toLowerCase()] ||
        "border-slate-200 bg-slate-50 text-slate-700";

    return (
        <div className={`rounded-xl border px-3 py-2 ${style}`}>
            <p className="text-[10px] font-medium uppercase tracking-wide opacity-60">
                {label}
            </p>

            <p className="mt-0.5 text-sm font-semibold">{skill}</p>
        </div>
    );
}

export default UserSkillBadge;

