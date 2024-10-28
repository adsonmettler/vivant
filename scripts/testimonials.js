document.addEventListener("DOMContentLoaded", () => {
    const testimonialContainer = document.getElementById("testimonialContainer");

    // Fetching the JSON data
    fetch('data/testimonials.json')
        .then(response => response.json())
        .then(data => {
            const testimonials = data.testimonials;
            
            testimonials.forEach(testimonial => {
                // Create a div for each testimonial
                const testimonialDiv = document.createElement("div");
                testimonialDiv.classList.add("testimonial");

                // Create and append the image
                const img = document.createElement("img");
                img.src = testimonial.image_url;
                img.alt = `${testimonial.name}'s photo`;
                img.style.width = "80px";
                img.style.height = "80px";
                testimonialDiv.appendChild(img);

                // Create a div for text content to organize better
                const textContentDiv = document.createElement("div");

                // Create and append the testimonial note
                const testimonialPara = document.createElement("p");
                testimonialPara.textContent = `“${testimonial.testimonial_note}”`;
                textContentDiv.appendChild(testimonialPara);

                // Create and append the name and year
                const nameHeader = document.createElement("h2");
                nameHeader.textContent = `${testimonial.name}, ${testimonial.year_of_degree}`;
                textContentDiv.appendChild(nameHeader);

                // Create and append the university
                const universityPara = document.createElement("h3");
                universityPara.textContent = `${testimonial.university}`;
                textContentDiv.appendChild(universityPara);

                

                // Append the text content div to the main testimonial div
                testimonialDiv.appendChild(textContentDiv);

                // Append each testimonial to the container
                testimonialContainer.appendChild(testimonialDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching the testimonials:', error);
        });
});



  function toggleAnswer(element) {
    const faq = element.parentElement;
    faq.classList.toggle('faq-active');
  }

