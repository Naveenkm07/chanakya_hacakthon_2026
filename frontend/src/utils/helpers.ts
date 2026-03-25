// Utility helpers for the Sanskrit Chant Generation System

/**
 * Converts a string to title case
 */
export const toTitleCase = (str: string): string =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

/**
 * Formats milliseconds to mm:ss
 */
export const formatDuration = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
