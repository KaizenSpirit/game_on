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
//***************************************************************
//********************firstname validation *********************
//***************************************************************
function validateFirstName() {
  const firstName = document.getElementById('first');
  const firstNameError = document.getElementById('firstNameError');
  if (firstName.value.length === 0) {
    firstNameError.textContent = 'Veuillez saisir votre prénom.';
    return false;
  } else if (firstName.value.length < 2) {
    firstNameError.textContent = 'Le prénom doit être composé au moins deux caractères.';
    return false;
  } else if (!/^[a-zA-Z0-9_\-]+$/.test(firstName.value)) { 
    firstNameError.textContent = "Le prénom ne doit contenir que des lettres, des chiffres, des tirets et des underscores.";
    return false;
  }
  firstNameError.textContent = '';
  return true;
}
//***************************************************************
//********************lastname validation *********************
//***************************************************************
function validateLastName() {
  const lastName = document.getElementById('last');
  const lastNameError = document.getElementById('lastNameError');
  if (lastName.value.length === 0) {
    lastNameError.textContent = "Veuillez saisir votre nom.";
    return false;
  } else if (lastName.value.length < 2) {
    lastNameError.textContent = 'Le nom doit faire au moins deux caractères.';
    return false;
  } else if (!/^[a-zA-Z0-9_\-]+$/.test(lastName.value)) { 
    lastNameError.textContent = "Le nom ne doit contenir que des lettres, des chiffres, des tirets et des underscores.";
    return false;
  }
  lastNameError.textContent = "";
  return true;
}
//***************************************************************
//*********************** email validation **********************
//***************************************************************
function validateEmail() {
  const email = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  if (email.value.length === 0) {
    emailError.textContent = 'Saisir votre adresse mail.';
    return false;
  } else if (!email.value.includes("@")) {
    emailError.textContent = "L'adresse mail ne semble pas valide car elle ne contient pas @.";
    return false;
  }else if (!/^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,6}$/.test(email.value)) {
    emailError.textContent = "L'adresse mail doit contenir des lettres, des chiffres, des tirets, des points et des underscores.";
    return false;
  } 
  emailError.textContent = '';
  return true;
}
//***************************************************************
//************************number validation *********************
//***************************************************************
function verifyNumber() {
  const input = document.getElementById('quantity');
  const num = parseInt(input.value);
  const nombreError = document.getElementById('numberError');
  if (isNaN(num)) {
    nombreError.textContent ='Veuillez choisir un nombre de tournois';
    return false;
  }
  nombreError.textContent ='';
  return true;
}
//***************************************************************
//********************radio button validation *******************
//***************************************************************
function verifierRadio() {
  const radioButtons = document.querySelectorAll('input[type="radio"][name="location"]');
  let isSelected = false;
  const buttonError = document.getElementById('button-radio-error');
  for (const radioButton of radioButtons) {
    if (radioButton.checked) { //boolean
      isSelected = true;
      buttonError.textContent = ''; 
      return true; 
    }
  }
  buttonError.textContent = 'Veuillez sélectionner une ville.';
  return false; 
}
//***************************************************************
//********************birth date validation *********************
//***************************************************************
function verifyBirthdate() {
  const birthDateInput = document.getElementById('birthdate');
  const birthDateErrorSpan = document.getElementById('birthDateError');

  if (birthDateInput.value === '') {
    birthDateErrorSpan.textContent = 'Sélectionnez une date de naissance';
    return false;
  } else {
    const today = new Date();
    const birthDate = new Date(birthDateInput.value);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 12) {
      birthDateErrorSpan.textContent = 'Vous devez avoir au moins 12 ans';
      return false;
    } else {
      birthDateErrorSpan.textContent = '';
      return true;
    }
  }
}
//***************************************************************
//********************for submit validation *********************
//***************************************************************
    function formIsValid() {
      const checkbox1 = document.getElementById('checkbox1');
      const checkboxError = document.getElementById('checkbox-error');
    
      if (!checkbox1.checked) {
        checkboxError.textContent = "Veuillez accepter les conditions d'utilisation"; // Set error message
        return false;
      }
      // Clear error message if checkbox1 is now checked (optional)
      checkboxError.textContent = ""; // Clear error message if valid
      return true;
    }



document.getElementById('first').addEventListener('blur', validateFirstName);
document.getElementById('last').addEventListener('blur',validateLastName)
document.getElementById('email').addEventListener('blur',validateEmail)
document.getElementById('quantity').addEventListener('blur',verifyNumber)
document.getElementById('birthdate').addEventListener('blur',verifyBirthdate)

document.querySelector('form').addEventListener('submit',validateForm)


function validateForm(e) {
  if (!(validateFirstName() 
    && validateLastName() 
    && validateEmail()
    && verifyNumber()
    && verifierRadio()
    && verifyBirthdate()
    && formIsValid())
  ) {
    e.preventDefault()
    return false;
  }

  return true;
}






