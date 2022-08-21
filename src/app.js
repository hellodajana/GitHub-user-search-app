const theme = document.getElementById("theme");

theme.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  changeImageAndText();
});

function changeImageAndText() {
  const image = document.getElementById("icon-mode");
  const text = document.getElementById("theme-name");

  if (image.getAttribute("src") == "assets/icon-moon.svg") {
    image.src = "assets/icon-sun.svg";
    text.innerHTML = "Light";
  } else {
    image.src = "assets/icon-moon.svg";
    text.innerHTML = "Dark";
  }
}
