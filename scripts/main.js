const range = document.querySelector(".options__slider-field");
const formSettings = document.querySelector("#form-settings");
const charLenSlider = document.querySelector("#char-length-slider");
const sliderValue = document.querySelector("#slider-value");
const errorMessage = document.querySelector(".error-message");
const passwordResult = document.querySelector("#password-result");
const passwordResultMeter = document.querySelector("#password-result-meter");
const passwordValue = document.querySelector("#password-value");
const passwordCopiedText = document.querySelector("#password-copied-text");
const copyBtn = document.querySelector("#copy-btn");

function generatePassword(length, useLower, useUpper, useDigits, useSpecial) {
    let charSets = "";

    if (useLower) charSets += "abcdefghijklmnopqrstuvwxyz";
    if (useUpper) charSets += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useDigits) charSets += "0123456789";
    if (useSpecial) charSets += "!@#$%^&*()-_=+[]{};:,.<>?";

    if (charSets.length === 0) {
      throw new Error("Please select at least one option.");
    };

    let password = "";
    for (let i = 0; i < length; i++) {
        password += charSets[Math.floor(Math.random() * charSets.length)];
    }

    return password;
}

function evaluateStrength(password) {
  
    const length = password.length;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()-_=+[\]{};:,.<>?]/.test(password);

    let score = (hasLower + hasUpper + hasDigit + hasSpecial) * 2 + Math.min(Math.floor(length / 4), 4);

    if (score <= 4) return "too-weak";
    if (score <= 6) return "weak";
    if (score <= 8) return "medium";
    return "strong";
}

// Logic to update custom slider the color of the slider
function updateRangeBackground() {
  const min = parseInt(range.min);
  const max = parseInt(range.max);
  const val = parseInt(range.value);
  const percent = ((val - min) / (max - min)) * 100;
  range.style.background = `linear-gradient(to right, #A4FFAF ${percent}%, #18171F ${percent}%)`;
}

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { charLength, hasUpper, hasLower, hasNumber, hasSymbol } = Object.fromEntries(formData.entries());

  try {
    const password = generatePassword(charLength, hasUpper, hasLower, hasNumber, hasSymbol);
    console.log(password);
    const passwordStrength =  evaluateStrength(password);
    passwordValue.value = password;
    passwordResultMeter.className = `options__strength-bars options__strength-bars--${passwordStrength}`;
    passwordResult.textContent = passwordStrength.replaceAll("-", " ");
    errorMessage.textContent = "";
    passwordCopiedText.textContent = "";
  } catch (e) {
    errorMessage.textContent = e.message;
    console.error(e);
  }

}

function handleSliderChange(e) {
  sliderValue.textContent = e.target.value;
}

function handleCopyClick(e) {
  e.preventDefault();
  navigator.clipboard.writeText(passwordValue.value);

  passwordCopiedText.textContent = "copied";
}

formSettings.addEventListener("submit", handleSubmit);
charLenSlider.addEventListener("input", handleSliderChange);
range.addEventListener("input", updateRangeBackground);
copyBtn.addEventListener("click", handleCopyClick);

updateRangeBackground(); // initialize on page load
