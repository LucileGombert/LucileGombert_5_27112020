const products = document.getElementById("products");
fetch("http://localhost:3000/api/cameras")
    .then(function (response) {
        return response.json();

    })
    .then(function(items) {
        displayItems(items)
        
    });

function displayItems(products) {
        products.forEach(product => {
                console.log(product);
    
                const productCard = document.createElement('div');
                productCard.setAttribute('id', product._id);
                productCard.setAttribute('class', 'card p-3 m-3');
    
                const productName = document.createElement('h3');
                productName.setAttribute('class', 'name');
                productName.innerHTML = product.name;
                productCard.appendChild(productName);
    
                const productImg = document.createElement('img');
                productImg.setAttribute('src', product.imageUrl);
                productImg.setAttribute('style', 'width: 500px;');
                productCard.appendChild(productImg);
    
                const productDescription = document.createElement('p');
                productDescription.setAttribute('class', 'description');
                productDescription.innerHTML = product.description;
                productCard.appendChild(productDescription);
    
                const productLenses = document.createElement('p');
                productLenses.setAttribute('class', 'lenses');
                productLenses.innerHTML = product.lenses;
                productCard.appendChild(productLenses);
    
                const productPrice = document.createElement('p');
                productPrice.setAttribute('class', 'price');
                productPrice.innerHTML = product.price.toFixed(2) + ' €';
                productCard.appendChild(productPrice);          
    
                document.getElementById('products').appendChild(productCard);
        });
};