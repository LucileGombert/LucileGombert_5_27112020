// Initialisation des constantes - Permet de récupérer l'id d'un produit
const params = new URLSearchParams(document.location.search);
const id = params.get("id");

const product = document.getElementById("product");

// Appel de l'API
fetch("http://localhost:3000/api/cameras/" + id)
    // Permet de récupérer une réponse au format json
    .then(function (response) {
        return response.json();
    })
    // Permet de récupérer un produit
    .then(function(item) {
        displayItem(item);
    });

// Affiche le contenu de la carte produit dans le code HTMl
function displayItem(product) {
    console.log(product);
    
    
    // const productCard = document.createElement('div');
    // productCard.setAttribute('class', 'p-3 m-3');

    const productImgDiv = document.createElement('div');
    productImgDiv.setAttribute('class', 'col col-lg-6 m-0');
    // productCard.appendChild(productImgDiv);

    const productImg = document.createElement('img');
    productImg.setAttribute('src', product.imageUrl);
    productImg.setAttribute('class', 'rounded img-fluid');
    productImg.setAttribute('style', 'max-width: 400px');
    productImgDiv.appendChild(productImg);

    const productDescDiv = document.createElement('div');
    productDescDiv.setAttribute('class', 'col-12 col-lg-6 m-0');
    // productCard.appendChild(productDescDiv);

    const productName = document.createElement('h3');
    productName.setAttribute('class', 'name card-title pt-2');
    productName.innerHTML = product.name;
    productDescDiv.appendChild(productName);

    const productDescription = document.createElement('p');
    productDescription.innerHTML = product.description;
    productDescDiv.appendChild(productDescription);
    
    const productLenses = document.createElement('label');
    productLenses.innerHTML = 'Options : ';
    productDescDiv.appendChild(productLenses); 

    const productLensesSelect = document.createElement('select'); // Permet de créer un champ de sélection
    productLenses.appendChild(productLensesSelect); 

    const productLensesOption = document.createElement('option'); // Permet de créer des options
    productLensesOption.innerHTML = 'Veuillez choisir une lentille';
    productLensesSelect.appendChild(productLensesOption);

    for (let i = 0; i < product.lenses.length; i++ ){
        const optionLenses = document.createElement('option');
        optionLenses.setAttribute('value', product.lenses[i]);
        optionLenses.innerHTML = product.lenses[i];
        productLensesSelect.appendChild(optionLenses);
    }

    const productPrice = document.createElement('p');
    productPrice.setAttribute('class', 'price pt-4');
    productPrice.innerHTML = product.price /100 + ' €';
    productDescDiv.appendChild(productPrice);          

    document.getElementById('product').appendChild(productImgDiv);
    document.getElementById('product').appendChild(productDescDiv);

    // const btn = document.createElement("button"); 
    // btn.setAttribute('class', 'btn bg-pink p-2 mt-3 btn-outline-dark');
    // btn.innerHTML = "Ajouter au panier  ";
    // btn.innerHTML += (`<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cart-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    // <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
    // <path fill-rule="evenodd" d="M8.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 .5-.5z"/>
    // </svg>`);
    // productDescDiv.appendChild(btn);

    // Permet de récupérer le bouton créé dans product.html
    const btn = document.querySelector('#addToCart')

    

    const article = [
        product._id,
        product.name,
        product.price,
        product.imageUrl,
    ];
    // Permet de stocker les données dans le local storage
    btn.addEventListener('click', () => {
        localStorage.setItem(product.name, JSON.stringify(article));
        // alert('Le produit a été ajouté au panier !');
    });
};





