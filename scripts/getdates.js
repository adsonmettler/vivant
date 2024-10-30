

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



