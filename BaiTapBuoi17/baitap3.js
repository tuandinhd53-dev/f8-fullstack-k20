const players = [
    {
        id: 1,
        name: "DragonSlayer",
        scores: [120, 85, 200, 95],
        level: 8,
        badge: "gold",
    },
    { id: 2, name: "NightWolf", scores: [60, 75, 50], level: 5, badge: null },
    {
        id: 3,
        name: "StarQueen",
        scores: [300, 250, 180, 90, 120],
        level: 12,
        badge: "diamond",
    },
    { id: 4, name: "IronFist", scores: [40, 30], level: 2, badge: null },
    {
        id: 5,
        name: "ShadowBlade",
        scores: [150, 200, 175],
        level: 9,
        badge: "silver",
    },
];

function getTotalScore(player) {
    return player.scores.reduce((total, score) => total + score, 0);
}

function getRanking(players) {
    const ranking = players.map((player) => {
        return {
            name: player.name,
            totalScore: getTotalScore(player),
            badge: player.badge ?? "none",
        };
    });

    ranking.sort((a, b) => b.totalScore - a.totalScore);

    return ranking.map((player, index) => {
        return {
            rank: index + 1,
            ...player,
        };
    });
}

function getTopPlayers(players, n) {
    return getRanking(players)
        .slice(0, n)
        .map((player) => player.name);
}

function formatPlayerCard(player) {
    const totalScore = getTotalScore(player);

    let badgeText = "";

    switch (player.badge) {
        case "diamond":
            badgeText = " | 💎 DIAMOND";
            break;
        case "gold":
            badgeText = " | 🏅 GOLD";
            break;
        case "silver":
            badgeText = " | 🥈 SILVER";
            break;
        default:
            badgeText = "";
    }

    return `${player.name} | Lv.${player.level} | ${totalScore} điểm${badgeText}`;
}

console.log(getTotalScore(players[0])); // 500
console.log(getTotalScore(players[3])); // 70

console.log(getRanking(players));

console.log(getTopPlayers(players, 3));
console.log(getTopPlayers(players, 1));

console.log(formatPlayerCard(players[0]));
console.log(formatPlayerCard(players[1]));
console.log(formatPlayerCard(players[2]));
