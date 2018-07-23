function animateThankYouStep(): Promise<undefined> {
    return new Promise<undefined>(function(resolve: () => undefined, reject: (e:Error) => undefined) {
        console.log("promise running");

        try {
            const thanksContainer: Element = Sizzle('#thank-you', document.body)[0];

            Sizzle('.bottle', thanksContainer)[0].classList.add("shake-1");
            setTimeout(() => {
                thanksContainer.classList.add("hide");
            }, 3000);
            setTimeout(() => {
                resolve();
            }, 3500);
        } catch (e) {
            reject(e);
        }

    });
}