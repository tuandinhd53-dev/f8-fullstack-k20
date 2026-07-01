const comments = [
    {
        id: 1,
        user: "An",
        content: "Sản phẩm rất tốt!",
        rating: 5,
        verified: true,
        likes: 12,
    },
    { id: 2, user: "", content: "ok", rating: 3, verified: false, likes: 0 },
    {
        id: 3,
        user: "Bình",
        content: "Mua lần 2 rồi, vẫn chất lượng",
        rating: 4,
        verified: true,
        likes: 8,
    },
    {
        id: 4,
        user: "Chi",
        content: "   ",
        rating: null,
        verified: false,
        likes: 2,
    },
    {
        id: 5,
        user: "Duy",
        content: "Giao hàng nhanh, đóng gói cẩn thận, sẽ ủng hộ tiếp!",
        rating: 5,
        verified: true,
        likes: 20,
    },
    {
        id: 6,
        user: null,
        content: "Tệ quá",
        rating: 1,
        verified: false,
        likes: 0,
    },
    {
        id: 7,
        user: "Em",
        content: "Bình thường",
        rating: 3,
        verified: true,
        likes: 1,
    },
];


function isValidComment(comment) {
    const validUser =
        typeof comment.user === "string" && comment.user.trim().length > 0;

    const validContent =
        typeof comment.content === "string" &&
        comment.content.trim().length >= 5;

    const validRating =
        typeof comment.rating === "number" &&
        comment.rating >= 1 &&
        comment.rating <= 5;

    return validUser && validContent && validRating;
}


function filterValidComments(comments) {
    return comments.filter(isValidComment);
}


function getCommentStats(validComments) {
    const total = validComments.length;

    const totalLikes = validComments.reduce((sum, comment) => {
        return sum + comment.likes;
    }, 0);

    const totalRating = validComments.reduce((sum, comment) => {
        return sum + comment.rating;
    }, 0);

    const avgRating = Number((totalRating / total).toFixed(1));

    const verifiedCount = validComments.filter(
        (comment) => comment.verified,
    ).length;

    const topComment = validComments.reduce((top, comment) => {
        return comment.likes > top.likes ? comment : top;
    });

    return {
        total,
        avgRating,
        totalLikes,
        verifiedCount,
        topComment,
    };
}


function formatComment(comment) {
    const stars = "⭐".repeat(comment.rating);

    const user = comment.user ?? "Ẩn danh";

    const verify = comment.verified ? " ✓" : "";

    return `${stars} | ${user}${verify} | ${comment.content} | 👍 ${comment.likes}`;
}

// ================= TEST =================

console.log(isValidComment(comments[0]));
console.log(isValidComment(comments[1]));
console.log(isValidComment(comments[3]));
console.log(isValidComment(comments[5]));

const validComments = filterValidComments(comments);

console.log(validComments);

console.log(getCommentStats(validComments));

console.log(formatComment(comments[0]));
console.log(formatComment(comments[2]));
console.log(formatComment(comments[6]));
