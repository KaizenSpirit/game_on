// DOM Elements
const modalBtn = document.querySelectorAll(".modal-btn"); // Sélection des deux boutons de la page avec une classe "modal-btn".
const modalbg = document.querySelector(".bground"); // Sélection de l'élément avec la classe "bground dans lequel se trouve le formulaire"
const formData = document.querySelectorAll(".formData"); // Sélection de tous les éléments avec la classe "formData où afficher les messages d'erreur"
const modalEnd = document.querySelector('.bg-modal-end'); // Sélection de l'élément avec la classe "bg-modal-end pour afficher la modale de confirmation d'envoie"

const firstNameInput = document.getElementById('first'); // Sélection de l'élément avec l'id "first" (champ Prénom)
const lastNameInput = document.getElementById('last'); // Sélection de l'élément avec l'id "last" (champ Nom)
const email = document.getElementById('email'); // Sélection de l'élément avec l'id "email" (champ E-mail)
const birthDateInput = document.getElementById('birthdate'); // Sélection de l'élément avec l'id "birthdate" (champ Date de naissance)
const radioButtons = document.querySelectorAll('input[type="radio"][name="location"]'); // Sélection de tous les boutons radio avec le nom "location"
let isRadioSelected = false; // Variable pour suivre la sélection d'un bouton radio (initialisée à faux)

// Écouteur d'événement sur les boutons d'ouverture de la modale 1 pour chaque format : desktop et mobile
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// Fonction de lancement de la fenêtre modale
function launchModal() {
  // Afficher l'arrière-plan de la fenêtre modale
  modalbg.style.display = "block";
}

// Écouteur d'événement sur la croix de fermeture de la fenêtre modale principale
document.querySelector(".close").addEventListener('click',function(){
  // Cacher l'arrière-plan de la modale principale
  modalbg.style.display = "none";
})

// Écouteur d'événement sur le bouton rouge de fermeture de la fenêtre modale de fin d'inscription
document.querySelector('.terminal').addEventListener('click',function(){
  // Cacher la modale de fin d'inscription
  modalEnd.style.display = "none"
})

// Écouteur d'événement sur la croix de fermeture de la fenêtre modale de fin d'inscription
document.querySelector('.btn-close').addEventListener('click',function(){
  // Cacher la modale de fin d'inscription
  modalEnd.style.display = "none"
})

document.querySelector(".icon").addEventListener('click',editNav)

function editNav() {
  // Obtenir une référence à l'élément avec l'ID "myTopnav"
  let burgerButton = document.getElementById("myTopnav");
  // Vérifier le nom de classe actuel de l'élément
  if (burgerButton.className === "topnav") {
    // Si le nom de classe est juste "topnav", ajouter "responsive" 
    //à celui-ci pour déployer la navigation en format mobile
    burgerButton.className += " responsive";
  } else {
    // Si le nom de classe est autre chose, en l'occurence "responsive" 
    //le remettre à "topnav" pour que la nav disparaisse
    burgerButton.className = "topnav";
  }
}

// Fonction pour gérer la validation d'un champ de formulaire
function handleValidation(inputElement, regex, errorMessage) { // arguments passés à l'aides des fonctions de validation suivantes
  // Récupère l'élément parent du champ de formulaire
  const inputsData = inputElement.parentElement;

  // Vérifie si la valeur du champ correspond à l'expression régulière
  if (!regex.test(inputElement.value)) {
    // Ajoute des attributs data pour indiquer une erreur
    inputsData.setAttribute("data-error", errorMessage);
    inputsData.setAttribute("data-error-visible", "true");
    // Renvoie faux si la validation échoue
    return false;
  } else {
    // Supprime les attributs data d'erreur si la validation réussit
    inputsData.removeAttribute("data-error");
    inputsData.removeAttribute("data-error-visible");
    // Renvoie la valeur du champ si la validation réussit
    return inputElement.value;
  }
}

// Fonction pour valider le prénom
function validateFirstName() {
  // Expression régulière pour le prénom (minimum 2 caractères et maximum 15 caractères)
  const firstNameRegex = /^[a-zA-Z0-9-]{2,15}$/;
  // Utilise la fonction handleValidation pour la vérification
  return handleValidation(firstNameInput, firstNameRegex, "L'adresse mail n'est pas valide.");
}

// Fonction pour valider le nom
function validateLastName() {
  // Expression régulière pour le nom (minimum 2 caractères et maximum 15 caractères)
  const lastNameRegex = /^[a-zA-Z0-9-]{2,15}$/;
  // Utilise la fonction handleValidation pour la vérification
  return handleValidation(lastNameInput, lastNameRegex, "L'adresse mail n'est pas valide.");
}

// Fonction pour valider l'adresse email
function validateEmail() {
  // Expression régulière pour l'adresse email
  const emailRegex = /^[\w-.]+@[\w-.]+\.[a-zA-Z]{2,}$/;
    return handleValidation(email, emailRegex, "Adresse email invalide.");
}

