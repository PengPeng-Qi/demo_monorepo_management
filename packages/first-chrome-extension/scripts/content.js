const Button = document.querySelector(".Dark_box_2i4rW button");

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const localStorageJson = JSON.parse(localStorage.getItem("darkMode"));

if (isDarkMode) {
  // 白天模式
  if (localStorageJson.mode === 0) {
    Button.click();
  }
} else {
  if (localStorageJson.mode === 1) {
    Button.click();
  }
}
