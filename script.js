//les variables
const category = document.getElementById("category");
const perd = document.getElementById("perd");
const gagne = document.getElementById("gagne");
const question = document.getElementById("question");
const choix = document.querySelectorAll(".choix");
const valider = document.getElementById("valider");
const effacer = document.getElementById("effacer");
let tonChoix = "";
const url = `https://opentdb.com/api.php?amount=1`;
let win;
let plus = 0;
let moin = 0;
const plusFromLocalStorage = JSON.parse(localStorage.getItem("plus"));
const moinFromLocalStorage = JSON.parse(localStorage.getItem("moin"));
//demarrage du localStorage
if (plusFromLocalStorage) {
  plus = plusFromLocalStorage;
}
if (moinFromLocalStorage) {
  moin = moinFromLocalStorage;
}
//la fonction qui du demmarre le jeu
function debuter() {
  choix[2].classList.remove("inputCache");
  choix[3].classList.remove("inputCache");
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      gagne.textContent = plus;
      perd.textContent = moin;
      console.log(response);
      category.textContent = response.results[0].category;
      let vraiFaux = response.results[0].incorrect_answers;
      win = response.results[0].correct_answer;
      vraiFaux.push(response.results[0].correct_answer);
      console.log(vraiFaux);
      console.log(win);
      question.textContent = response.results[0].question;
      vraiFaux.sort(() => Math.random() - 0.5);
      //remplissage du champs
      for (let i = 0; i < vraiFaux.length; i++) {
        choix[i].value = vraiFaux[i];
        tonChoix = "";
        if (vraiFaux.length === 2) {
          choix[2].classList.add("inputCache");
          choix[3].classList.add("inputCache");
        }
      }
    });
}
debuter();
//response valide
choix.forEach((element) => {
  element.addEventListener("click", function jouer() {
    tonChoix = "";
    tonChoix = element.value;
  });
});
//response verification
function verification() {
  if (tonChoix === win) {
    plus++;
    localStorage.setItem("plus", JSON.stringify(plus));
    for (let i = 0; i < choix.length; i++) {
      choix[i].value = "";
    }
    debuter();
  } else if (tonChoix === "") {
    alert("choisi une reponse");
  } else {
    moin++;
    localStorage.setItem("moin", JSON.stringify(moin));
    for (let i = 0; i < choix.length; i++) {
      choix[i].value = "";
    }
    debuter();
  }
}
//response sending
valider.addEventListener("click", verification);
console.log(plus);
//delete localStorage
effacer.addEventListener("click", () => {
  localStorage.clear();
  moin = 0;
  plus = 0;
  debuter();
});
