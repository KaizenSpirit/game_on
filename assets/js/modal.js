// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalEnd = document.querySelector('.bg-modal-end')

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


document.querySelector('.terminal').addEventListener('click',function(){
  modalEnd.style.display = "none"
})

document.querySelector('.btn-close').addEventListener('click',function(){
  modalEnd.style.display = "none"
})


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
    errorDisplay(firstNameInput, "")
    firstNameInput.parentElement.setAttribute('data-success-visible', 'true');
    return firstNameInput.value; 
  }
}

function validateLastName(){
  if (lastNameInput.value.trim().length < 2) {
    errorDisplay(lastNameInput, "Veuillez entrer un nom valide."); 
    return false; 
  } else {
    errorDisplay(lastNameInput, "")
    lastNameInput.parentElement.setAttribute('data-success-visible', 'true');
    return lastNameInput.value; 
  }
}


function validateEmail(){
  if(email.value.length === 0){
    errorDisplay(email, "Veuillez entrer une adresse mail valide."); 
    return false;
  }else{
    errorDisplay(email, "")
    email.parentElement.setAttribute('data-success-visible', 'true');
    return email.value
  }
}


function validateBirthDate(){
  if (birthDateInput.value === '') {
    errorDisplay(birthDateInput, "Veuillez entrer une date de naissance."); 
    return false;
  } else {
    const today = new Date();
    const birthDate = new Date(birthDateInput.value);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 12) {
      errorDisplay(birthDateInput, "Age minial d'inscription : douze ans."); 
      return false;
    } else {
      errorDisplay(birthDateInput, "")
      birthDateInput.parentElement.setAttribute('data-success-visible', 'true');
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
  errorDisplay(quantityTournament, "")
  quantityTournament.parentElement.setAttribute('data-success-visible', 'true');
  return quantityTournament.value
}

function verifyRadio() {
  isRadioSelected = false; 

  for (const radioButton of radioButtons) {
    radioButton.addEventListener('click', () => {
      if (radioButton.checked) {
        errorDisplay(radioButtons[0], ""); 
        isRadioSelected = true; 
        return true; 
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

  // Add event listener to checkbox
  checkbox1.addEventListener('click', () => {
    if (checkbox1.checked) {
      errorDisplay(checkbox1, ""); // Hide error message
    }
  });

  // Check checkbox state and display error if unchecked
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


function displayModalEnd(){
  modalEnd.style.display = "block";
  modalbg.style.display = "none"
}
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
    
  }
  return true;
  
}