function errorDisplay(inputField, errorMessage) {
  const formData = inputField.parentElement;
  formData.setAttribute("data-error", errorMessage); 
  formData.setAttribute("data-error-visible", "true"); 
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
//to be used without errorDisplay function
  // function validateBirthDate() {
  //   // Récupère la date du jour
  //   const today = new Date();
  //   // Convertit la valeur du champ en objet Date
  //   const birthDate = new Date(birthDateInput.value);
  //   // Calcule l'âge en se basant sur les années
  //   const age = today.getFullYear() - birthDate.getFullYear();

  //   // Vérifie si l'âge est inférieur à 12 ans
  //   if (birthDateInput.value === '' || age < 12) {
  //     // Ajoute des attributs data pour indiquer une erreur
  //     birthDateInput.parentElement.setAttribute('data-error', "Veuillez entrer un age d'\au moins douze ans.");
  //     birthDateInput.parentElement.setAttribute('data-error-visible', 'true');
  //     // Renvoie faux si la validation échoue
  //     return false;
  //   } else {
  //     // Supprime les attributs data d'erreur si la validation réussit
  //     birthDateInput.parentElement.removeAttribute('data-error');
  //     birthDateInput.parentElement.removeAttribute('data-error-visible');
  //     // Renvoie la valeur de la date de naissance si la validation réussit
  //     return birthDateInput.value;
  //   }
  // }

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

// to be used without errorDisplay function
// function verifyNumberTournament() {
//   // Récupère l'élément du formulaire pour le nombre de tournois
//   const quantityTournament = document.getElementById('quantity');
//   // Expression régulière pour vérifier le format du nombre
//   const numberRegex = /^\d+$/;

//   // Vérifie si la valeur du champ correspond à l'expression régulière (nombre entier positif)
//   if (!numberRegex.test(quantityTournament.value)) {
//     // Ajoute des attributs data pour indiquer une erreur
//     quantityTournament.parentElement.setAttribute('data-error', 'Veuillez entrer un nombre de tournoi supérieur ou égal à zéro.');
//     quantityTournament.parentElement.setAttribute('data-error-visible', 'true');
//     // Renvoie faux si la validation échoue
//     return false;
//   } else {
//     // Convertit la valeur du champ en nombre entier
//     const num = parseInt(quantityTournament.value);
//     // Supprime les attributs data d'erreur si la validation réussit
//     quantityTournament.parentElement.removeAttribute('data-error');
//     quantityTournament.parentElement.removeAttribute('data-error-visible');
//     // Renvoie la valeur du nombre de tournois si la validation réussit
//     return num;
//   }
// }

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

//to be used without errorDisplay function
// function verifyRadio() {
//   // Récupère le groupe d'éléments radio
//   const radioButtons = document.querySelectorAll('input[type="radio"][name="location"]'); // Assurez-vous que le sélecteur correspond à votre groupe d'éléments radio

//   // Initialisation des attributs data pour la gestion des erreurs
//   radioButtons[0].parentElement.setAttribute('data-error', '');
//   radioButtons[0].parentElement.setAttribute('data-error-visible', 'false');

//   // Parcourt tous les éléments radio du groupe
//   for (const radioButton of radioButtons) {
//     // Ajoute un écouteur d'événement 'click' à chaque bouton radio
//     radioButton.addEventListener('click', () => {
//       // Vérifie si le bouton radio est coché
//       if (radioButton.checked) {
//         // Supprime les attributs data d'erreur
//         radioButtons[0].parentElement.removeAttribute('data-error');
//         radioButtons[0].parentElement.removeAttribute('data-error-visible');
    
//         // Indique qu'un bouton radio est sélectionné
//         isRadioSelected = true;
    
//         // Renvoie la valeur du bouton radio coché
//         return radioButton.value;
//       }
//     });
//   }

//   // Vérifie si aucun bouton radio n'est coché après la boucle
//   if (!isRadioSelected) {
//     // Ajoute des attributs data pour indiquer une erreur
//     radioButtons[0].parentElement.setAttribute('data-error', 'Veuillez sélectionner un emplacement');
//     radioButtons[0].parentElement.setAttribute('data-error-visible', 'true');

//     // Renvoie faux si aucun bouton radio n'est coché
//     return false;
//   } else {
//     // Renvoie vrai si un bouton radio est coché
//     return true;
//   }
// }

function boxIsValid() {
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

//to be used without errorDisplay function
// // Fonction pour vérifier la case à cocher des conditions d'utilisation
// function boxIsValid() {
//   // Récupère la case à cocher pour les conditions d'utilisation
//   const checkbox1 = document.getElementById('checkbox1');

//   // Ajoute un écouteur d'événement 'click' à la case à cocher
//   checkbox1.addEventListener('click', () => {
//     // Supprime l'erreur si la case est cochée
//     if (checkbox1.checked) {
//       checkbox1.parentElement.removeAttribute('data-error', 'Veuillez sélectionner un emplacement');
//       checkbox1.parentElement.removeAttribute('data-error-visible', 'true');
//     }
//   });

//   // Vérifie si la case est cochée
//   if (!checkbox1.checked) {
//     // Affiche une erreur si la case n'est pas cochée
//     checkbox1.parentElement.setAttribute('data-error', 'Veuillez sélectionner un emplacement');
//     checkbox1.parentElement.setAttribute('data-error-visible', 'true');
//     return false;
//   }
//   // Renvoie vrai si la case est cochée
//   return true;
// }

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
  let boxIsValidated = boxIsValid()
  if (
    !validateFirstName() 
||  !validateLastName()
||  !validateEmail()
||  !validateBirthDate()
||  !verifyNumberTournament()
||  !verifyRadio()
||  !boxIsValid()
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

localStorage.setItem('formData', JSON.stringify(formData));

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
