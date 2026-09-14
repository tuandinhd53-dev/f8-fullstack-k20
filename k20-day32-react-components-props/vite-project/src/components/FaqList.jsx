import FaqItem from "./FaqItem";

function FaqList({ faqData, onSelectFaq }) {
    return (
        <div className="mx-auto max-w-3xl space-y-4">
            {faqData.map((faq) => {
                return (
                    <FaqItem onSelectFaq={onSelectFaq} key={faq.id} faq={faq} />
                );
            })}
        </div>
    );
}

export default FaqList;
