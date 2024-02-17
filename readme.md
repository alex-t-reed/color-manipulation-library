# Color Manipulation Library

[https://www.npmjs.com/package/color-manipulation-library](https://www.npmjs.com/package/color-manipulation-library)

A simple Node.js library for converting between different color formats and applying color adjustments and filters.

## Installation

This library can be installed via npm. Use the following command:

```bash
npm install color-manipulation-library
```

## Functions

### `hexToRgb(hex)`

Converts a HEX color code to RGB values. Can be 3 character of 6 character hex.

- **Parameters:**
  - `hex` (string): The HEX color code to convert.

- **Returns:** A Promise that resolves to an object containing the RGB values.

### `rgbToHex(r, g, b)`

Converts RGB values to a HEX color code.

- **Parameters:**
  - `r` (number): The red value (0-255).
  - `g` (number): The green value (0-255).
  - `b` (number): The blue value (0-255).

- **Returns:** A Promise that resolves to the HEX color code.

### `rgbToHsl(r, g, b)`

Converts RGB values to HSL (Hue, Saturation, Lightness) color values.

- **Parameters:**
  - `r` (number): The red value (0-255).
  - `g` (number): The green value (0-255).
  - `b` (number): The blue value (0-255).

- **Returns:** A Promise that resolves to an object containing the HSL values.

### `hslToRgb(h, s, l)`

Converts HSL color values to RGB.

- **Parameters:**
  - `h` (number): The hue value (0-1).
  - `s` (number): The saturation value (0-1).
  - `l` (number): The lightness value (0-1).

- **Returns:** A Promise that resolves to an object containing the RGB values.

### `adjustBrightness(color, percentage)`

Adjusts the brightness of a color.

- **Parameters:**
  - `color` (object): An object containing the RGB values.
  - `percentage` (number): The percentage by which to adjust brightness (-100 to 100).

- **Returns:** A Promise that resolves to an object containing the adjusted RGB values.

### `clamp(value, min, max)`

Clamps a value within a specified range.

- **Parameters:**
  - `value` (number): The value to clamp.
  - `min` (number): The minimum allowed value.
  - `max` (number): The maximum allowed value.

- **Returns:** The clamped value.

## Error Classes

### `InvalidColorFormatError`

This error class is thrown when the HEX color format is invalid.

### `ValueOutOfRangeError`

This error class is thrown when values are outside the expected range.

## Example Usage

Here's an example of how to use the library to convert a HEX color to RGB:

```javascript
const { hexToRgb } = require('color-manipulation-library');

hexToRgb('#ff0000')
    .then(result => {
        console.log(result); // { r: 255, g: 0, b: 0 }
    })
    .catch((error) => {
        console.error(error);
    });
```

## License

This library is distributed under the MIT License.
