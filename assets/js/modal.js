// DOM Elements
const modalBtn = document.querySelectorAll(".modal-btn"); 
const modalbg = document.querySelector(".bground"); 
const formData = document.querySelectorAll(".formData"); 
const modalEnd = document.querySelector('.bg-modal-end'); 

const firstNameInput = document.getElementById('first'); 
const lastNameInput = document.getElementById('last'); 
const email = document.getElementById('email'); 
const birthDateInput = document.getElementById('birthdate'); 
const radioButtons = document.querySelectorAll('input[type="radio"][name="location"]'); 
let isRadioSelected = false; 
const quantityTournament = document.getElementById('quantity');
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

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
  modalbg.style.display = "block";
}

document.querySelector(".close").addEventListener('click',function(){
  modalbg.style.display = "none";
})

document.querySelector('.terminal').addEventListener('click',function(){
  modalEnd.style.display = "none"
})

document.querySelector('.btn-close').addEventListener('click',function(){
  modalEnd.style.display = "none"
})

document.querySelector(".icon").addEventListener('click',editNav)

function editNav() {
  let burgerButton = document.getElementById("myTopnav");
  if (burgerButton.className === "topnav") {
    burgerButton.className += " responsive";
  } else {
    burgerButton.className = "topnav";
  }
}

function errorDisplay(inputField, errorMessage) {
  const formData = inputField.parentElement;
  formData.setAttribute("data-error", errorMessage); 
  if(errorMessage){
  formData.setAttribute("data-error-visible", "true"); 
  }else{
    formData.removeAttribute('data-error-visible', 'true');
  }
}

function isInputsValidated(inputElement, regex, errorMessage) {
  if (!regex.test(inputElement.value)) {
    errorDisplay(inputElement, errorMessage);
    return false;
  }
  errorDisplay(inputElement, ""); 
  return true;
}

function isBirthDateValidated(){
  const today = new Date();
    const birthDate = new Date(birthDateInput.value);
    const age = today.getFullYear() - birthDate.getFullYear();

  if (birthDateInput.value === '' || age < 12) {
    errorDisplay(birthDateInput, birthDateErrorMessage); 
    return false;
  } else {
      errorDisplay(birthDateInput, "")
      birthDateInput.parentElement.removeAttribute('data-error-visible', 'true');
      return true
    }
  }

function isNumberTournamentValidated() {
  const num = parseInt(quantityTournament.value);
  if (isNaN(num)) {
    errorDisplay(quantityTournament, numberTournamentErrorMessage);
    return false;
  }else
  errorDisplay(quantityTournament, "")
  quantityTournament.parentElement.removeAttribute('data-error-visible', 'true');
  return true
}

function isLocationValidated() {
  isRadioSelected = false; 
  for (const radioButton of radioButtons) {
    radioButton.addEventListener('click', () => {
      if (radioButton.checked) {
        errorDisplay(radioButtons[0], ""); 
        isRadioSelected = true; 
        return true
      }
    });
    if (radioButton.checked) {
      isRadioSelected = true; 
      return true
    }
  }
  errorDisplay(radioButtons[0], locationErrorMessage); 
  return false;
}

function isCguValidated() {
  const checkbox1 = document.getElementById('checkbox1');
  checkbox1.addEventListener('click', () => {
    if (checkbox1.checked) {
      errorDisplay(checkbox1, "");
    }
  });
  if (!checkbox1.checked) {
    errorDisplay(checkbox1, cguErrorMessage);
    return false;
  }
  return true;
}

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

function validateForm(e) {
  const isFirstNameValid = isInputsValidated(firstNameInput, firstNameRegex, firstNameErrorMessage);
  const isLastNameValid = isInputsValidated(lastNameInput, lastNameRegex, lastNameErrorMessage);
  const isEmailValid = isInputsValidated(email, emailRegex, emailErrorMessage);
  const isBirthDateValid = isBirthDateValidated()
  const isQuantityTournamentValid = isNumberTournamentValidated()
  const isLocationSelected = isLocationValidated()
  const isCguSelected = isCguValidated()
  if (
    !isFirstNameValid
||  !isLastNameValid
||  !isEmailValid
||  !isBirthDateValid
||  !isQuantityTournamentValid
||  !isLocationSelected
||  !isCguSelected
  ) {
    e.preventDefault()
    return false;
  }else{
    displayModalEnd()  
    e.preventDefault()
    const formData = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: email.value,
      birthDate: birthDateInput.value,
      tournament: geNumberOfTournaments(),
      location: getSelectedRadioValue(radioButtons)
    };
    console.log(formData);

localStorage.setItem('formData', JSON.stringify(formData));

const formFields = document.querySelectorAll('.formData input'); // Empêche les checkbox de rester cochés après soumission du formulaire
for (const field of formFields) {
  field.value = '';
  if (field.type === 'checkbox' || field.type === 'radio') {
    field.checked = false;
    }
  }
}
  return true;
}

function displayModalEnd(){      // Affichage de la modale de remerciement
  modalEnd.style.display = "block";
  modalbg.style.display = "none"
}

function geNumberOfTournaments(){      ////tranforme la string renvoyée par l'input pour en faire un chiffre récupéré dans l'objet
const strValue = quantityTournament.value
if (!isNaN(strValue)) {
  const numValue = parseInt(strValue);
  return numValue
}
  return ""
}

function getSelectedRadioValue(radioButtons) {   //renvoit la valeur de la checkboxe type radio pour qu'elle s'affiche dans la console
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }
  return ""; 
}







// const validateFirstName = validateInput.bind(null, firstNameInput, /^[a-zA-Z0-9-]{2,15}$/, "Veuillez entrer un prénom compris entre 2 et 15 caractères");
// const validateLastName = validateInput.bind(null, lastNameInput, /^[a-zA-Z0-9-]{2,15}$/, "Veuillez entrer un nom compris entre 2 et 15 caractères");
// const validateEmail = validateInput.bind(null, email, /^[\w-.]+@[\w-.]+\.[a-zA-Z]{2,25}$/, "Adresse email invalide.");

// function isFirstNameValidated() {
//   return validateFirstName();
// }

// function isLastNameValidated() {
//   return validateLastName();
// }

// function isEmailValidated() {
//   return validateEmail();
// }

// function isInputsValidated(inputElement, regex, errorMessage) { 
//   if (!regex.test(inputElement.value)) {
//     errorDisplay(inputElement, errorMessage)
//     return false;
//   } else {
//     errorDisplay(inputElement, "")
//     return true;
//   }
// }

// function isFirstNameValidated() {
//   const firstNameRegex = /^[a-zA-Z0-9-]{2,15}$/;
//   return isInputsValidated(firstNameInput, firstNameRegex, "L'adresse mail n'est pas valide.");
// }

// function isLastNameValidated() {
//   const lastNameRegex = /^[a-zA-Z0-9-]{2,15}$/;
//   return isInputsValidated(lastNameInput, lastNameRegex, "L'adresse mail n'est pas valide.");
// }

// function isEmailValidated() {
//   const emailRegex = /^[\w-.]+@[\w-.]+\.[a-zA-Z]{2,}$/;
//     return isInputsValidated(email, emailRegex, "Adresse email invalide.");
// }