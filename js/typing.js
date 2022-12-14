const typedTextSpan = document.querySelector(".typed-text"),
    cursorSpan = document.querySelector(".cursor"),
    textArray = ["Pengangguran", "FrontEnd Dev", "BackEnd Dev", "Ilustrator"],
    typingDelay = 200,
    erasingDelay = 100,
    newTextDelay = 100;
let textArrayIndex = 0,
    charIndex = 0;

function type() {
    charIndex < textArray[textArrayIndex].length ? (cursorSpan.classList.contains("typing") || cursorSpan.classList.add("typing"), typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex), charIndex++, setTimeout(type, 100)) : (cursorSpan.classList.remove("typing"), setTimeout(erase, 1e3))
}

function erase() {
    charIndex > 0 ? (cursorSpan.classList.contains("typing") || cursorSpan.classList.add("typing"), typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1), charIndex--, setTimeout(erase, 100)) : (cursorSpan.classList.remove("typing"), textArrayIndex++, textArrayIndex >= textArray.length && (textArrayIndex = 0), setTimeout(type, 1200))
}
document.addEventListener("DOMContentLoaded", (function () {
    textArray.length && setTimeout(type, 1250)
}));