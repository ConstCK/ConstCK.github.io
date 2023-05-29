let accordeon = document.querySelectorAll("h3");
let englishBars = document.querySelector(".language-skills.bar").children;
let russianBar = document.querySelector("#Russian");
let englishCounter = 0;
let russianCounter = 0;
let englishSkillLevel = 3;
let russianSkillLevel = 95;
for (i of accordeon) {
  i.onclick = function (e) {
    e.target.classList.toggle("active");
    let content = e.target.nextElementSibling;
    content.classList.toggle("invisible");
  };
}

let skillPainting = function (elem) {
  elem.style = "background-color:gold";
};

let englishInterval = setInterval((elem = englishBars) => {
  elem[englishCounter].style = "background-color:gold";
  englishCounter++;
  if (englishCounter > englishSkillLevel) {
    clearInterval(englishInterval);
  }
}, 180);

let russianInterval = setInterval((elem = russianBar) => {
  elem.style = `width: ${russianCounter}%`;
  elem.innerHTML = `${russianCounter}%`;
  russianCounter++;
  if (russianCounter > russianSkillLevel) {
    clearInterval(russianInterval);
  }
}, 20);
