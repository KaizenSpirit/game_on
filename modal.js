// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

//burger button nav
document.querySelector(".icon").addEventListener('click',editNav)

function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
document.querySelector(".close").addEventListener('click',function(){
  modalbg.style.display = "none";
})



// //variables for validation
// const firstName = document.getElementById('first');
// const firstNameError = document.getElementById('firstNameError');
// //last name
// const lastName = document.getElementById('last');
// const lastNameError = document.getElementById('lastNameError');
// // email
// const email = document.getElementById('email');
// const emailError = document.getElementById('emailError');

// // radio buttons
// const radioButtons = document.querySelectorAll('input[type="radio"][name="location"]');
// let isSelected = false;
// const buttonError = document.getElementById('button-radio-error');
// //
// const birthDateInput = document.getElementById('birthdate');
// const birthDateErrorSpan = document.getElementById('birthDateError');




// //***************************************************************
// //********************firstname validation *********************
// //***************************************************************
// function validateFirstName() {
//   if (firstName.value.length === 0) {
//     firstNameError.textContent = 'Veuillez saisir votre prénom.';
//     return false;
//   } else if (firstName.value.length < 2) {
//     firstNameError.textContent = 'Le prénom doit être composé au moins deux caractères.';
//     return false;
//   } else if (!/^[a-zA-Z0-9_\-]+$/.test(firstName.value)) { 
//     firstNameError.textContent = "Le prénom ne doit contenir que des lettres, des chiffres, des tirets et des underscores.";
//     return false;
//   }
//   firstNameError.textContent = '';
//   return true;
// }
// //***************************************************************
// //********************lastname validation *********************
// //***************************************************************
// function validateLastName() {
//   if (lastName.value.length === 0) {
//     lastNameError.textContent = "Veuillez saisir votre nom.";
//     return false;
//   } else if (lastName.value.length < 2) {
//     lastNameError.textContent = 'Le nom doit faire au moins deux caractères.';
//     return false;
//   } else if (!/^[a-zA-Z0-9_\-]+$/.test(lastName.value)) { 
//     lastNameError.textContent = "Le nom ne doit contenir que des lettres, des chiffres, des tirets et des underscores.";
//     return false;
//   }
//   lastNameError.textContent = "";
//   return true;
// }
// //***************************************************************
// //*********************** email validation **********************
// //***************************************************************
// function validateEmail() {
//   if (email.value.length === 0) {
//     emailError.textContent = 'Saisir votre adresse mail.';
//     return false;
//   } else if (!/^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,6}$/.test(email.value)) {
//     emailError.textContent = "L'adresse mail n'est pas valide";
//     return false;
//   } 
//   emailError.textContent = '';
//   return true;
// }
// //***************************************************************
// //************************number validation *********************
// //***************************************************************
// function verifyNumber() {
//   // quantity
// const input = document.getElementById('quantity');
// const num = parseInt(input.value);
// const nombreError = document.getElementById('numberError');
//   if (isNaN(num)) {
//     nombreError.textContent ='Veuillez choisir un nombre de tournois';
//     return false;
//   }else
//   nombreError.textContent ='';
//   return true;
// }
// //***************************************************************
// //********************radio button validation *******************
// //***************************************************************
// function verifierRadio() {
//   for (const radioButton of radioButtons) {
//     if (radioButton.checked) { //boolean
//       isSelected = true;
//       buttonError.textContent = ''; 
//       return true; 
//     }
//   }
//   buttonError.textContent = 'Veuillez sélectionner une ville.';
//   return false; 
// }
// //***************************************************************
// //********************birth date validation *********************
// //***************************************************************
// function verifyBirthdate() {
//   if (birthDateInput.value === '') {
//     birthDateErrorSpan.textContent = 'Sélectionnez une date de naissance';
//     return false;
//   } else {
//     const today = new Date();
//     const birthDate = new Date(birthDateInput.value);
//     const age = today.getFullYear() - birthDate.getFullYear();
//     if (age < 12) {
//       birthDateErrorSpan.textContent = 'Vous devez avoir au moins 12 ans';
//       return false;
//     } else {
//       birthDateErrorSpan.textContent = '';
//       return true;
//     }
//   }
// }
// //***************************************************************
// //********************for submit validation *********************
// //***************************************************************
//     function formIsValid() {
//       const checkbox1 = document.getElementById('checkbox1');
//       const checkboxError = document.getElementById('checkbox-error');
    
