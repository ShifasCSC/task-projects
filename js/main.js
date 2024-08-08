document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();

    document.getElementById('search-bar').addEventListener('keyup', searchProducts);
});

let allProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        allProducts = data.products;
        displayProducts(allProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function searchProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" style="max-width: 100%;">
            <h2>${product.title}</h2>
            <p>$${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;

        productList.appendChild(productCard);
    });

    // Attach event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}
function addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart');
    } else {
        alert('Product already in cart');
    }
}

function searchProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(query)
    );

   
    displayProducts(filteredProducts);
}

// 
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" style="max-width: 100%;">
            <h2>${product.title}</h2>
            <p>$${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;

        productCard.addEventListener('click', () => {
            window.location.href = `product-details.html?id=${product.id}`;
        });

        productList.appendChild(productCard);
    });

    // Attach event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}
