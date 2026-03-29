exports.splitSyllables = (text) => {
    return text.match(/[\u0900-\u097F][\u093E-\u094C]?[\u094D\u0900-\u097F]*/g) || [];
};