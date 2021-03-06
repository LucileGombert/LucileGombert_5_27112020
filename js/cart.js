// Initialise les variables utilisées dans la page "product.js"
let basket =  JSON.parse(localStorage.getItem('basket'));
let totalCost = JSON.parse(localStorage.getItem('totalCost'));
let basketCost = JSON.parse(localStorage.getItem('totalCost'));

// Initialise la variable - Positionne dans la div nommée "cartContainer"
let cartContainer = document.getElementById('cartContainer');

// Affiche la page panier différemment selon que le panier est vide ou non
function displayPageBasket() {
    // Si le panier est vide, affiche "Votre panier est vide !" avec un bouton "Continuer mes achats"
    if (basket == null || basket.length == 0) {
        const basketTitle = document.getElementById('basketTitle');
        basketTitle.innerHTML = 'Votre panier est vide !';

        let basketContent = document.getElementById('basketContent');
        let formContent = document.getElementById('formContent');
        let parent = document.body;
        parent.removeChild(basketContent);
        parent.removeChild(formContent);
    } else { // Si le panier contient des produits, affiche "Votre panier", la liste des produits et le formulaire de commande
        basketTitle.innerHTML = 'Votre panier';

        const div1 = document.getElementById('div1');
        div1.nextElementSibling.remove();  
    }
}


// Affiche les produits contenus dans le panier
function displayBasketItems() {
    // Si le panier contient des produits, il les affiche
    if(basket.length > 0) { 
        for(let product of basket) {
            
            // Crée la div qui contient chaque produit
            const basketItem = document.createElement('div');
            basketItem.setAttribute('class', 'row p-3 align-items-center border-bottom');
            cartContainer.appendChild(basketItem);

            // Crée la div qui contient l'image et le nom du produit
            const basketProductDiv = document.createElement('div');
            basketProductDiv.setAttribute('class', 'col-12 col-md-4 text-center');
            basketItem.appendChild(basketProductDiv);

            // Affiche l'image du produit 
            const basketProductImage = document.createElement('img');
            basketProductImage.setAttribute('src', product.image);
            basketProductImage.setAttribute('class', 'img-fluid');
            basketProductImage.setAttribute('style', 'max-width: 200px');
            basketProductDiv.appendChild(basketProductImage);
            
            // Affiche le nom du produit 
            const basketProductName = document.createElement('p');
            basketProductName.innerHTML = product.name;
            basketProductDiv.appendChild(basketProductName);

            // Affiche le prix du produit 
            const basketProductPrice = document.createElement('p');
            basketProductPrice.setAttribute('class', 'productPrice col-12 col-md-2 m-0 text-center');
            basketProductPrice.innerHTML = product.price /100 + ',00 €';
            basketItem.appendChild(basketProductPrice);
            
            // Affiche la quantité 
            const basketProductQuantity = document.createElement('div');
            basketProductQuantity.setAttribute('class', 'quantity col-6 col-md-3 text-center');
            basketProductQuantity.innerHTML = product.quantity;
            basketItem.appendChild(basketProductQuantity);

            // Affiche le prix total par produit 
            const basketProductTotalPrice = document.createElement('p');
            basketProductTotalPrice.setAttribute('class', 'totalPrice col-6 col-md-2 col-lg-2 text-center m-0');
            basketProductTotalPrice.innerHTML = product.price/100 * product.quantity + ',00 €';
            basketItem.appendChild(basketProductTotalPrice);

            // Affiche le bouton poubelle pour la suppression d'un produit
            const divRemoveButton = document.createElement('div');
            divRemoveButton.setAttribute('class', 'col-12 text-center');
            basketItem.appendChild(divRemoveButton);
            // Crée le bouton poubelle
            const removeButton = document.createElement("button"); 
            removeButton.setAttribute('class', 'removeButton btn bg-pink btn-outline-dark pl-4 pr-4');
            removeButton.setAttribute('data-item', product.id);
            removeButton.innerHTML += (`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>`);
            divRemoveButton.appendChild(removeButton);

            // Affiche le prix total du panier 
            const totalBasketPrice = document.getElementById('totalBasketPrice');
            totalBasketPrice.innerHTML = totalCost /100 + ',00 €';
        }
    }
}


