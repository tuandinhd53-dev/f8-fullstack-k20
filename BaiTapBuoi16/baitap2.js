function getWords(text) {
    return text.split(" ");
}

console.log(getWords) /
    function countWord(text, word) {
        const words = getWords(text);

        let count = 0;

        for (const item of words) {
            if (item === word) {
                count++;
            }
        }

        return count;
    };

function getUniqueWords(text) {
    const words = getWords(text);
    const unique = new Set(words);

    return [...unique].sort();
}

function getTopWords(text, n) {
    const words = getWords(text);
    const freq = {};

    // 1. đếm
    for (let w of words) {
        freq[w] = (freq[w] || 0) + 1;
    }

    // 2. đổi sang mảng
    const result = Object.keys(freq).map((word) => {
        return {
            word,
            count: freq[word],
        };
    });

    // 3. sort giảm dần
    result.sort((a, b) => b.count - a.count);

    // 4. lấy n phần tử
    return result.slice(0, n);
}

function highlight(text, word) {
    return text.replaceAll(word, `**${word}**`);
}
