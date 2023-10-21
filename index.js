// Importing functions and error classes from the colorManipulationLibrary
const {
    hexToRgb,
    rgbToHex,
    rgbToHsl,
    hslToRgb,
    adjustBrightness,
    InvalidColorFormatError,
    ValueOutOfRangeError,
    clamp,
  } = require('./colorManipulationLibrary');
  
  // Exporting the imported functions and error classes to make them accessible to other modules
  module.exports = {
    hexToRgb: hexToRgb,
    rgbToHex: rgbToHex,
    rgbToHsl: rgbToHsl,
    hslToRgb: hslToRgb,
    adjustBrightness: adjustBrightness,
    InvalidColorFormatError: InvalidColorFormatError,
    ValueOutOfRangeError: ValueOutOfRangeError,
    clamp: clamp,
  };
  