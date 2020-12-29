// Initialise la constante - Positionne dans la div nommée "cartContainer"
// let basket = document.getElementById('cartContainer');
let affichagePanier = document.getElementById('cartContainer');

let basket =  JSON.parse(localStorage.getItem('basket'));
let totalCost = JSON.parse(localStorage.getItem('totalCost'));


// Si le panier est vide, affiche 'Votre panier est vide !', sinon affiche 'Votre panier'
if (basket == null || basket.length == 0) {
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
        basketProductQuantity.setAttribute('class', 'quantity col-md-2 col-lg-3 text-center');
        // basketProductQuantity.innerHTML = product.quantity;  
        basketProductQuantity.innerHTML += (`<button class="minus disabled btn bg-pink btn-outline-dark">-</button>
                                            <input id="quantity" class=" border p-2 col-3" type="text" value="${product.quantity}"</input>
                                            <button class="plus btn bg-pink btn-outline-dark">+</button>`)
        basketItem.appendChild(basketProductQuantity);

        let totalPrice = document.getElementsByClassName('totalPrice');
        totalPrice = product.price/100 * product.quantity;

        const basketProducttotalPrice = document.createElement('p');
        basketProducttotalPrice.setAttribute('class', 'totalPrice col-lg-2 text-center');
        basketProducttotalPrice.innerHTML = totalPrice + ',00 €';
        basketItem.appendChild(basketProducttotalPrice);

        // Bouton de suppression d'un produit du panier
        const divRemoveButton = document.createElement('div');
        basketItem.appendChild(divRemoveButton);

        const removeButton = document.createElement("button"); 
        removeButton.setAttribute('class', 'btn bg-pink btn-outline-dark removeButton');
        removeButton.setAttribute('data-item', product.id);
        removeButton.innerHTML += (`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>`);
        divRemoveButton.appendChild(removeButton);

        
        
        // removeButton.addEventListener('click', function() {
        //     let id = this.getAttribute("data-item");
        //     console.log("id poubelle", id);
        // });   

        const totalBasketPrice = document.getElementById('totalBasketPrice');
        totalBasketPrice.innerHTML = totalCost /100 + ',00 €';

        
    }
}

// Modifie la quantité de produit 
let valueCount;

document.querySelector('.plus').addEventListener('click', function() {
    valueCount = document.getElementById('quantity').value;
    valueCount++;
    document.getElementById('quantity').value = valueCount;

    if(valueCount > 1) {
        document.querySelector('.minus').removeAttribute('disabled');
        document.querySelector('.minus').classList.remove('disabled');
    }
    localStorage.setItem("basket", JSON.stringify(basket));
})

document.querySelector('.minus').addEventListener('click', function() {
    valueCount = document.getElementById('quantity').value;
    valueCount--;
    document.getElementById('quantity').value = valueCount;

    if(valueCount == 1) {
        document.querySelector('.minus').setAttribute('disabled','disabled');
    }
})

// Supprime un produit du panier
let removeButton = document.querySelector('.removeButton');
removeButton.addEventListener('click', function() {
    let id = this.getAttribute("data-item");
    console.log("id poubelle", id);

    for (let i=0; i !=basket.length; i++){
        if (basket[i].id === id){
            basket.splice(i,1);
            break;
        }
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    window.location.href = "cart.html";
}); 

// Formulaire de commande
const submitForm = document.getElementById('orderButton');

submitForm.addEventListener('click',formValidation);

function formValidation(e) {
    const lastName = document.getElementById('lastName');
    const lastNameMissing = document.getElementById('lastNameMissing');
    const lastNameValidation = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?/i;

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
    const firstNameValidation = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?/i;

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
    const adressValidation = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*/i;

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
    const cityValidation = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?/i;

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
let orderValidation = document.getElementById("formContent");

orderValidation.addEventListener("submit", function (e){
    e.preventDefault();

    // Récupère les champs du formulaire     
    let firstNameForm = document.getElementById("firstName").value;
    let lastNameForm = document.getElementById("lastName").value;
    let addressForm = document.getElementById("address").value; 
    let cityForm = document.getElementById("city").value;
    let mailForm = document.getElementById("mail").value;

    // Tableau de produits envoyé au serveur contenant l'id des produits à commandés
    let products = [];
    for (let i=0; i < basket.length; i++) {
        products.push(basket[i].id)
    }

    // Contient l'objet contact et le tableau produits envoyés au serveur
    let orderContent = {
        contact: {
            firstName: firstNameForm,
            lastName: lastNameForm,  
            address: addressForm,
            city: cityForm,
            email: mailForm
        },
        products: products,
    }
         
    fetch("http://localhost:3000/api/cameras/order", {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderContent),
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            window.location.href = `orderConfirmation.html?id=${result.orderId}&price=${totalCost /100 + ',00 €'}`
        });
        
    localStorage.clear() 
})
