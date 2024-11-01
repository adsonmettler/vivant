// Load products from JSON
const products = [
    {
        "name": "Classic Pro-Support",
        "price": "$79.99",
        "image": "images/vivant-gray-shoes-1.png"
    },
    {
        "name": "Sleek White Sneakers",
        "price": "$69.99",
        "image": "images/vivant-white-shoes-2.png"
    },
    {
        "name": "Cool Green",
        "price": "$84.99",
        "image": "images/vivant-blue-shoes-1.png"
    },
    {
        "name": "Black Runner",
        "price": "$89.99",
        "image": "images/vivant-black-shoes-1.png"
    },
    {
        "name": "Casual Everyday",
        "price": "$74.99",
        "image": "images/vivant-green-shoes.png"
    }
];

const productCardsContainer = document.getElementById('product-cards');

// Function to create product cards
function createProductCards() {
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const name = document.createElement('p');
        name.textContent = product.name;

        const price = document.createElement('p');
        price.textContent = product.price;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        
        // Add click event to open modal
        card.addEventListener('click', () => openModal(product.name, product.price));

        productCardsContainer.appendChild(card);
    });
}

// Modal functionalities
const modal = document.getElementById('messageModal');
const closeButton = document.querySelector('.close-button');

function openModal(productName, productPrice, productImage) {
    const priceValue = parseFloat(productPrice.replace(/[$,]/g, '')); // Convert price string to number
    const discount = (priceValue * 0.2).toFixed(2); // Calculate 20% discount
    const discountedPrice = (priceValue - discount).toFixed(2); // Calculate discounted price

    modal.style.display = 'block';
    modal.querySelector('h2').textContent = `Save 20% on your ${productName}!`;
    modal.querySelector('#modalDiscountText').textContent = `Get a discount of $${discount}. You get this product for a total of $${discountedPrice}.`;
    document.getElementById('modalProductImage').src = productImage; // Set product image in modal
}


closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Event listener for product images
document.querySelectorAll('.product-card img').forEach((image, index) => {
    image.addEventListener('click', () => {
        const product = products[index]; // Assuming 'products' is the JSON array
        openModal(product);
    });
});

// Function to open modal with specific product data
function openModal(product) {
    const modal = document.getElementById('messageModal');
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalDiscountText').textContent = `Get a discount of ${product.discountedPrice}. You get this product for a total of ${product.finalPrice}.`;
    modal.style.display = 'flex';
}

// Close modal when clicking close button or outside modal
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('messageModal').style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('messageModal')) {
        document.getElementById('messageModal').style.display = 'none';
    }
});


// Scroll functionality
const scrollLeftButton = document.getElementById('scrollLeft');
const scrollRightButton = document.getElementById('scrollRight');



scrollLeftButton.addEventListener('click', () => {
    productCardsContainer.scrollBy({ left: -cardWidth, behavior: 'smooth' });
});

scrollRightButton.addEventListener('click', () => {
    productCardsContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
});



// Create product cards on page load
createProductCards();

// Close modal on outside click
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
