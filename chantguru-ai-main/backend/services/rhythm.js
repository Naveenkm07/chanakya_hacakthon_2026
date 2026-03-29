exports.assignRhythm = (syllables) => {
    const longVowels = ['ा', 'ी', 'ू', 'े', 'ै', 'ो', 'ौ'];

    return syllables.map(syl => {
        for (let char of syl) {
            if (longVowels.includes(char)) {
                return "G"; // Guru
            }
        }
        return "L"; // Laghu
    });
};