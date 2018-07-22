/*/*
TODO: get a query selector loaded, use it to navigate to the next steps
* */
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    const body = Sizzle('body')[0];
    body.classList.add('loaded');

    Sizzle('#bg-sunburst .inner')[0].classList.toggle("animated");
});