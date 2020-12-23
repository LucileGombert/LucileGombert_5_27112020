// Initialise la constante - Positionne dans la div nommée "cartContainer"
// let basket = document.getElementById('cartContainer');
let affichagePanier = document.getElementById('cartContainer');

let basket =  JSON.parse(localStorage.getItem('basket'));
let totalCost = JSON.parse(localStorage.getItem('totalCost'));


// Si le panier est vide, affiche 'Votre panier est vide !', sinon affiche autre chose
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
        basketProductQuantity.innerHTML += (`<span class="minus btn bg-pink btn-outline-dark">-</span>
                                            <input class="quantity p-2 col-3" type="text" value="${product.quantity}"/>
                                            <span class="plus btn bg-pink btn-outline-dark">+</span>`)
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
        removeButton.setAttribute('class', 'btn bg-pink btn-outline-dark');
        removeButton.innerHTML += (`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>`);
        divRemoveButton.appendChild(removeButton);

        removeButton.addEventListener('click',removeProduct);
        function removeProduct(event) {
            let removeProduct = event.target
            removeProduct.parentElement.parentElement.remove()
        }
        localStorage.setItem("basket", JSON.stringify(basket));

        const totalBasketPrice = document.getElementById('totalBasketPrice');
        totalBasketPrice.innerHTML = totalCost /100 + ',00 €';
    }
}

// Formulaire de commande
const submit = document.getElementById('orderButton');

submit.addEventListener('click',formValidation);

function formValidation(e) {
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
    
}



// const mail = document.getElementById('mail');
// const mailMissing = document.getElementById('mailMissing');
// const mailValidation = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}/;

// const address = document.getElementById('address');
// const addressMissing = document.getElementById('addressMissing');

// const zip = document.getElementById('zip');
// const zipMissing = document.getElementById('zipMissing');

// const city = document.getElementById('city');
// const cityMissing = document.getElementById('cityMissing');

$(document).ready(function() {
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
});

