function ProductReviews({ reviews }) {
    if (reviews.length === 0) {
        return (
            <div className="rounded-xl bg-gray-50 px-4 py-10 text-center">
                <h3 className="font-semibold text-gray-700">
                    Sản phẩm chưa có đánh giá
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                    Hãy quay lại khi có đánh giá mới.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Review summary */}
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Tất cả đánh giá</h3>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                    {reviews.length} đánh giá
                </span>
            </div>

            {/* Review list */}
            <div className="divide-y">
                {reviews.map((review, index) => (
                    <article
                        key={`${review.reviewerName}-${index}`}
                        className="py-5 first:pt-0 last:pb-0"
                    >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            {/* Reviewer information */}
                            <div>
                                <h4 className="font-semibold text-gray-900">
                                    {review.reviewerName}
                                </h4>

                                <p className="mt-1 text-xs text-gray-400">
                                    Khách hàng đã đánh giá
                                </p>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-amber-500">
                                    {review.rating}/5
                                </span>

                                <div className="flex gap-0.5">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span
                                            key={index}
                                            className={
                                                index < review.rating
                                                    ? "text-amber-400"
                                                    : "text-gray-200"
                                            }
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Review comment */}
                        <p className="mt-3 text-sm leading-7 text-gray-600">
                            {review.comment}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default ProductReviews;
