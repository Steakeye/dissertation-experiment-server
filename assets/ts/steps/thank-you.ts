class ThankYou {
    constructor() {
        this.stepContainer = Sizzle('#thank-you', document.body)[0];
    }

    public animateThankYouStep(): Promise<undefined> {
        const thanksContainer: Element = <Element>this.stepContainer;

        return new Promise<undefined>(function (resolve: () => undefined, reject: (e: Error) => undefined) {
            console.log("promise running");

            try {
                Sizzle('.bottle', thanksContainer)[0].classList.add("shake-1");

                setTimeout(() => {
                    thanksContainer.classList.add("hide");
                }, 1000);
                setTimeout(() => {
                    resolve();
                }, 1500);
            } catch (e) {
                reject(e);
            }

        });
    }

    private stepContainer?: Element;

}