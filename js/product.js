// Initialise les constantes - Récupère l'id d'un produit
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const product = document.getElementById('product');

// Appelle l'API
fetch('http://localhost:3000/api/cameras/' + id)
    
    // Récupère une réponse au format json
    .then(function (response) {
        return response.json();
    })
    
    // Récupère un produit
    .then(function(item) {
        displayItem(item);
    });


// Affiche le contenu de la carte produit dans le code HTMl
function displayItem(product) {

    // Crée une div pour l'image du produit 
    const productImgDiv = document.createElement('div');
    productImgDiv.setAttribute('class', 'card border-0 col-sm-8 col-lg-6 m-0 productImgDiv');
    
    // Affiche l'image du produit
    const productImg = document.createElement('img');
    productImg.setAttribute('src', product.imageUrl);
    productImg.setAttribute('class', 'rounded img-fluid productImg');
    productImg.setAttribute('style', 'max-width: 400px');
    productImgDiv.appendChild(productImg);

    // Crée une div pour la description du produit 
    const productDescDiv = document.createElement('div');
    productDescDiv.setAttribute('class', 'col-sm-8 col-lg-6 m-0 pt-4');

    // Affiche le nom du produit    
    const productName = document.createElement('h1');
    productName.setAttribute('class', 'name h3 card-title pt-2');
    productName.innerHTML = product.name;
    productDescDiv.appendChild(productName);

    // Affiche la description du produit
    const productDescription = document.createElement('p');
    productDescription.innerHTML = product.description;
    productDescDiv.appendChild(productDescription);
    
    // Affiche les lentilles à choisir pour un produit
    const productLenses = document.createElement('label');
    productLenses.innerHTML = 'Options : ';
    productDescDiv.appendChild(productLenses); 

    // Crée un champ de sélection pour choisir les options 
    const productLensesSelect = document.createElement('select'); 
    productLenses.appendChild(productLensesSelect); 

    // Affiche l'option par défaut pour le choix de la lentille
    const productLensesOption = document.createElement('option'); 
    productLensesOption.innerHTML = 'Veuillez choisir une lentille';
    productLensesSelect.appendChild(productLensesOption);

    // Affiche les options pour le choix de la lentille
    for (let i = 0; i < product.lenses.length; i++ ){
        const optionLenses = document.createElement('option');
        optionLenses.setAttribute('value', product.lenses[i]);
        optionLenses.innerHTML = product.lenses[i];
        productLensesSelect.appendChild(optionLenses);
    }
  
    // Affiche le prix du produit
    const productPrice = document.createElement('p');
    productPrice.setAttribute('class', 'price pt-4');
    productPrice.innerHTML = product.price /100 + ',00 €';
    productDescDiv.appendChild(productPrice);          

    // Insère les div "productImgDiv" et "productDescDiv" dans la div nommée "product"
    document.getElementById('product').appendChild(productImgDiv);
    document.getElementById('product').appendChild(productDescDiv);

    // Récupère le bouton "Ajouter au panier" créé dans product.html    
    const btn = document.querySelector('#addToCart'); 

    btn.addEventListener('click', () => {
        addToCart(product)
        totalCost(product);
    });
}


// Ajoute les articles au panier
function addToCart(product) {

    // Initialise le tableau produits
    let products = [];

    // Si le panier ne contient aucun élément, ajout du premier produit, sinon ajoute un nouveau produit à ceux du panier
    if(!localStorage.getItem('basket')) {
        products.push({
            id: product._id,
            image: product.imageUrl,
            name: product.name,
            price: product.price,
            quantity: 1,
        }); 
        localStorage.setItem('basket', JSON.stringify(products)); 
    } else {
        products =  JSON.parse(localStorage.getItem('basket'))
        let exist = false;

        // Vérifie pour chaque élément du tableau produits que l'élément existe déjà, si c'est le cas ajout de 1 à la quantité du produit 
        products.forEach(element => {
            if(element.id == product._id) {
                element.quantity ++;
                exist = true;
            }
        }); 

        // Ajoute un produit différent au panier
        if(!exist) {
            products.push({
                id: product._id,
                image: product.imageUrl,
                name: product.name,
                price: product.price,
                quantity: 1,
            }); 
        }

        // Met à jour le panier
        localStorage.setItem('basket', JSON.stringify(products));
    }        
}


// Calcule le prix total du panier
function totalCost(product) {
    let basketCost = localStorage.getItem('totalCost');
    
    // Si le prix total du panier n'est pas nul, ajoute le prix du produit à celui du panier
    if(basketCost != null) {
        basketCost = parseInt(basketCost);
        localStorage.setItem('totalCost', basketCost + product.price);
        
    } else {
        // Sinon le prix total du panier correspond au prix du produit
        localStorage.setItem('totalCost', product.price);
    }
}
