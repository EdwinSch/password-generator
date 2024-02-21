/* ---- INITIALIZERS ---- */
let lowerCaseArray;
let upperCaseArray;
let numbers;
let password = "";

let currentSliderValue;

const lengthInput = getElement("#lengthInput");
const lengthOutput = getElement(".length-output");
const passwordOutput = getElement(".output");
const generateBtn = getElement("#submit-btn");
const clipboardBtn = getElement("#clipboard-btn");
const strengthMeter = getElement(".meter-container");

/* ---- RUN ON LOAD ---- */
generateLowerCase();
// generateUpperCase();
// generateNumbers();

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
  // Generate password
  generatePassword();
  // Style password output color
  passwordOutput.style.color = "#e6e5ea";
  // Set strength meter
  setStrengthMeter();
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

// Generate password by length input
function generatePassword() {
  for (i = 0; i < currentSliderValue; i++) {
    password = password + lowerCaseArray[getRandomPosition(lowerCaseArray)];
  }
  passwordOutput.innerText = password;
}

// Get slider value
function getCurrentSliderValue() {
  currentSliderValue = lengthInput.value;
  lengthOutput.innerText = currentSliderValue;
}

// Get random array position
function getRandomPosition(array) {
  return Math.floor(Math.random() * array.length);
}

// Generate lowercase array
function generateLowerCase() {
  lowerCaseArray = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode("a".charCodeAt(0) + index)
  );
  return lowerCaseArray;
}

// Generate uppercase array
function generateUpperCase() {
  upperCaseArray = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode("A".charCodeAt(0) + index)
  );
  return upperCaseArray;
}

// Generate number array
function generateNumbers() {
  numbers = Array.from(Array(10).keys());
  return numbers;
}

//Set Strengh meter
function setStrengthMeter() {
  if (password.length <= 6) {
    strengthMeter.innerHTML = `
    <h3 class="heading-medium">weak</h3>
        <div class="led weak"></div>
        <div class="led"></div>
        <div class="led"></div>
    `;
  }
  if (password.length > 6 && password.length <= 12) {
    strengthMeter.innerHTML = `
     <h3 class="heading-medium">medium</h3>
        <div class="led medium"></div>
        <div class="led medium"></div>
        <div class="led"></div>
    `;
  }
  if (password.length > 12) {
    strengthMeter.innerHTML = `
     <h3 class="heading-medium">strong</h3>
        <div class="led strong"></div>
        <div class="led strong"></div>
        <div class="led strong"></div>
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
