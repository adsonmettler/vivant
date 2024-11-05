

// Author: Adson Mettler do Nascimento



// Menu Navagation | Hamburguer menu button

const hamButton = document.querySelector('#menubutton');
const navigation = document.querySelector('#animatemenu');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});


// TEXT ANIMATION HERO PAGE

document.addEventListener("DOMContentLoaded", function() {
    const words = ["WALK SAFE", "WALK EASY", "WALK VIVANT"];
    let wordIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100; // Speed of typing each character
    const erasingSpeed = 50; // Speed of erasing each character
    const delayBetweenWords = 2000; // Delay between words

    const dynamicText = document.getElementById("dynamic-text");

    function type() {
        if (charIndex < words[wordIndex].length) {
            dynamicText.textContent += words[wordIndex][charIndex];
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, delayBetweenWords);
        }
    }

    function erase() {
        if (charIndex > 0) {
            dynamicText.textContent = words[wordIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            // Move to the next word and start typing again
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, typingSpeed);
        }
    }

    // Start the typing effect
    type();
});




function changeColor(imageSrc, button) {
    // Find the nearest product card and its image
    const productCard = button.closest('.product-card');
    const productImage = productCard.querySelector('.product-image');
    productImage.src = imageSrc; // Change the image source
}



// SUPPORT SECTION - Scroll animation


document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.image-card');
  
    function handleScroll() {
      images.forEach((image) => {
        const rect = image.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          image.classList.add("fade-in");
        }
      });
    }
  
    window.addEventListener("scroll", handleScroll);
  });
  


//   FEATURES SECTION - Scroll animation

document.addEventListener("DOMContentLoaded", () => {
    const featureImages = document.querySelectorAll(".features-section .feature");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("fade-in");
                    }, index * 200); // 200ms delay between each image
                    observer.unobserve(entry.target); // Stop observing once it's faded in
                }
            });
        },
        { threshold: 0.1 } // Trigger when 10% of the image is visible
    );

    featureImages.forEach(image => observer.observe(image));
});



document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("#with-you-section, .products-title, .product-carousel, #messageModal, .features-section, .style-functionality-section, .reviews-section, .partners-section");

    // Add the initial fade-in class
    sections.forEach(section => section.classList.add("fade-in-section"));

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in-visible");
                observer.unobserve(entry.target); // Unobserve once it’s visible
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
});



document.addEventListener("DOMContentLoaded", function () {
    const heroText = document.querySelector(".hero-text");
    const heroImage = document.querySelector(".hero-image");

    function fadeInOnScroll(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target); // Stop observing after fading in
            }
        });
    }

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(fadeInOnScroll, observerOptions);

    // Observe only the hero text and hero image
    observer.observe(heroText);
    observer.observe(heroImage);
});
