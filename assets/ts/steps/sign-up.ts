class SignUp {
    constructor() {
        this.stepContainer = Sizzle('#sign-up', document.body)[0];
    }

    public bounceBottle() {
        Sizzle('.bottle', this.stepContainer)[0].classList.add("scale-0");
    }

    public hideStep() {
        (<Element>this.stepContainer).classList.add("hide");
    }

    public createSignUpButtonBinding(): Promise<undefined> {
        const container: Element = <Element>this.stepContainer;

        return new Promise<undefined>(function (resolve: () => undefined, reject: (e: Error) => undefined) {
            console.log("promise running");

            try {
                const evtType: string = "click";

                const button = Sizzle("button", container)[0];

                const cb = (e: Event) => {
                    e.preventDefault();

                    button.removeEventListener(evtType, cb);

                    container.classList.add("hide");

                    setTimeout(() => {
                        resolve();
                    }, 1000);
                };

                button.addEventListener(evtType, cb);

            } catch (e) {
                reject(e);
            }

        });
    }

    private stepContainer?: Element;
}