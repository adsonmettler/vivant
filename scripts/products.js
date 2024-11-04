// Load products from JSON
const products = [
    {
        "name": "Classic Pro-Support",
        "price": "$79.99",
        "image": "images/vivant-gray-shoes-1.png"
    },
    {
        "name": "Safe White",
        "price": "$69.99",
        "image": "images/vivant-white-shoes-2.png"
    },
    {
        "name": "Dark Blue Confort",
        "price": "$89.99",
        "image": "images/vivant-black-shoes-1.png"
    },
    {
        "name": "Classic Pro-Support",
        "price": "$84.99",
        "image": "images/vivant-blue-shoes-1.png"
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

        const name = document.createElement('h3');
        name.textContent = product.name;

        const price = document.createElement('p');
        price.textContent = product.price;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        
        // Add click event to open modal
        card.addEventListener('click', () => openModal(product.name, product.price, product.image));


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
    
    // Update the image source in the modal
    document.getElementById('modalProductImage').src = productImage;
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



// Close modal when clicking close button or outside modal
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('messageModal').style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('messageModal')) {
        document.getElementById('messageModal').style.display = 'none';
    }
});


// Scroll functionality and button visibility management
const scrollLeftButton = document.getElementById('scrollLeft');
const scrollRightButton = document.getElementById('scrollRight');
const scrollAmount = 300; // Amount to scroll with each button click

// Initially hide the left scroll button
scrollLeftButton.style.display = 'none';

// Event listener for right button click
scrollRightButton.addEventListener('click', () => {
    productCardsContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

// Event listener for left button click
scrollLeftButton.addEventListener('click', () => {
    productCardsContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});

// Event listener to check scroll position and toggle buttons
productCardsContainer.addEventListener('scroll', () => {
    if (productCardsContainer.scrollLeft > 0) {
        scrollLeftButton.style.display = 'block';
    } else {
        scrollLeftButton.style.display = 'none';
    }

    // Check if scrolled to the end
    if (productCardsContainer.scrollLeft + productCardsContainer.clientWidth >= productCardsContainer.scrollWidth) {
        scrollRightButton.style.display = 'none';
    } else {
        scrollRightButton.style.display = 'block';
    }
});





// Create product cards on page load
createProductCards();

// Close modal on outside click
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
