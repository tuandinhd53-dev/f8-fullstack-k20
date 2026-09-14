import { useState } from "react";

function FaqItem({ faq, onSelectFaq }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <article className="overflow-hidden rounded-xl border border-white/10 bg-[#181818] transition hover:border-white/20">
            {/* Question */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
                <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="text-xs font-medium text-[#1ED760]">
                            {faq.category}
                        </span>

                        {faq.isHot && (
                            <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-semibold text-red-400">
                                Hot
                            </span>
                        )}
                    </div>

                    <h2 className="text-base font-semibold text-white">
                        {faq.question}
                    </h2>
                </div>

                <span className="shrink-0 text-xl text-[#B3B3B3]">
                    {isOpen ? "−" : "+"}
                </span>
            </button>

            {/* Answer */}
            {isOpen && (
                <div className="border-t border-white/10 px-5 py-4">
                    <p className="text-sm leading-6 text-[#B3B3B3]">
                        {faq.answer}
                    </p>

                    <button
                        onClick={() => onSelectFaq(faq.id)}
                        className="mt-4 text-sm font-semibold text-white transition hover:text-[#1ED760]"
                    >
                        Xem chi tiết →
                    </button>
                </div>
            )}
        </article>
    );
}

export default FaqItem;
