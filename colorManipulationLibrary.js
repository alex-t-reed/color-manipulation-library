/**
 * Converts HEX color to RGB.
 * @param {string} hex - The HEX color code to convert.
 * @returns {Promise<{r: number, g: number, b: number}>} - A promise that resolves to an object containing the RGB values.
 */
async function hexToRgb(hex) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let parsedHex = hex.replace(/^#/, '');

            // Handle 3-character hex codes
            if (parsedHex.length === 3) {
                parsedHex = parsedHex[0] + parsedHex[0] + parsedHex[1] + parsedHex[1] + parsedHex[2] + parsedHex[2];
            }

            if (!/^(?:[0-9a-fA-F]{6})$/.test(parsedHex)) {
                reject(new InvalidColorFormatError('Invalid HEX color format'));
            }

            let r = parseInt(parsedHex.substring(0, 2), 16);
            let g = parseInt(parsedHex.substring(2, 4), 16);
            let b = parseInt(parsedHex.substring(4, 6), 16);

            resolve({ r, g, b });
        }, 200);
    });
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

class InvalidColorFormatError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidColorFormatError";
    }
}

class ValueOutOfRangeError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValueOutOfRangeError";
    }
}

/**
 * Converts RGB values to HEX color code.
 * @param {number} r - The red value (0-255).
 * @param {number} g - The green value (0-255).
 * @param {number} b - The blue value (0-255).
 * @returns {Promise<string>} - A promise that resolves to the HEX color code.
 */
async function rgbToHex(r, g, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
                reject(new ValueOutOfRangeError('Invalid RGB values'));
            }
            let hexValue = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
            resolve(hexValue);
        }, 200);
    });
}

/**
 * Converts RGB color to HSL.
 * @param {number} r - The red value (0-255).
 * @param {number} g - The green value (0-255).
 * @param {number} b - The blue value (0-255).
 * @returns {Promise<{h: number, s: number, l: number}>} - A promise that resolves to an object containing the HSL values.
 */
async function rgbToHsl(r, g, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // implementation code
            r /= 255;
            g /= 255;
            b /= 255;
            let max = Math.max(r, g, b);
            let min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0; // achromatic
            } else {
                let d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }

            resolve({ h, s, l });
        }, 200);
    });
}

/**
 * Converts HSL color to RGB.
 * @param {number} h - The hue value (0-1).
 * @param {number} s - The saturation value (0-1).
 * @param {number} l - The lightness value (0-1).
 * @returns {Promise<{r: number, g: number, b: number}>} - A promise that resolves to an object containing the RGB values.
 */
async function hslToRgb(h, s, l) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // implementation code
            let r, g, b;

            if (s === 0) {
                r = g = b = l; // achromatic
            } else {
                let hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };

                let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                let p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }

            r = Math.round(r * 255);
            g = Math.round(g * 255);
            b = Math.round(b * 255);

            resolve({ r, g, b });
        }, 200);
    });
}

/**
 * Adjusts the brightness of a color.
 * @param {{r: number, g: number, b: number}} color - An object containing the RGB values.
 * @param {number} percentage - The percentage by which to adjust brightness (-100 to 100).
 * @returns {Promise<{r: number, g: number, b: number}>} - A promise that resolves to an object containing the adjusted RGB values.
 */
async function adjustBrightness(color, percentage) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (percentage < -100 || percentage > 100) {
                reject(new ValueOutOfRangeError('Percentage value out of range'));
            }

            let r = clamp(color.r + (percentage / 100) * 255, 0, 255);
            let g = clamp(color.g + (percentage / 100) * 255, 0, 255);
            let b = clamp(color.b + (percentage / 100) * 255, 0, 255);

            let adjustedColor = { r, g, b };
            resolve(adjustedColor);
        }, 200);
    });
}

// Exporting functions for use as an npm module
module.exports = {
    hexToRgb,
    rgbToHex,
    rgbToHsl,
    hslToRgb,
    adjustBrightness,
    InvalidColorFormatError,
    ValueOutOfRangeError,
    clamp,
};
