// DOM Elements
const modalBtn = document.querySelectorAll(".modal-btn");  // Les deux boutons d'inscription de la landing
const modalbg = document.querySelector(".bground"); // div globale qui contient la modale
// const formData = document.querySelectorAll(".formData"); 
const modalEnd = document.querySelector('.bg-modal-end'); 

const firstNameInput = document.getElementById('first'); 
const lastNameInput = document.getElementById('last'); 
const email = document.getElementById('email'); 
const birthDateInput = document.getElementById('birthdate'); 
const radioButtons = document.querySelectorAll('input[type="radio"][name="location"]'); 
const quantityTournament = document.getElementById('quantity');
const checkbox1 = document.getElementById('checkbox1')


// variables composantes d'erreurs
// Stockage des expréssions régulières de contrôle dans des variables ainsi que les messages d'erreur
let firstNameRegex = /^[a-zA-Z0-9-]{2,15}$/;
let lastNameRegex = /^[a-zA-Z0-9-]{2,15}$/;
let emailRegex = /^[\w-.]+@[\w-.]+\.[a-zA-Z]{2,25}$/;
let firstNameErrorMessage ="Veuillez entrer un prénom compris entre 2 et 15 caractères"
let lastNameErrorMessage = "Veuillez entrer un nom compris entre 2 et 15 caractères"
let emailErrorMessage = "Adresse email invalide."
let birthDateErrorMessage = "Veuillez entrer un age supérieur ou égal à douze ans."
let numberTournamentErrorMessage = "Veuillez entrer un nombre de tournois."
let locationErrorMessage = "Veuillez sélectionner un emplacement"
let cguErrorMessage = "Veuillez accepter nos conditions d'utilisation."

modalBtn.forEach((btn) => btn.addEventListener("click", displayModalSignUp));

function displayModalSignUp() {
  modalbg.style.display = "block"; 
}// Affichage en bloque de la div qui contient la modale

function displayModalEnd(){      // Affichage de la modale de remerciement
  modalEnd.style.display = "block";
  modalbg.style.display = "none"
}

document.querySelector(".close").addEventListener('click',function(){
  modalbg.style.display = "none";  
})// Fin de l'affichage en bloque de la div qui contient la modale

document.querySelector('.terminal').addEventListener('click',function(){
  modalEnd.style.display = "none"  
})// La croix cliquée en haut à droite de la modale de fin provoque la disparition de la modale de fin

document.querySelector('.btn-close').addEventListener('click',function(){
  modalEnd.style.display = "none"  
})//Bouton "Fermer" de la modale de fin pour fermer cette même modale

document.querySelector(".icon").addEventListener('click',editNav)  
  // sélection de l'icone pour changer dynamiquement la classe dans la fonction editNav en fonction du clic

function editNav() {
  let burgerButton = document.getElementById("myTopnav");
  if (burgerButton.className === "topnav") {
    burgerButton.className += " responsive";
  } else {
    burgerButton.className = "topnav";
  }
}

function isInputsValidated(inputElement, regex, errorMessage) { // validation de l'élément d'entrée dans les inputs html par rapport à une régex
  if (!regex.test(inputElement.value)) {// Si l'entrée ne respecte pas le modèle, la validation échoue et la fonction errorDisplay est appelée
    errorDisplay(inputElement, errorMessage); 
    return false; // retourne false pour indiquer l'échec de la validation
  }
  errorDisplay(inputElement, ""); // Validation réussie : message d'erreur masqué et validation réussie indiquée par true
  return true;
}

function errorDisplay(inputField, errorMessage) { // Element html d'entrée de données et une chaine de caractères pour le message d'erreur
  const formData = inputField.parentElement; // récupération de l'élément parent du champ de saisie html : input
  formData.setAttribute("data-error", errorMessage); // L'élément parent reçoit un attribut "data-error" qui stocke le message d'erreur : css invoqué
  if(errorMessage){ // si une valeur indique une erreur
  formData.setAttribute("data-error-visible", "true"); // L'autre attribue révélera le message d'erreur selon ses valeurs dans le css
  }else{
    formData.removeAttribute('data-error-visible', 'true'); // Si le message d'erreur est vide, l'attribue est enlevé.
  }
}

function isBirthDateValidated(){
    const today = new Date();     // Stockage de la date actuelle grâce à une nouvel objet Date
    const birthDate = new Date(birthDateInput.value); // convertion de la valeur d'entrée dans l'input, la date d'anniversaire en un objet Date
    const age = today.getFullYear() - birthDate.getFullYear(); // Soustraction de l'année en cours à l'année de naissance

  if (birthDateInput.value === '' || age < 12) { // Si l'une des conditions est vraie, la date de naissance est invalide
    errorDisplay(birthDateInput, birthDateErrorMessage); // La fonction errorDisplay est appelée de la même façon que précédemment
    return false;
  } else {
      errorDisplay(birthDateInput, "")
      return true
    }
  }

function isNumberTournamentValidated() {
  const num = parseInt(quantityTournament.value); // récupération de l'élément d'entrée qui est une chaîne de caractère, pour le convertir en nombre
  if (isNaN(num)) { // vérification de la réussite de cette conversion, en l'occurance, si un nombre a été saisi et donc stocké
    errorDisplay(quantityTournament, numberTournamentErrorMessage); // Une valeur vide déclanchera automatiquement la fonction errorDisplay
    return false;
  }else
  errorDisplay(quantityTournament, "") // effaçage de tout message d'erreur pour l'entrée quantityTournament
  return true
}

