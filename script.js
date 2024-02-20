/* ---- RUN ON LOAD && INITIALIZERS ---- */
let lowerCaseArray;
let upperCaseArray;
let numbers;

generateLowerCase();
generateUpperCase();
generateNumbers();

/* ---- SCRIPT ---- */

/* ---- FUNCTIONS ---- */

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

// Global getElement function
function getElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    return element;
  }
  throw new Error(`${element} is not found`);
}
