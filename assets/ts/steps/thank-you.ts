class ThankYou extends BaseStep {
    constructor() {
        super('#thank-you');
    }

    public animateThankYouStep(): Promise<undefined> {
        const thanksContainer: Element = <Element>this.stepContainer;

        return new Promise<undefined>(function (resolve: () => undefined, reject: (e: Error) => undefined) {
            //console.log("promise running");

            try {
                Sizzle('.bottle', thanksContainer)[0].classList.add("shake-1");

                setTimeout(() => {
                    thanksContainer.classList.add("hide");
                }, 1250);
                setTimeout(() => {
                    resolve();
                }, 1750);
            } catch (e) {
                reject(e);
            }

        });
    }

    public doIntroAnimation() {
        //TODO!
    }

    public doExitAnimation() {
        this.hideStep();
    }
}