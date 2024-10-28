// 1. Set the Timestamp before Form Submission (for join.html)
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".designOne");
    form.addEventListener("submit", (event) => {
        const timestampField = document.getElementById("timestamp");
        const currentTimestamp = Date.now(); // Get current time in milliseconds
        timestampField.value = currentTimestamp; // Set it as the value of the hidden field
    });
});

// 2. Process and Display the Timestamp (for thankyou.html)

// Get the entire URL and split parameters
const currentUrl = window.location.href;
const everything = currentUrl.split('?');
let formData = everything[1] ? everything[1].split('&') : []; // Handle case when no parameters

// Function to retrieve values from URL parameters
function show(param) {
    let result = "";
    formData.forEach((element) => {
        if (element.startsWith(param)) {
            result = decodeURIComponent(element.split('=')[1].replace("%40", "@"));
        }
    });
    return result;
}

// Function to capitalize text
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Select the results element on thankyou.html page
const showInfo = document.querySelector('#results');

// Retrieve timestamp and other form values
const timestamp = show("timestamp");
const date = timestamp ? new Date(parseInt(timestamp)).toLocaleDateString() : "Invalid Date";
const time = timestamp ? new Date(parseInt(timestamp)).toLocaleTimeString() : "Invalid Time";

// Display form data on thankyou.html
showInfo.innerHTML = `
<h3>Application for ${capitalize(show("first"))} ${capitalize(show("last"))}</h3>
<p><strong>Your title:</strong> ${capitalize(show("title"))}</p>
<p><strong>Your Email:</strong> <a href="mailto:${show("email")}">${show("email")}</a></p>
<p><strong>Your Phone:</strong> ${show("phone")}</p>
<p><strong>Your Company:</strong> ${show("company")}</p>
<p><strong>Your Business Description:</strong> ${show("description")}</p>
<p><strong>Your Membership Level:</strong> ${show("membership")}</p>
<p><strong>Date and Time of Application:</strong> ${date} ${time}</p>
`;
