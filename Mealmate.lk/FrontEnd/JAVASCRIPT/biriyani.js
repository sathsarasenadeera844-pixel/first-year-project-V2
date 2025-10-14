function increaseQuantity(btn) {
    const quantitySpan = btn.previousElementSibling;
    let quantity = parseInt(quantitySpan.textContent);
    quantitySpan.textContent = quantity + 1;
}

function decreaseQuantity(btn) {
    const quantitySpan = btn.nextElementSibling;
    let quantity = parseInt(quantitySpan.textContent);
    if (quantity > 0) {
        quantitySpan.textContent = quantity - 1;
    }
}

function addToCart(productName) {
    alert(`${productName} added to cart!`);
}

function buyNow(productName) {
    alert(`Proceeding to buy ${productName}!`);
}

function showAlert(action) {
    alert(`${action} clicked!`);
}