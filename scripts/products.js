// Author: Adson Mettler do Nascimento

document.addEventListener("DOMContentLoaded", () => {
    // Function to fetch and display products
    async function fetchProducts() {
        try {
            const response = await fetch('data/products.json'); // Ensure the path is correct
            const products = await response.json();

            const productCardsContainer = document.getElementById("product-cards");

            // Loop through each product and create a card
            products.forEach(product => {
                const card = document.createElement("div");
                card.className = "card";

                // Create a unique ID for each product to use later
                const productId = product.name.replace(/\s+/g, '-').toLowerCase();

                // Construct the HTML for the product card
                card.innerHTML = `
                    <img src="${product.colors[0].image}" alt="${product.name}" class="product-image" id="${productId}-image">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-price">${product.price}</p>
                    <p class="product-description">${product.description}</p>
                    <label for="${productId}-size">Size:</label>
                    <select id="${productId}-size">
                        ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                    </select>
                    <label for="${productId}-color">Color:</label>
                    <select id="${productId}-color" onchange="updateShoeImage('${productId}')">
                        ${product.colors.map(color => `<option value="${color.color}">${color.color}</option>`).join('')}
                    </select>
                    <button class="cta-button">Add to bag</button>
                `;

                // Add click event to the "Write a Message" button
                const messageButton = card.querySelector(".cta-button");
                messageButton.addEventListener("click", () => {
                    openModal();
                });

                productCardsContainer.appendChild(card);
            });

            // Start observing each card once they are added to the DOM
            observeProductCards();

        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    }

    // Function to update shoe image based on selected color
    window.updateShoeImage = function(productId) {
        const product = products.find(p => p.name.replace(/\s+/g, '-').toLowerCase() === productId);
        const selectedColor = document.getElementById(`${productId}-color`).value;
        const colorInfo = product.colors.find(c => c.color === selectedColor);
        const shoeImageElement = document.getElementById(`${productId}-image`);

        if (colorInfo) {
            shoeImageElement.src = colorInfo.image; // Change the image source
        }
    };

    // Modal handling (same as before)
    const modal = document.getElementById("messageModal");
    const thankYouModal = document.getElementById("thankYouModal");
    const closeButton = document.querySelector(".close-button");
    const closeThankYouButton = document.getElementById("closeThankYouModal");
    const goBackButton = document.getElementById("goBackButton");

    function openModal() {
        modal.style.display = "block";
    }

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    closeThankYouButton.addEventListener("click", () => {
        thankYouModal.style.display = "none";
    });

    goBackButton.addEventListener("click", () => {
        thankYouModal.style.display = "none";
        modal.style.display = "block"; // Optionally reopen the message modal
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        } else if (event.target == thankYouModal) {
            thankYouModal.style.display = "none";
        }
    };

    // Handle form submission (same as before)
    const sendButton = document.getElementById("sendApplication");
    sendButton.addEventListener("click", () => {
        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("messageText").value;

        if (fullName && email && message) {
            console.log("Full Name:", fullName);
            console.log("Email:", email);
            console.log("Message:", message);

            // Save data to LocalStorage instead of sending it to a server
            const messageData = { fullName, email, message };
            localStorage.setItem("productMessageData", JSON.stringify(messageData));

            // Show thank you modal after submission
            modal.style.display = "none"; // Close the message modal
            thankYouModal.style.display = "block"; // Show thank you modal

            // Clear input fields
            document.getElementById("fullName").value = "";
            document.getElementById("email").value = "";
            document.getElementById("messageText").value = "";
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Observer setup for scroll animations (same as before)
    function observeProductCards() {
        const cards = document.querySelectorAll(".card");

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Stop observing once in view
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the card is visible
        });

        cards.forEach(card => observer.observe(card));
    }

    fetchProducts();
});
