
// Convert text to binary
export function textToBinary(text) {
    return text.split('').map(char =>
        char.charCodeAt(0).toString(2).padStart(8, '0')
    ).join('');
}

// Convert binary back to text
export function binaryToText(binary) {
    let text = '';
    for (let i = 0; i < binary.length; i += 8) {
        let byte = binary.substr(i, 8);
        text += String.fromCharCode(parseInt(byte, 2));
    }
    return text;
}

// Encode message into imageData
export function encodeMessage(imageData, message) {
    const delimiter = "###END###"; // 🔑 important
    let binary = textToBinary(message + delimiter);
    let data = imageData.data;

    // Make sure message fits inside image
    if (binary.length > data.length) {
        throw new Error("Message too long for this image!");
    }

    for (let i = 0; i < binary.length; i++) {
        data[i] = (data[i] & ~1) | parseInt(binary[i]);
    }

    return imageData;
}

// Decode message from imageData
export function decodeMessage(imageData) {
    const data = imageData.data;
    let binary = "";

    for (let i = 0; i < data.length; i++) {
        binary += (data[i] & 1);
    }

    // Convert to text
    let text = binaryToText(binary);

    // Stop at delimiter
    const delimiterIndex = text.indexOf("###END###");
    if (delimiterIndex === -1) return "No hidden message found";
    return text.slice(0, delimiterIndex);
}