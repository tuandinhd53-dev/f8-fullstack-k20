const students = [
    { id: 1, name: "Khoa Nguyen" },
    { id: 2, name: "My Tran" },
    { id: 3, name: "Phong Le" },
    { id: 4, name: "Yen Vo" },
    { id: 5, name: "Bao Pham" },
];

const answerKey = [
    { question: 1, correctAnswer: "A", point: 2 },
    { question: 2, correctAnswer: "C", point: 1 },
    { question: 3, correctAnswer: "B", point: 3 },
    { question: 4, correctAnswer: "D", point: 2 },
    { question: 5, correctAnswer: "A", point: 2 },
];

const submissions = [
    {
        studentId: 1,
        submittedAt: "2026-07-10T08:00:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "C" },
            { question: 3, answer: "B" },
            { question: 4, answer: "A" },
            { question: 5, answer: "A" },
        ],
    },
    {
        studentId: 2,
        submittedAt: "2026-07-10T08:05:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "B" },
            { question: 3, answer: "B" },
            { question: 4, answer: "D" },
            { question: 5, answer: "C" },
        ],
    },
    {
        studentId: 3,
        submittedAt: "2026-07-10T07:58:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "C" },
            { question: 3, answer: "B" },
            { question: 4, answer: "D" },
            { question: 5, answer: "A" },
        ],
    },
    {
        studentId: 4,
        submittedAt: "2026-07-10T08:02:00",
        answers: [
            { question: 1, answer: "B" },
            { question: 2, answer: "C" },
        ],
    },
    {
        studentId: 5,
        submittedAt: "2026-07-10T08:01:00",
        answers: [
            { question: 1, answer: "A" },
            { question: 2, answer: "C" },
            { question: 3, answer: "B" },
            { question: 4, answer: "D" },
            { question: 5, answer: "A" },
        ],
    },
];
function gradeExam(students, answerKey, submissions) {
    const result = [];

    for (const student of students) {
        const resultStudent = {
            id: student.id,
            name: student.name,
            score: 0,
            correctCount: 0,
            wrongQuestions: [],
            rank: 0,
            submittedAt: null, // dùng để sort
        };

        const submission = submissions.find(
            (item) => item.studentId === student.id,
        );

        if (submission !== undefined && Object.hasOwn(submission, "answers")) {
            resultStudent.submittedAt = submission.submittedAt;

            for (const question of answerKey) {
                const studentAnswer = submission.answers.find(
                    (item) => item.question === question.question,
                );

                // Ko trả lời
                if (studentAnswer === undefined) {
                    resultStudent.wrongQuestions.push(question.question);
                    continue;
                }

                // đúng
                if (studentAnswer.answer === question.correctAnswer) {
                    resultStudent.correctCount++;
                    resultStudent.score += question.point;
                } else {
                    // sai
                    resultStudent.wrongQuestions.push(question.question);
                }
            }
        } else {
           
            for (const question of answerKey) {
                resultStudent.wrongQuestions.push(question.question);
            }
        }

        // Khóa 
        Object.seal(resultStudent);

        result.push(resultStudent);
    }

    // giảm
    result.sort((a, b) => {
        
        if (b.score !== a.score) {
            return b.score - a.score;
        }

        // bằng điểm đứng trc
        const timeA = a.submittedAt ?? "9999-12-31";
        const timeB = b.submittedAt ?? "9999-12-31";

        return timeA.localeCompare(timeB);
    });

    
    let currentRank = 1;

    for (let i = 0; i < result.length; i++) {
        if (i === 0) {
            result[i].rank = 1;
            continue;
        }

        if (result[i].score === result[i - 1].score) {
            result[i].rank = result[i - 1].rank;
        } else {
            currentRank = i + 1;
            result[i].rank = currentRank;
        }
    }

    return result;
}


class WrongAnswerIterator {
    constructor(studentResult) {
        this.wrongQuestions = studentResult.wrongQuestions;
        this.index = 0;
    }

    [Symbol.iterator]() {
        return this;
    }

    next() {
        if (this.index >= this.wrongQuestions.length) {
            return {
                done: true,
            };
        }

        return {
            value: this.wrongQuestions[this.index++],
            done: false,
        };
    }
}

const result = gradeExam(students, answerKey, submissions);

console.log(result);

// Iterator
const bao = result.find((item) => item.name === "Bao Pham");

console.log([...new WrongAnswerIterator(bao)]);
