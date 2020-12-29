const params = new URLSearchParams(document.location.search);

let priceOrder = document.getElementById("priceOrder");
priceOrder.textContent = params.get('price');

let idOrder = document.getElementById("idOrder");
idOrder.textContent = params.get('id');