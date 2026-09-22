function SearchBar({ searchTerm, onSearch }) {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                🔎
            </div>

            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-5 text-sm text-slate-800 shadow-lg shadow-slate-200/50 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />
        </div>
    );
}

export default SearchBar;
