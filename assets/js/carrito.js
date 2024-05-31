// script.js
document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productCards = document.getElementById('productCards');
    const cartItems = document.getElementById('cartItems');
    let cart = [];

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const productName = productNameInput.value;
        const productPrice = productPriceInput.value;
        
        const product = {
            name: productName,
            price: productPrice
        };
        
        addProductCard(product);
        productForm.reset();
    });

    function addProductCard(product) {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-primary add-to-cart">Agregar al Carrito</button>
                </div>
            </div>
        `;
        productCards.appendChild(card);
        
        const addToCartButton = card.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => {
            addToCart(product);
        });
    }

    function addToCart(product) {
        cart.push(product);
        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        cart.forEach((product, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'col-12 mb-2';
            cartItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price}</p>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
});