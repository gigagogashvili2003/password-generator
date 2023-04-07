const generateButton = document.querySelector("button");
const password = document.querySelector(".password_text");
const allCheckboxes = document.querySelectorAll("input[type='checkbox']");
const slider = document.getElementById("slider");
const strengthLength = document.getElementById("length_value");
const uppercaseLevel = document.getElementById("uppercaseLevel");
const lowercaseLevel = document.getElementById("lowercaseLevel");
const numbersLevel = document.getElementById("numbersLevel");
const symbolsLevel = document.getElementById("symbolsLevel");
const copyButton = document.getElementById("copy_icon");

let uppercaseLettersArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let lowerCaseLettersArray = uppercaseLettersArray.map((item) =>
  item.toLowerCase()
);
let numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let symbolsArray = "!?$#@".split("");
let params = {
  uppercase: false,
  lowercase: false,
  numbers: false,
  symbols: false,
  length: 0,
};
let randomVariationsMap = new Map();

function start() {
  registerEventListeners();
}
start();

function registerEventListeners() {
  allCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", checkboxChangeHandler);
  });

  slider.addEventListener("change", sliderChangeHandler);

  generateButton.addEventListener("click", generatePassword);
  copyButton.addEventListener("click", copyClickHandler);
}

function checkboxChangeHandler(e) {
  params[e.target.name] = e.target.checked;

  if (e.target.checked) {
    settleVariations(e.target.name);
  } else {
    settleVariations(e.target.name, true);
  }
}

function settleVariations(name, del = false) {
  switch (name) {
    case "uppercase":
      if (!del) {
        randomVariationsMap.set("uppercase", uppercaseLettersArray);
        uppercaseLevel.classList.add("level_active");
      } else {
        randomVariationsMap.delete("uppercase");
        uppercaseLevel.classList.remove("level_active");
      }
      break;
    case "lowercase":
      if (!del) {
        randomVariationsMap.set("lowercase", lowerCaseLettersArray);
        lowercaseLevel.classList.add("level_active");
      } else {
        randomVariationsMap.delete("lowercase");
        lowercaseLevel.classList.remove("level_active");
      }

      break;
    case "numbers":
      if (!del) {
        randomVariationsMap.set("numbers", numbersArray);
        numbersLevel.classList.add("level_active");
      } else {
        randomVariationsMap.delete("numbers");
        numbersLevel.classList.remove("level_active");
      }

      break;
    case "symbols":
      if (!del) {
        randomVariationsMap.set("symbols", symbolsArray);
        symbolsLevel.classList.add("level_active");
      } else {
        randomVariationsMap.delete("symbols");
        symbolsLevel.classList.remove("level_active");
      }
  }
}

function sliderChangeHandler(e) {
  const length = Number(e.target.value);
  params[e.target.name] = length;
  strengthLength.innerHTML = length;
}

function generatePassword() {
  let generatedPassword = "";
  const arrayMap = Array.from(randomVariationsMap);

  if (arrayMap.length) {
    for (let i = 0; i < params.length; i++) {
      const randomNumber = getRandomInteger(arrayMap.length);
      generatedPassword +=
        arrayMap[randomNumber][1][
          getRandomInteger(arrayMap[randomNumber][1].length)
        ];
    }
  }
  password.textContent = generatedPassword;
}

function getRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

function copyClickHandler() {
  navigator.clipboard.writeText(password.textContent);
}
