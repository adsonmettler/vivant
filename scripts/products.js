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

                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-role">${product.job_role}</p>
                    <p class="product-company"><strong>At ${product.company}</strong></p>
                    <p class="product-field"><strong>Field:</strong> ${product.professional_field}</p>
                    <p class="product-university"><strong>University:</strong> ${product.university}</p>
                    <p class="product-location"><strong>Location:</strong> ${product.location}</p>
                    <button class="cta-button">Write a Message</button>
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

    // Modal handling
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

    // Handle form submission
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

    // Observer setup for scroll animations
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
