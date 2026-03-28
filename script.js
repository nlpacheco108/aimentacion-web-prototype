const thumbButtons = document.querySelectorAll(".thumb-button");
const spotlightImage = document.getElementById("spotlight-image");
const spotlightKicker = document.getElementById("spotlight-kicker");
const spotlightTitle = document.getElementById("spotlight-title");
const spotlightText = document.getElementById("spotlight-text");

function setSpotlight(button) {
  if (!button || !spotlightImage || !spotlightKicker || !spotlightTitle || !spotlightText) {
    return;
  }

  spotlightImage.src = button.dataset.image;
  spotlightKicker.textContent = button.dataset.kicker;
  spotlightTitle.textContent = button.dataset.title;
  spotlightText.textContent = button.dataset.text;
  spotlightImage.alt = button.querySelector("img")?.alt || "Pieza destacada de AlfarerIA NLP";

  thumbButtons.forEach((item) => item.classList.toggle("active", item === button));
}

thumbButtons.forEach((button) => {
  button.addEventListener("click", () => setSpotlight(button));
});
