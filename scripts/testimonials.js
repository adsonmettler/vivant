document.addEventListener("DOMContentLoaded", () => {
    const testimonialContainer = document.getElementById("testimonialContainer");

    // Fetching the JSON data
    fetch('data/product_reviews.json')
        .then(response => response.json())
        .then(data => {
            const reviews = data.product_reviews;
            
            reviews.forEach(review => {
                // Create a div for each review
                const reviewDiv = document.createElement("div");
                reviewDiv.classList.add("testimonial");

                // Create and append the image
                const img = document.createElement("img");
                img.src = review.image_url;
                img.alt = `${review.name}'s photo`;
                img.style.width = "80px";
                img.style.height = "80px";
                reviewDiv.appendChild(img);

                // Create a div for text content to organize better
                const textContentDiv = document.createElement("div");

                // Create and append the star rating first
                const ratingDiv = document.createElement("div");
                ratingDiv.classList.add("rating");
                for (let i = 1; i <= 5; i++) {
                    const star = document.createElement("span");
                    star.classList.add("star");
                    star.textContent = i <= review.rating ? "★" : "☆";
                    ratingDiv.appendChild(star);
                }
                textContentDiv.appendChild(ratingDiv);

                // Create and append the name and profession
                const nameHeader = document.createElement("h2");
                nameHeader.textContent = `${review.name}, ${review.profession}`;
                textContentDiv.appendChild(nameHeader);

                // Create and append the review note (comment) last
                const reviewPara = document.createElement("p");
                reviewPara.textContent = `“${review.review_note}”`;
                textContentDiv.appendChild(reviewPara);

                // Append the text content div to the main review div
                reviewDiv.appendChild(textContentDiv);

                // Append each review to the container
                testimonialContainer.appendChild(reviewDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching the product reviews:', error);
        });
});
