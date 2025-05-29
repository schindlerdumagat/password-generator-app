const range = document.querySelector(".options__slider-field");




// Logic to update custom slider the color of the slider
function updateRangeBackground() {
  const min = parseInt(range.min);
  const max = parseInt(range.max);
  const val = parseInt(range.value);
  const percent = ((val - min) / (max - min)) * 100;
  range.style.background = `linear-gradient(to right, #A4FFAF ${percent}%, #18171F ${percent}%)`;
}

range.addEventListener("input", updateRangeBackground);
updateRangeBackground(); // initialize on page load