//       if (!checkbox1.checked) {
//         checkboxError.textContent = "Veuillez accepter les conditions d'utilisation"; // Set error message
//         return false;
//       }
//       // Clear error message if checkbox1 is now checked (optional)
//       checkboxError.textContent = ""; // Clear error message if valid
//       return true;
//     }

// document.querySelector('form').addEventListener('submit',validateForm)

// function validateForm(e) {
//   if (!(validateFirstName() 
//     && validateLastName() 
//     && validateEmail()
//     && verifyNumber()
//     && verifierRadio()
//     && verifyBirthdate()
//     && formIsValid())
//   ) {
//     e.preventDefault()
//     return false;
//   }

//   return true;
// }


// document.getElementById('first').addEventListener('blur', validateFirstName);
// document.getElementById('last').addEventListener('blur',validateLastName)
// document.getElementById('email').addEventListener('blur',validateEmail)
// document.getElementById('quantity').addEventListener('blur',verifyNumber)
// document.getElementById('birthdate').addEventListener('blur',verifyBirthdate)





const firstNameInput = document.getElementById('first');
const lastNameInput = document.getElementById('last');
const email = document.getElementById('email');
const birthDateInput = document.getElementById('birthdate');
const radioButtons = document.querySelectorAll('input[type="radio"][name="location"]');
let isRadioSelected = false;


// setting function to display error message from css caracteristics .formData[data-error]::after
function errorDisplay(inputField, errorMessage) {
  const formData = inputField.parentElement;
  formData.setAttribute("data-error", errorMessage); 
  formData.setAttribute("data-error-visible", "true"); 
}

function validateFirstName(){
  if (firstNameInput.value.trim().length < 2) {
    errorDisplay(firstNameInput, "Veuillez entrer un prénom valide."); 
    return false;
  } else {
    return firstNameInput.value; 
  }
}

function validateLastName(){
  if (lastNameInput.value.trim().length < 2) {
    errorDisplay(lastNameInput, "Veuillez entrer un nom valide."); 
    return false; 
  } else {
    return lastNameInput.value; 
  }
}


function validateEmail(){
  if(email.value.length === 0){
    errorDisplay(email, "Veuillez entrer une adresse mail valide."); 
    return false;
  }else{
    return email.value
  }
}


function validateBirthDate(){
  if (birthDateInput.value === '') {
    errorDisplay(birthDateInput, "Veuillez entrer une adresse mail valide."); 
    return false;
  } else {
    const today = new Date();
    const birthDate = new Date(birthDateInput.value);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 12) {
      errorDisplay(birthDateInput, "Age minial d'inscription : douze ans."); 
      return false;
    } else {
      return birthDateInput.value
    }
  }
}

function verifyNumberTournament() {
  // quantity
const quantityTournament = document.getElementById('quantity');
const num = parseInt(quantityTournament.value);
  if (isNaN(num)) {
    errorDisplay(quantityTournament, "Veuillez entrer un nombre de tournois.");
    return false;
  }else
  return quantityTournament.value
}

function verifyRadio() {
  for (const radioButton of radioButtons) {
    if (radioButton.checked) { 
      isRadioSelected = true;
      return true 
    }
  }
  errorDisplay(radioButtons[0], "Veuillez entrer un lieu de tournois.");
  return radioButtons.value; 
}


function formIsValid() {
  const checkbox1 = document.getElementById('checkbox1');

  if (!checkbox1.checked) {
    errorDisplay(checkbox1, "Veuillez accepter nos conditions d'utilisation.");
    return false;
  }
  return true;
}


document.querySelector('form').addEventListener('submit',validateForm)

function validateForm(e) {
  let firstNameValid = validateFirstName();
  let lastNameValid = validateLastName();
  let emailValid = validateEmail()
  let birthDateValid = validateBirthDate()
  let quantityTournamentValid = verifyNumberTournament()
  let radioButtonSelected = verifyRadio()
  let formIsValidated = formIsValid()
  if (
    !validateFirstName() 
||  !validateLastName()
||  !validateEmail()
||  !validateBirthDate()
||  !verifyNumberTournament()
||  !verifyRadio()
||  !formIsValid()
  ) {
    e.preventDefault()
    return false;
  }
  return true;
}