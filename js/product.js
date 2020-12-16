// Initialise les constantes - Récupère l'id d'un produit
const params = new URLSearchParams(document.location.search);
const id = params.get("id");

const product = document.getElementById("product");

// Appelle de l'API
fetch("http://localhost:3000/api/cameras/" + id)
    
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
    productImgDiv.setAttribute('class', 'col col-lg-6 m-0');
    
    // Affiche l'image du produit
    const productImg = document.createElement('img');
    productImg.setAttribute('src', product.imageUrl);
    productImg.setAttribute('class', 'rounded img-fluid');
    productImg.setAttribute('style', 'max-width: 400px');
    productImgDiv.appendChild(productImg);

    // Crée une div pour la description du produit 
    const productDescDiv = document.createElement('div');
    productDescDiv.setAttribute('class', 'col-12 col-lg-6 m-0');

    // Affiche le nom du produit    
    const productName = document.createElement('h3');
    productName.setAttribute('class', 'name card-title pt-2');
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
    
    // Affiche la description du produit
    const productPrice = document.createElement('p');
    productPrice.setAttribute('class', 'price pt-4');
    productPrice.innerHTML = product.price /100 + ' €';
    productDescDiv.appendChild(productPrice);          

    // Insère les div "productImgDiv" et "productDescDiv" dans la div nommée "product"
    document.getElementById('product').appendChild(productImgDiv);
    document.getElementById('product').appendChild(productDescDiv);

    // Récupère le bouton "Ajouter au panier" créé dans product.html    
    const btn = document.querySelector('#addToCart'); 

    // Regroupe les valeurs qui seront stockées dans le local storage
    const products = [
        product._id,
        product.imageUrl,
        product.name,
        product.lenses,
        product.price,
    ];

    // Stocke les données dans le local storage
    // btn.addEventListener('click', () => { 
    //     localStorage.setItem(product.name, JSON.stringify(products));
    //     console.log('added to cart');
    // });


    btn.addEventListener('click', () => {
        cartProducts();
    })
    
    function cartProducts() {
        let productNumbers = localStorage.setItem(product.name, JSON.stringify(products));
        

        productNumbers = parseInt(productNumbers);
        
        // Ajoute un produit à celui qui est déjà dans le panier, sinon ajoute simplement un produit au panier
        if(productNumbers) {
            localStorage.setItem(product.name, productNumbers + 1);
        } else {
            localStorage.setItem(product.name, 1);
        }
        
        
    }






};





