
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



// Explaination:

// Yeh poora code hamare steganography project ka main core logic hai jo stego.js file mein likha gaya hai.
// Is code ka main purpose image ke andar hidden message ko secretly hide karna aur phir us hidden message ko decode 
// karke wapas show karna hai.Sabse pehle textToBinary() function user ke hidden text ko binary format mein convert karta
//  hai kyunki computer aur image processing binary data par kaam karti hai.Yeh function har character ko ASCII value mein
//   convert karta hai aur phir usse binary mein convert karke 8 - bit format mein store karta hai.Uske baad binaryToText()
// function reverse process perform karta hai yani binary data ko dobara readable text mein convert karta hai.Yeh function
//     decoding ke waqt use hota hai jab hidden message image se extract kiya jata hai.

// Is code ka sabse important function encodeMessage() hai jo actual steganography perform karta hai.Is function mein sabse
//  pehle hidden message ke end par ###END### delimiter add kiya jata hai taake decoding ke waqt system ko pata chal sake ke
//   hidden message kahan khatam hota hai.Phir poore message ko binary mein convert kiya jata hai aur image ke pixel data ko
//    access kiya jata hai.Har image pixel ke andar RGB values hoti hain aur un values ki last bit ko modify karke hidden
//     binary data store kiya jata hai.Yeh kaam is line ke through hota hai:

// data[i] = (data[i] & ~1) | parseInt(binary[i]);

// Is line mein pehle pixel ki last bit remove ki jati hai aur phir hidden message ki binary bit us jagah insert kar di jati
// hai.Kyunki sirf last bit change hoti hai isliye image visually almost same rehti hai aur human eye difference notice nahi
//   kar pati.Is technique ko Least Significant Bit(LSB) Steganography kehte hain.

// Uske baad decodeMessage() function encoded image se hidden message nikalta hai.Yeh function image ke har pixel ki last bit
//  ko read karta hai aur un sab bits ko mila kar binary data banata hai.Phir us binary ko binaryToText() function ki madad se
//   normal text mein convert kiya jata hai.Finally code ###END### delimiter ko search karta hai taake sirf original hidden message
// return ho aur extra garbage data show naa ho.Agar delimiter naa mile to system “No hidden message found” show karta hai.
//    Is tarah yeh poora code image steganography ko implement karta hai jahan secret communication ko secure aur invisible tareeqe
//     se perform kiya jata hai.