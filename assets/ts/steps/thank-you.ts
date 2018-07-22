document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    const body = Sizzle('body')[0];
    body.classList.add('loaded');

    Sizzle('#thank-you', body)[0]
});