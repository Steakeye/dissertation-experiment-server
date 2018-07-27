class WellDone extends BaseStep {
    constructor() {
        super('#well-done');
    }

    public animateWellDoneStep(): Promise<undefined> {
        const container: Element = <Element>this.stepContainer;

        return new Promise<undefined>(function (resolve: () => undefined, reject: (e: Error) => undefined) {
            //console.log("promise running");

            try {
                Sizzle('.bottle', container)[0].classList.add("shake-0");

                setTimeout(() => {
                    container.classList.add("hide");
                }, 1250);
                setTimeout(() => {
                    resolve();
                }, 1750);
            } catch (e) {
                reject(e);
            }

        });
    }
}