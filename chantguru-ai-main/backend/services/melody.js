exports.assignMelody = (syllables) => {
    return syllables.map((_, i) => {
        if (i % 3 === 0) return "low";
        if (i % 3 === 1) return "mid";
        return "high";
    });
};