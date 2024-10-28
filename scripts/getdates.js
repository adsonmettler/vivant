

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
    const words = ["Durability", "Resistance", "Safety", "Confort"];
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








// Function to GET THE CURRENT DATE


// Function to get the current year
function getCurrentYear() {
    return new Date().getFullYear();
}

// To update the copyright year in the footer
document.addEventListener("DOMContentLoaded", function() {
    var yearSpan = document.querySelector("#year span.highlight");
    if (yearSpan) {
		yearSpan.textContent = getCurrentYear();
    }
});


// Function to get the last modified date of the document
document.addEventListener("DOMContentLoaded", function() {
    var lastModifiedDate = document.lastModified;

    // Update the second paragraph in the footer with the last modified date
    var modifiedParagraph = document.querySelector("footer p:nth-of-type(2)");
    if (modifiedParagraph) {
        modifiedParagraph.textContent = "Last modified: " + lastModifiedDate;
    }
});