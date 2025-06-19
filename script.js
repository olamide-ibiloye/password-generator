// DOM Elements
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

// Character sets
const characters = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*(){}[]=<>/,.",
};

// Event Listeners
generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasNumbers = numbersEl.checked;
  const hasSymbols = symbolsEl.checked;

  resultEl.innerText = generatePassword(length, hasNumbers, hasSymbols);
});

// Copy password to clipboard using modern Clipboard API
clipboardEl.addEventListener("click", async () => {
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  try {
    await navigator.clipboard.writeText(password);

    // Show copied notification
    const notification = document.createElement("div");
    notification.classList.add("copied");
    notification.innerText = "Password copied to clipboard!";
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
});

// Generate password function
function generatePassword(length, hasNumbers, hasSymbols) {
  // Initialize password variable
  let generatedPassword = "";

  // Create array of included types
  const typesArr = [
    { type: "lower", include: true },
    { type: "upper", include: true },
    { type: "number", include: hasNumbers },
    { type: "symbol", include: hasSymbols },
  ].filter((item) => item.include);

  // Create password with random characters
  for (let i = 0; i < length; i++) {
    // Get random type
    const randomType =
      typesArr[Math.floor(Math.random() * typesArr.length)].type;
    // Get random character from the selected type
    const charactersString = characters[randomType];
    const randomIndex = Math.floor(Math.random() * charactersString.length);
    generatedPassword += charactersString[randomIndex];
  }

  return generatedPassword;
}
