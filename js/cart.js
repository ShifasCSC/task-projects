document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});

async function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');

    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        const products = data.products.filter(product => cart.includes(product.id.toString()));

        products.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.className = 'product-card'; // Reuse the same card styling

            cartItem.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}" style="max-width: 100%;">
                <h2>${product.title}</h2>
                <p>$${product.price}</p>
                <button class="remove-from-cart-btn" data-id="${product.id}">Remove from Cart</button>
            `;

            cartList.appendChild(cartItem);
        });

        // Attach event listeners to "Remove from Cart" buttons
        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart-btn');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function removeFromCart(event) {
    const productId = event.target.getAttribute('data-id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(id => id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}
