// Initialise la constante - Positionne dans la div nommée "cartContainer"
// let basket = document.getElementById('cartContainer');
let affichagePanier = document.getElementById('cartContainer');

let basket =  JSON.parse(localStorage.getItem('basket'));
let totalCost = JSON.parse(localStorage.getItem('totalCost'));


// Si le panier est vide, affiche 'Votre panier est vide !', sinon affiche 'Votre panier'
if (basket == null ) {
    const basketTitle = document.getElementById('basketTitle');
    basketTitle.innerHTML = 'Votre panier est vide !';

    let basketContent = document.getElementById('basketContent');
    let formContent = document.getElementById('formContent');
    let parent = document.body;
    parent.removeChild(basketContent);
    parent.removeChild(formContent);
} else {
    basketTitle.innerHTML = 'Votre panier';
    const div1 = document.getElementById('div1');
    div1.nextElementSibling.remove();  
}

// Si le panier contient des produits, il les affiche
if(basket.length > 0) {
    for(let product of basket) {
                 
        const basketItem = document.createElement('div');
        basketItem.setAttribute('class', 'row p-3 align-items-center border-bottom');
        cartContainer.appendChild(basketItem);

        const basketProductImage = document.createElement('img');
        basketProductImage.setAttribute('src', product.image);
        basketProductImage.setAttribute('class', 'img-fluid col-lg-1 col-xl-2');
        basketProductImage.setAttribute('style', 'max-width: 200px');
        basketItem.appendChild(basketProductImage);

        const basketProductName = document.createElement('p');
        basketProductName.setAttribute('class', 'col-lg-2');
        basketProductName.innerHTML = product.name;
        basketItem.appendChild(basketProductName);

        const basketProductPrice = document.createElement('p');
        basketProductPrice.setAttribute('class', 'col-lg-2  text-center');
        basketProductPrice.innerHTML =  product.price /100 + ',00 €';
        basketItem.appendChild(basketProductPrice);

        const basketProductQuantity = document.createElement('div');
        basketProductQuantity.setAttribute('class', 'number col-md-2 col-lg-3 text-center');
        basketProductQuantity.innerHTML = product.quantity;  
        basketItem.appendChild(basketProductQuantity);

        let totalPrice = document.getElementsByClassName('totalPrice');
        totalPrice = product.price/100 * product.quantity;

        const basketProducttotalPrice = document.createElement('p');
        basketProducttotalPrice.setAttribute('class', 'totalPrice col-lg-2 text-center');
        basketProducttotalPrice.innerHTML = totalPrice + ',00 €';
        basketItem.appendChild(basketProducttotalPrice);

        const totalBasketPrice = document.getElementById('totalBasketPrice');
        totalBasketPrice.innerHTML = totalCost /100 + ',00 €';
    }
}

// Formulaire de commande
const submitForm = document.getElementById('orderButton');

submitForm.addEventListener('click',formValidation);

function formValidation(e) {
    // e.preventDefault();
    const lastName = document.getElementById('lastName');
    const lastNameMissing = document.getElementById('lastNameMissing');
    const lastNameValidation = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?/;

    if (lastName.validity.valueMissing) {
        e.preventDefault();
        lastNameMissing.textContent = 'Ce champ est obligatoire';
        lastNameMissing.style.color = 'red';
    } else if (lastNameValidation.test(lastName.value) == false) {
        e.preventDefault();
        lastNameMissing.textContent = 'Format de saisie invalide';
        lastNameMissing.style.color = 'orange';
    } else {
        lastNameMissing.textContent = '';
    }

    const firstName = document.getElementById('firstName');
    const firstNameMissing = document.getElementById('firstNameMissing');
    const firstNameValidation = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?/;

    if (firstName.validity.valueMissing) {
        e.preventDefault();
        firstNameMissing.textContent = 'Ce champ est obligatoire';
        firstNameMissing.style.color = 'red';
    } else if (firstNameValidation.test(firstName.value) == false) {
        e.preventDefault();
        firstNameMissing.textContent = 'Format de saisie invalide';
        firstNameMissing.style.color = 'orange';
    } else {
        firstNameMissing.textContent = '';
    }

    const mail = document.getElementById('mail');
    const mailMissing = document.getElementById('mailMissing');
    const mailValidation = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}/;

    if (mail.validity.valueMissing) {
        e.preventDefault();
        mailMissing.textContent = 'Ce champ est obligatoire';
        mailMissing.style.color = 'red';
    } else if (mailValidation.test(mail.value) == false) {
        e.preventDefault();
        mailMissing.textContent = 'Format de saisie invalide';
        mailMissing.style.color = 'orange';
    } else {
        mailMissing.textContent = '';
    }

    const address = document.getElementById('address');
    const addressMissing = document.getElementById('addressMissing');
    const adressValidation = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*/;

    if (address.validity.valueMissing) {
        e.preventDefault();
        addressMissing.textContent = 'Ce champ est obligatoire';
        addressMissing.style.color = 'red';
    } else if (adressValidation.test(address.value) == false) {
        e.preventDefault();
        addressMissing.textContent = 'Format de saisie invalide';
        addressMissing.style.color = 'orange';
    } else {
        addressMissing.textContent = '';
    }

    const zip = document.getElementById('zip');
    const zipMissing = document.getElementById('zipMissing');
    const zipValidation = /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/;
    
    if (zip.validity.valueMissing) {
        e.preventDefault();
        zipMissing.textContent = 'Ce champ est obligatoire';
        zipMissing.style.color = 'red';
    } else if (zipValidation.test(zip.value) == false) {
        e.preventDefault();
        zipMissing.textContent = 'Format de saisie invalide';
        zipMissing.style.color = 'orange';
    } else {
        zipMissing.textContent = '';
    }

    const city = document.getElementById('city');
    const cityMissing = document.getElementById('cityMissing');
    const cityValidation = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?/;

    if (city.validity.valueMissing) {
        e.preventDefault();
        cityMissing.textContent = 'Ce champ est obligatoire';
        cityMissing.style.color = 'red';
    } else if (cityValidation.test(city.value) == false) {
        e.preventDefault();
        cityMissing.textContent = 'Format de saisie invalide';
        cityMissing.style.color = 'orange';
    } else {
        cityMissing.textContent = '';
    }  
}

// Validation de la commande

// Tableau de produits envoyé au serveur contenant l'id des produits à commandés
let products = [];
for (let i=0; i < basket.length; i++) {
    products.push(basket[i].id)
}
  
let orderItems = {
    contact: {},
    products: products,
}

let orderValidation = document.getElementById("formContent");

orderValidation.addEventListener("submit", function (e){
    e.preventDefault();

    //Récupération des champs     
    let firstNameForm = document.getElementById("firstName").value;
    let lastNameForm = document.getElementById("lastName").value;
    let addressForm = document.getElementById("address").value; 
    let cityForm = document.getElementById("city").value;
    let mailForm = document.getElementById("mail").value;

    //Création de l'objet formulaireObjet
    orderItems.contact = {
        firstName: firstNameForm,
        lastName: lastNameForm,  
        address: addressForm,
        city: cityForm,
        email: mailForm
    }    

    //Envoi des données récupérées
    const optionsFetch = {
        headers:{
            'Content-Type': 'application/json',
        },
        method:"POST",
        body: JSON.stringify(orderItems),         
    }   
    
    fetch('http://localhost:3000/api/cameras/order', optionsFetch)
        .then(function(response) {
            return response.json();
        })
        .then(function(number) {
            window.location = `orderConfirmation.html?id=${number.orderId}&prix=${totalCost /100 + ',00 €'}`
        });
    localStorage.clear() 
})


/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */

