/* ---- INITIALIZERS && TARGETS ---- */
let currentSliderValue;
let password;

const lengthInput = getElement("#lengthInput");
const lengthOutput = getElement(".length-output");
const passwordOutput = getElement(".output");
const generateBtn = getElement("#submit-btn");
const clipboardBtn = getElement("#clipboard-btn");
const strengthMeter = getElement(".meter-container");

/* ---- RUN ON LOAD ---- */
getCurrentSliderValue();

/* ---- SCRIPT ---- */

// Track & render slider value dynamically
lengthInput.addEventListener("input", function () {
  getCurrentSliderValue();
});

// Generate BTN functionalities
generateBtn.addEventListener("click", function (event) {
  // Prevent btn default
  event.preventDefault();
  // Reset current password
  password = "";
  // Get checked options
  const lowerCaseCheck = getElement("#lowercase").checked;
  const upperCaseCheck = getElement("#uppercase").checked;
  const numbersCheck = getElement("#numbers").checked;
  const symbolsCheck = getElement("#symbols").checked;

  // --- Generate password
  password = generatePassword(
    currentSliderValue,
    lowerCaseCheck,
    upperCaseCheck,
    numbersCheck,
    symbolsCheck
  );
  console.log(password);
  // Set Password
  passwordOutput.innerText = password;
  // Style password output color
  passwordOutput.style.color = "#e6e5ea";
  // Set strength meter
  setStrengthMeter();
  // Enable clipboard button
  clipboardBtn.removeAttribute("disabled");
});

// Clipboard BTN
clipboardBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(password);
  passwordOutput.style.color = "#a4ffaf";
  setTimeout(() => {
    passwordOutput.style.color = "#e6e5ea";
  }, 800);
});

/* ---- FUNCTIONS ---- */

function generatePassword(
  length,
  includeLowercase,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()-=_+[]{}|;:,.<>?/";

  let allChars = "";
  password = "";

  if (includeLowercase) {
    allChars += lowercaseChars;
  }
  if (includeUppercase) {
    allChars += uppercaseChars;
  }
  if (includeNumbers) {
    allChars += numberChars;
  }
  if (includeSymbols) {
    allChars += symbolChars;
  }

  if (allChars.length === 0) {
    password = "";
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars.charAt(randomIndex);
  }

  return password;
}

// Get slider value
function getCurrentSliderValue() {
  currentSliderValue = lengthInput.value;
  lengthOutput.innerText = currentSliderValue;
}

//Set Strengh meter and inner PW output
function setStrengthMeter() {
  // check for empty pw/selections
  if (password.length === 0) {
    passwordOutput.innerHTML = `<p class="error">Select at least one character set</p>`;
  }
  // meter options
  else if (password.length <= 6) {
    strengthMeter.innerHTML = `
    <h3 class="heading-medium">weak</h3>
        <div class="led weak"></div>
        <div class="led"></div>
        <div class="led"></div>
    `;
  } else if (password.length > 12) {
    strengthMeter.innerHTML = `
     <h3 class="heading-medium">strong</h3>
        <div class="led strong"></div>
        <div class="led strong"></div>
        <div class="led strong"></div>
    `;
  } else {
    strengthMeter.innerHTML = `
     <h3 class="heading-medium">medium</h3>
        <div class="led medium"></div>
        <div class="led medium"></div>
        <div class="led"></div>
    `;
  }
}

// Global getElement function
function getElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    return element;
  }
  throw new Error(`${element} is not found`);
}