// Supprime un produit du panier
function removeItem() {
    // Récupère le bouton poubelle
    let removeButton = document.querySelectorAll('.removeButton');
    let product = JSON.parse(localStorage.getItem('basket'));

    removeButton.forEach(btn => {
        btn.addEventListener('click', function() {
            let id = this.getAttribute("data-item");        
            // Supprime le produit du panier si l'attribut "id" de la poubelle est identique à celui du produit
            for (let i=0; i < basket.length; i++){
                if (basket[i].id === id){
                    // Supprime le produit du panier
                    basket.splice(i,1);
                    // Met à jour le prix total du panier
                    localStorage.setItem('totalCost', totalCost - (product[i].price*product[i].quantity));
                    // Met à jour le panier dans le local storage
                    localStorage.setItem("basket", JSON.stringify(basket));
                    // Recharge la page
                    window.location.reload();
                }
            }
        });
    })
}


// Vérifie les inputs des utilisateurs lorsqu'ils remplissent le formulaire de commande
function checkInputs() {
    // Récupère le bouton "Commander"
    let submitForm = document.getElementById('orderButton');

    // Valide les champs du formulaire au clic sur le bouton "commander"
    submitForm.addEventListener('click',function(e) {
        const lastName = document.getElementById('lastName');
        const lastNameMissing = document.getElementById('lastNameMissing');
        // Vérifie que le nom comporte seulement les caractères attendus
        const lastNameValidation = /^[a-zA-ZéèêàçîïÉÈÎÏ]{2,}([-'\s][a-zA-ZéèêàçîïÉÈÎÏ]{2,})?/;

        // Si le champ "Nom" est vide ou s'il ne respecte pas la regex, un message d'erreur s'affiche et bloque l'envoi du formulaire
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
        // Vérifie que le prénom comporte seulement les caractères attendus
        const firstNameValidation = /^[a-zA-ZéèêàçîïÉÈÎÏ]{2,}([-'\s][a-zA-ZéèêàçîïÉÈÎÏ]{2,})?/;
        
        // Si le champ "Prénom" est vide ou s'il ne respecte pas la regex, un message d'erreur s'affiche et bloque l'envoi du formulaire
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
        // Vérifie que le mail comporte seulement les caractères attendus
        const mailValidation = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}/;

        // Si le champ "Mail" est vide ou s'il ne respecte pas la regex, un message d'erreur s'affiche et bloque l'envoi du formulaire
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
        // Vérifie que l'adresse comporte seulement les caractères attendus
        const adressValidation = /^[0-9]{0,10}[-'\s]*[a-zA-Zàâäéèêëïîôöùûüç]{2,}/;
    
        // Si le champ "Adresse" est vide ou s'il ne respecte pas la regex, un message d'erreur s'affiche et bloque l'envoi du formulaire
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
        // Vérifie que le code postal comporte seulement les caractères attendus
        const zipValidation = /^[1-9]{1}[0-9]{4}/;

        // Si le champ "Code postal" est vide ou s'il ne respecte pas la regex, un message d'erreur s'affiche et bloque l'envoi du formulaire
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
        // Vérifie que la ville comporte seulement les caractères attendus
        const cityValidation = /^[a-zA-ZéèêàçîïÉÈÎÏ]{2,}([-'\s][a-zA-ZéèêàçîïÉÈÎÏ]{2,})?/;

        // Si le champ "Ville" est vide ou s'il ne respecte pas la regex, un message d'erreur s'affiche et bloque l'envoi du formulaire
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
    });
}


// Valide la commande et affiche la page de confirmation de commande
function validateOrder() {
    let orderValidation = document.getElementById("formContent");

    orderValidation.addEventListener("submit", function (e){
        e.preventDefault();

        // Récupère les champs du formulaire     
        let firstNameForm = document.getElementById("firstName").value;
        let lastNameForm = document.getElementById("lastName").value;
        let addressForm = document.getElementById("address").value; 
        let cityForm = document.getElementById("city").value;
        let mailForm = document.getElementById("mail").value;

        // Tableau de produits envoyé au serveur contenant l'id des produits commandés
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
        
        // Envoi la requête post au serveur
        fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderContent),
            })

            // Récupère une réponse au format json
            .then(function(response) {
                return response.json();
            })

            // Affiche le résultat sur la page "orderConfirmation.html"
            .then(function(result) {
                window.location.href = `orderConfirmation.html?price=${totalCost /100 + ',00 €'}&id=${result.orderId}`
            });
        // Vide le local storage
        localStorage.clear() 
    });
}


displayPageBasket();
displayBasketItems();
removeItem();
checkInputs();
validateOrder();
