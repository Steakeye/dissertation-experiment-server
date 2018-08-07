class WellDone extends BaseStep {
    constructor() {
        super('#well-done');
    }

    public animateWellDoneStep(): Promise<undefined> {
        return new Promise<undefined>((resolve: () => undefined, reject: (e: Error) => void) => {
            //console.log("promise running");

            function isPortrait(): boolean {
                return window.innerHeight > window.innerWidth;
            }

            if(isPortrait()){
                this.doWellDoneAnimation(resolve, reject)
            } else {
                const resizeEvtHandler: (evt: Event) => void = () => {
                    if (isPortrait()) {
                        window.removeEventListener("resize", resizeEvtHandler);
                        this.doWellDoneAnimation(resolve, reject);
                    }

                };

                window.addEventListener("resize", resizeEvtHandler);
            }

        });
    }

    private doWellDoneAnimation(resolve: PromiseResolver<undefined>, reject: PromiseRejectResolver<Error>) {
        const container: Element = <Element>this.stepContainer;

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
    }

    public doIntroAnimation() {
        //TODO!
    }

    public doExitAnimation() {
        this.hideStep();
    }
}