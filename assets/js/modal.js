// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalEnd = document.querySelector('.bg-modal-end')

const firstNameInput = document.getElementById('first');
const lastNameInput = document.getElementById('last');
const email = document.getElementById('email');
const birthDateInput = document.getElementById('birthdate');
const radioButtons = document.querySelectorAll('input[type="radio"][name="location"]');
let isRadioSelected = false;

document.querySelector(".icon").addEventListener('click',editNav)

function editNav() {
  let burgerButton = document.getElementById("myTopnav");
  if (burgerButton.className === "topnav") {
    burgerButton.className += " responsive";
  } else {
    burgerButton.className = "topnav";
  }
}

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

function errorDisplay(inputField, errorMessage) {
  const formData = inputField.parentElement;
  formData.setAttribute("data-error", errorMessage); 
  formData.setAttribute("data-error-visible", "true"); 
}

function handleValidation(inputElement, regex, errorMessage) {
  const inputsData = inputElement.parentElement;

  if (!regex.test(inputElement.value)) {
    inputsData.setAttribute("data-error", errorMessage);
    inputsData.setAttribute("data-error-visible", "true");
    return false;
  } else {
    inputsData.removeAttribute("data-error");
    inputsData.removeAttribute("data-error-visible");
    return inputElement.value;
  }
}

function validateFirstName() {
  const firstNameRegex = /^[a-zA-Z0-9-]{2,15}$/;
  return handleValidation(firstNameInput, firstNameRegex, "Le prénom n'est pas valide.");
}

function validateLastName() {
  const lastNameRegex = /^[a-zA-Z0-9-]{2,15}$/;
  return handleValidation(lastNameInput, lastNameRegex, "Le nom n'est pas valide.");
}

function validateEmail() {
  const emailRegex = /^[\w-.]+@[\w-.]+\.[a-zA-Z]{2,}$/;
  if (email.value.length === 0) {
    errorDisplay(email, "Veuillez entrer une adresse mail valide.");
    return false;
  } else {
    return handleValidation(email, emailRegex, "Adresse email invalide.");
  }
}

function validateBirthDate(){
  const today = new Date();
    const birthDate = new Date(birthDateInput.value);
    const age = today.getFullYear() - birthDate.getFullYear();

  if (birthDateInput.value === '' || age < 12) {
    errorDisplay(birthDateInput, "Veuillez entrer un age supérieur ou égal à douze ans."); 
    return false;
  } else {
      errorDisplay(birthDateInput, "")
      birthDateInput.parentElement.removeAttribute('data-error-visible', 'true');
      return birthDateInput.value
    }
  }

function verifyNumberTournament() {
const quantityTournament = document.getElementById('quantity');
const num = parseInt(quantityTournament.value);
  if (isNaN(num)) {
    errorDisplay(quantityTournament, "Veuillez entrer un nombre de tournois.");
    return false;
  }else
  errorDisplay(quantityTournament, "")
  quantityTournament.parentElement.removeAttribute('data-error-visible', 'true');
  return quantityTournament.value
}

function verifyRadio() {
  isRadioSelected = false; 
  for (const radioButton of radioButtons) {
    radioButton.addEventListener('click', () => {
      if (radioButton.checked) {
        errorDisplay(radioButtons[0], ""); 
        isRadioSelected = true; 
        return radioButton.value; 
      }
    });

    if (radioButton.checked) {
      isRadioSelected = true; 
      return true; 
    }
  }
  errorDisplay(radioButtons[0], "Veuillez sélectionner un emplacement"); 
  return false;
}

function formIsValid() {
  const checkbox1 = document.getElementById('checkbox1');
  checkbox1.addEventListener('click', () => {
    if (checkbox1.checked) {
      errorDisplay(checkbox1, "");
    }
  });
  if (!checkbox1.checked) {
    errorDisplay(checkbox1, "Veuillez accepter nos conditions d'utilisation.");
    return false;
  }
  return true;
}
document.getElementById('first').addEventListener('blur', validateFirstName);
document.getElementById('last').addEventListener('blur',validateLastName)
document.getElementById('email').addEventListener('blur',validateEmail)
document.getElementById('birthdate').addEventListener('blur',validateBirthDate)
document.getElementById('quantity').addEventListener('blur',verifyNumberTournament)

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
  }else{
    displayModalEnd()  
    e.preventDefault()
    const formData = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: email.value,
      birthDate: birthDateInput.value,
      quantityTournament: verifyNumberTournament(),
      location: getSelectedRadioValue(radioButtons)
    };
    console.log(formData);

// localStorage.setItem('formData', JSON.stringify(formData));

const formFields = document.querySelectorAll('.formData input');
for (const field of formFields) {
  field.value = '';
  if (field.type === 'checkbox' || field.type === 'radio') {
    field.checked = false;
    }
  }
}
  return true;
}

function displayModalEnd(){
  modalEnd.style.display = "block";
  modalbg.style.display = "none"
}

function getSelectedRadioValue(radioButtons) {
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }
  return ""; 
}
