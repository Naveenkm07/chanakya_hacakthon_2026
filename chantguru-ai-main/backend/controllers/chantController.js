const { splitSyllables } = require('../services/parser');
const { assignRhythm } = require('../services/rhythm');
const { assignMelody } = require('../services/melody');
const { generateAudio, modifySpeed } = require('../services/audioService');
const Chant = require('../models/chantModels'); // ✅ fixed
const path = require('path');

// GENERATE CHANT
exports.generateChant = async (req, res) => {
    console.log("USER:", req.user);
    const { text } = req.body;

    try {
        const syllables = splitSyllables(text);
        const rhythm = assignRhythm(syllables);
        const melody = assignMelody(syllables);

        // ✅ define ONCE
        const fileName = `${Date.now()}.mp3`;

        // ✅ correct absolute path
        const filePath = path.join(__dirname, '..', 'uploads', 'audio', fileName);

        await generateAudio(text, filePath);

        const chantData = {
            text,
            syllables,
            rhythm,
            melody,
            audio_url: `/audio/${fileName}`,
            user_id: req.user.id
        };

        Chant.createChant(chantData, (err) => {
            if (err) return res.status(500).json({ error: err });

            res.json({
                syllables,
                rhythm,
                melody,
                audio: `/audio/${fileName}`
            });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ALL CHANTS
exports.getAllChants = (req, res) => {
    Chant.getChantsByUser(req.user.id, (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.json(results);
    });
};

exports.compareChant = async (req, res) => {
    const { text } = req.body;

    try {
        const normalFile = `normal-${Date.now()}.mp3`;
        const normalPath = path.join(__dirname, '..', 'uploads', 'audio', normalFile);

        await generateAudio(text, normalPath);

        const tempFile = `temp-${Date.now()}.mp3`;
        const tempPath = path.join(__dirname, '..', 'uploads', 'audio', tempFile);

        await generateAudio(text, tempPath);

        const chantFile = `chant-${Date.now()}.mp3`;
        const chantPath = path.join(__dirname, '..', 'uploads', 'audio', chantFile);

        await modifySpeed(tempPath, chantPath, 0.7);

        res.json({
            normal: `/audio/${normalFile}`,
            chant: `/audio/${chantFile}`
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};