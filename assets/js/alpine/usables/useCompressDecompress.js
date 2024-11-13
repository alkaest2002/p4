const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+#";
const padInputString  = input => (6 - input.length % 6) === 6 ? input : input + "a".repeat(6 - input.length % 6);
const binaryToDecimal = input => parseInt(input, 2);
const decimalToBase64 = input => base64Chars[input];
const base64ToDecimal = input => base64Chars.indexOf(input);
const decimalToBinary = input => input.toString(2).padStart(6, "0");

export function compressString(inputString) {
  // inputString (must be already sanitized) will be a sequence of 70 "a" or "b" chars (i.e., the KTS answers)
  // need to pad inputString to make it a multiple of 6 since base64 uses 6-bit characters
  return padInputString(inputString)
    .replace(/a/g, "0")
    .replace(/b/g, "1")
    .match(/.{6}/g)
    .map(input => binaryToDecimal(input))
    .map(input => decimalToBase64(input))
    .join("")
}

export function decompressString(compressedInput, originalStringLength) {
  return compressedInput
    .split("")
    .map(input => base64ToDecimal(input))
    .map(input => decimalToBinary(input))
    .join("")
    .replace(/0/g, "a")
    .replace(/1/g, "b")
    .slice(0, originalStringLength)
}