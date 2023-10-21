const {
    hexToRgb,
    rgbToHex,
    rgbToHsl,
    hslToRgb,
    adjustBrightness,
    InvalidColorFormatError,
    ValueOutOfRangeError,
    clamp,
} = require('../colorManipulationLibrary');

describe('Color Manipulation Library Tests', () => {
    test('Hex to RGB conversion', async () => {
        const result = await hexToRgb('#ff0000');
        expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    test('RGB to Hex conversion', async () => {
        const result = await rgbToHex(255, 0, 0);
        expect(result).toBe('#ff0000');
    });

    test('RGB to HSL conversion', async () => {
        const result = await rgbToHsl(255, 0, 0);
        expect(result).toEqual({ h: 0, s: 1, l: 0.5 });
    });

    test('HSL to RGB conversion', async () => {
        const result = await hslToRgb(0, 1, 0.5);
        expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    test('Adjust brightness - Positive Percentage', async () => {
        const color = { r: 255, g: 0, b: 0 };
        const percentage = 50;
        const result = await adjustBrightness(color, percentage);
        expect(result.r).toBe(255);
        expect(result.g).toBeCloseTo(127.5); // Use toBeCloseTo for floating-point values
        expect(result.b).toBeCloseTo(127.5); // Use toBeCloseTo for floating-point values
    });

    test('Adjust brightness - Negative Percentage', async () => {
        const color = { r: 255, g: 0, b: 0 };
        const percentage = -50;
        const result = await adjustBrightness(color, percentage);
        expect(result.r).toBe(127.5); // Use toBeCloseTo for floating-point values
        expect(result.g).toBe(0);
        expect(result.b).toBe(0);
    });

    test('Invalid HEX color format error', async () => {
        await expect(hexToRgb('#ff00')).rejects.toThrow(InvalidColorFormatError);
    });

    test('Invalid RGB values error', async () => {
        await expect(rgbToHex(300, 0, 0)).rejects.toThrow(ValueOutOfRangeError);
    });

    test('Value out of range error', async () => {
        const color = { r: 255, g: 0, b: 0 };
        const percentage = 150;
        await expect(adjustBrightness(color, percentage)).rejects.toThrow(ValueOutOfRangeError);
    });

    test('Clamp function', () => {
        expect(clamp(10, 0, 5)).toBe(5);
    });
});
