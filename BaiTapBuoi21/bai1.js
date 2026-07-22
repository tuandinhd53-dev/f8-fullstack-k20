const members = [
    { id: 1, name: "Minh Tran", email: "minh@example.com" },
    { id: 2, name: "Lan Pham", email: "lan@example.com" },
    { id: 3, name: "Huy Nguyen", email: "huy@example.com" },
    { id: 4, name: "Trang Le", email: "trang@example.com" },
    { id: 5, name: "Duc Vo", email: "duc@example.com" },
];

const books = [
    { id: 201, title: "Clean Code", finePerDay: 5000 },
    { id: 202, title: "Atomic Habits", finePerDay: 3000 },
    { id: 203, title: "Sapiens", finePerDay: 4000 },
    { id: 204, title: "Deep Work", finePerDay: 2000 },
    { id: 205, title: "The Pragmatic Programmer", finePerDay: 6000 },
];

const borrowRecords = [
    {
        id: 3001,
        memberId: 1,
        lines: [
            { bookId: 201, lateDays: 2 },
            { bookId: 202, lateDays: 0 },
        ],
    },
    {
        id: 3002,
        memberId: 2,
        lines: [
            { bookId: 202, lateDays: 1 },
            { bookId: 203, lateDays: 3 },
        ],
    },
    {
        id: 3003,
        memberId: 3,
        lines: [
            { bookId: 204, lateDays: 5 },
            { bookId: 205, lateDays: 2 },
        ],
    },
    {
        id: 3004,
        memberId: 4,
        lines: [
            { bookId: 201, lateDays: 1 },
            { bookId: 203, lateDays: 2 },
        ],
    },
    {
        id: 3005,
        memberId: 5,
        lines: [{ bookId: 205, lateDays: 10 }],
    },
    {
        id: 3006,
        memberId: 1,
        lines: [
            { bookId: 201, lateDays: 1 },
            { bookId: 205, lateDays: 3 },
        ],
    },
    {
        id: 3007,
        memberId: 2,
        lines: [
            { bookId: 204, lateDays: 2 },
            { bookId: 203, lateDays: 1 },
        ],
    },
    {
        id: 3008,
        memberId: 3,
        lines: [{ bookId: 202, lateDays: 2 }],
    },
    {
        id: 3009,
        memberId: 4,
        lines: [
            { bookId: 201, lateDays: 1 },
            { bookId: 202, lateDays: 1 },
        ],
    },
    {
        id: 3010,
        memberId: 5,
        lines: [
            { bookId: 203, lateDays: 4 },
            { bookId: 204, lateDays: 3 },
        ],
    },
];

function getMemberFineStatistics(members, books, borrowRecords) {
    const result = [];
    for (const member of members) {
        const memberResult = {
            id: member.id,
            name: member.name,
            totalFine: 0,
            books: [],
        };

        const records = borrowRecords.filter(
            (record) => member.id === record.memberId,
        );

        for (const record of records) {
            if (!Object.hasOwn(record, "lines")) {
                continue;
            }

            for (const line of record.lines) {
                const book = books.find((item) => item.id === line.bookId);
                const fine = line.lateDays * book.finePerDay;

                const found = memberResult.books.find(
                    (item) => item.title === book.title,
                );

                if (found) {
                    found.fine += fine;
                    found.lateDays += line.lateDays;
                } else {
                    memberResult.books.push({
                        title: book.title,
                        lateDays: line.lateDays,
                        fine: fine,
                    });
                }
                memberResult.totalFine += fine;
            }
        }

        memberResult.books.sort((a, b) => b.fine - a.fine);

        Object.freeze(memberResult);

        result.push(memberResult);
    }

    result.sort((a, b) => b.totalFine - a.totalFine);

    Object.freeze(result);

    return result;
}

const result = getMemberFineStatistics(members, books, borrowRecords);
result[0].totalFine = 999999;
result[0].extraField = "hack";

console.log(result);



class MemberPaginator {
    constructor(resultList, soLuongMoiTrang) {
        this.resultList = resultList;
        this.soLuongMoiTrang = soLuongMoiTrang;
        this.currentIndex = 0;
    }

    [Symbol.iterator]() {
        return this;
    }

    next() {
        if (this.currentIndex >= this.resultList.length) {
            return {
                done: true,
            };
        }

        const page = this.resultList.slice(
            this.currentIndex,
            this.currentIndex + this.soLuongMoiTrang,
        );

        this.currentIndex += this.soLuongMoiTrang;

        return {
            value: page,
            done: false,
        };
    }
}

const paginator = new MemberPaginator(result, 2);

console.log([...paginator]);
