document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    //Sizzle('#thank-you', document.body)[0]
    const thanksContainer: Element = Sizzle('#thank-you', document.body)[0];

    Sizzle('.bottle', thanksContainer)[0].classList.add("shake-1");

    setTimeout(() => {
        thanksContainer.classList.add("hide");
    }, 3000)
});