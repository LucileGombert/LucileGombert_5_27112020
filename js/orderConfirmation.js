let paramsConfirmation = new URLSearchParams(window.location.search);


let prixConfirmation = document.getElementById("prixcommande");
let idConfirmation = document.getElementById("idcommande");


prixConfirmation.textContent = paramsConfirmation.get('prix');
idConfirmation.textContent = paramsConfirmation.get('id');