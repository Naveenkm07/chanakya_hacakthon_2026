const gTTS = require('gtts');

// 🔥 100% SAFE AUDIO FUNCTION
exports.generateAudio = (text, filePath) => {
    return new Promise((resolve) => {
        try {
            const gtts = new gTTS(text, 'hi');

            // create stream instead of direct save
            const stream = gtts.stream();

            const fs = require('fs');
            const writeStream = fs.createWriteStream(filePath);

            stream.pipe(writeStream);

            // ✅ SUCCESS
            writeStream.on('finish', () => {
                console.log("Audio saved");
                resolve();
            });

            // ❌ HANDLE STREAM ERROR
            stream.on('error', (err) => {
                console.log("Stream Error:", err.message);
                resolve(); // DO NOT CRASH
            });

            writeStream.on('error', (err) => {
                console.log("Write Error:", err.message);
                resolve(); // DO NOT CRASH
            });

        } catch (err) {
            console.log("Critical Error:", err.message);
            resolve(); // DO NOT CRASH
        }
    });
};
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegPath);

// 🔥 MODIFY SPEED FUNCTION
exports.modifySpeed = (inputPath, outputPath, speed = 1.0) => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .audioFilter(`atempo=${speed}`)
            .on('end', () => {
                console.log("Speed modified:", speed);
                resolve();
            })
            .on('error', (err) => {
                console.log("FFmpeg Error:", err.message);
                resolve(); // 🔥 don't crash
            })
            .save(outputPath);
    });
};