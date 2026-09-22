function Badge({ children }) {
    return (
        <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
            {children}
        </span>
    );
}

export default Badge;
