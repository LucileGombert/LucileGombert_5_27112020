const products = document.getElementById("products");

// Appel de l'API
fetch("http://localhost:3000/api/cameras")
    // Permet de récupérer une réponse au format json
    .then(function (response) {
        return response.json();
    })
    // Permet d'accéder aux produits
    .then(function(items) {
        displayItems(items);
    });

// Affiche le contenu de chaque carte produit dans le code HTMl
function displayItems(products) {
    products.forEach(product => { // remplace le i de for (let i = 0; i < products.length; i++)
        console.log(product);
        
        const productCard = document.createElement('div');
        productCard.setAttribute('id', product._id);
        productCard.setAttribute('class', 'card p-3 m-3');

        const productImg = document.createElement('img');
        productImg.setAttribute('src', product.imageUrl);
        productImg.setAttribute('class', 'img-fluid');
        productImg.setAttribute('style', 'max-width: 400px');
        productCard.appendChild(productImg);

        const productName = document.createElement('h3');
        productName.setAttribute('class', 'name card-title pt-2');
        productName.innerHTML = product.name;
        productCard.appendChild(productName);

        const productPrice = document.createElement('p');
        productPrice.setAttribute('class', 'price');
        productPrice.innerHTML = product.price.toFixed(2) /100 + ' €';
        productCard.appendChild(productPrice);          

        const productLink = document.createElement('a');
        productLink.setAttribute('href', 'product.html?id=' + product._id);
        productLink.setAttribute('class', 'link btn bg-pink btn-outline-dark');
        productLink.innerHTML = 'Voir plus ➔ ';
        productCard.appendChild(productLink);   

        document.getElementById('products').appendChild(productCard);
    });
};

const link = document.querySelector('.btn');

link.addEventListener('click', fenetre);

function fenetre() {
    window.open('http://product.html', '_blank');
}