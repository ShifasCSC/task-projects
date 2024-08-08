document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (productId) {
        fetchProductDetails(productId);
    }
});

async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

function displayProductDetails(product) {
    const productDetails = document.getElementById('product-details');
    const breadcrumbTitle = document.getElementById('product-title-breadcrumb');
    breadcrumbTitle.textContent = product.title;

    productDetails.innerHTML = `
        <div class="product-detail-card">
            <div class="product-image">
                <img src="${product.thumbnail}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p class="price">$${product.price}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;

    // Attach event listener to "Add to Cart" button
    document.querySelector('.add-to-cart-btn').addEventListener('click', addToCart);
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
