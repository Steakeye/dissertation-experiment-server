/*/*
TODO: get a query selector loaded, use it to navigate to the next steps
* */
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    Sizzle('#bg-sunburst .inner')[0].classList.toggle("animated");
});