function isLocationValidated() {
  let isRadioSelected = false; 
  for (const radioButton of radioButtons) {
    radioButton.addEventListener('click', () => {   // Ecouteur d'événement qui joue le même que "blur" pour les autres fonctions
      if (radioButton.checked) { // Si un message d'erreur est déjà affiché sous les boutons après l'oublie de selection d'un bouton et soumission
        errorDisplay(radioButtons[0], "");  // l'erreur disparaît dès qu'un bouton de destination est sélectionné et que true est renvoyé
        isRadioSelected = true;               // Améliore l'expérience utilisateur
        return true
      }
    });
    if (radioButton.checked) { // condition de sélection d'un bouton cette fois vérifiée lors de la soumission du formulaire, lorsque la fonction est appelée
      isRadioSelected = true; 
      return true
    }
  }
  errorDisplay(radioButtons[0], locationErrorMessage); 
  return false;
}

function isCguValidated() {
  checkbox1.addEventListener('click', () => { // Ecouteur d'évenement qui améliore de même l'expérience utilisateur en effaçant
    if (checkbox1.checked) {                    // tout message d'erreur de l'élément lorsque la condition est remplie
      errorDisplay(checkbox1, "");
    }
  });
  if (!checkbox1.checked) { 
    errorDisplay(checkbox1, cguErrorMessage); // erreur renvoyé lorsque le formulaire est soumis
    return false;
  }
  return true;
}

// surveillance des éléments d'entrée : blur est déclanché lorsque l'utilisateur quite le champ de saisie
// L'utilisateur est donc directement informé qu'une erreur a été commise avant même qu'il soumette le formulaire
firstNameInput.addEventListener('blur', () => {
  isInputsValidated(firstNameInput, firstNameRegex, firstNameErrorMessage);
});
lastNameInput.addEventListener('blur', () => {
  isInputsValidated(lastNameInput, lastNameRegex, lastNameErrorMessage);
});
email.addEventListener('blur', () => {
  isInputsValidated(email, emailRegex, emailErrorMessage);
});
document.getElementById('birthdate').addEventListener('blur',isBirthDateValidated)
document.getElementById('quantity').addEventListener('blur',isNumberTournamentValidated)

document.querySelector('form').addEventListener('submit',validateForm)

function validateForm(e) {              // stockage des résultats de fonctions dans des variables intermédiaires
  const isFirstNameValid = isInputsValidated(firstNameInput, firstNameRegex, firstNameErrorMessage); 
  const isLastNameValid = isInputsValidated(lastNameInput, lastNameRegex, lastNameErrorMessage);
  const isEmailValid = isInputsValidated(email, emailRegex, emailErrorMessage);
  const isBirthDateValid = isBirthDateValidated()
  const isQuantityTournamentValid = isNumberTournamentValidated()
  const isLocationSelected = isLocationValidated()
  const isCguSelected = isCguValidated()
  if (
    !isFirstNameValid          // si ne serait-ce qu'une seule de ces variables renvoie une vérification échouée
||  !isLastNameValid           // Toutes les variables évaluées même si l'une d'entre elle renvoit false
||  !isEmailValid              // Permet affichage de toutes les erreurs détectée lors de la soumission du formulaire
||  !isBirthDateValid
||  !isQuantityTournamentValid
||  !isLocationSelected
||  !isCguSelected
  ) {
    e.preventDefault()  // Le formulaire n'est pas renvoyé
    return false;
  }else{
    displayModalEnd()  
    e.preventDefault()     // Empêche la modale de disparaître pour que l'utilisateur puisse la fermer lui-même
    sendDataToTheConsole() //Envoit l'ensemble des donénes saisies vers la console

const formFields = document.querySelectorAll('.formData input'); // Le code suicant empêche les checkbox de rester cochés après soumission du formulaire
for (const field of formFields) {
  field.value = '';
  if (field.type === 'checkbox' || field.type === 'radio') {
    field.checked = false;
    }
  }
}
  return true;
}

const checkboxes = document.querySelectorAll('input[type=checkbox]')

function sendDataToTheConsole(){
  const formData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: email.value,
    birthDate: birthDateInput.value,
    tournament: geNumberOfTournaments(),
    location: getSelectedRadioValue(radioButtons),
    CGU: getCheckBoxValue()
  };
  console.log(formData);

localStorage.setItem('formData', JSON.stringify(formData));


function geNumberOfTournaments(){      ////tranforme la string renvoyée par l'input pour en faire un chiffre récupéré dans l'objet affiché dans la console
  const strValue = quantityTournament.value
  if (!isNaN(strValue)) {
    const numValue = parseInt(strValue);
    return numValue
  }
    return ""
  }
  

  function getSelectedRadioValue(radioButtons) {   //renvoit la valeur de la checkboxe type radio pour qu'elle soit récupérée dans l'objet affiché dans la
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        return radioButton.value;
      }
    }
    return ""; 
  }
  
  function getCheckBoxValue() {
    const CGUValidated = "Les conditions générales ont été validées";
    const nextEvents = "L'utilisateur souhaite être mis au courant des prochains événements";
    const checkedValues = [];
    for (const checkbox of checkboxes) {
      if (checkbox.checked) {
        if (checkbox.id === "checkbox1") { // Check for checkbox ID
          checkedValues.push(CGUValidated);
        } else if (checkbox.id === "checkbox2") { // Check for checkbox ID
          checkedValues.push(nextEvents);
        }
      }
    }
    return checkedValues;
  }

}

