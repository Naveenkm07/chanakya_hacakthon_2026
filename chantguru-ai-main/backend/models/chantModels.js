const db = require('../config/db');

exports.createChant = (data, callback) => {
    const query = `
        INSERT INTO chants 
        (text, syllables, rhythm, melody, audio_url, user_id) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [
        data.text,
        JSON.stringify(data.syllables),
        JSON.stringify(data.rhythm),
        JSON.stringify(data.melody),
        data.audio_url,
        data.user_id
    ], callback);
};

exports.getChantsByUser = (userId, callback) => {
    const query = "SELECT * FROM chants WHERE user_id = ?";
    db.query(query, [userId], callback);
};