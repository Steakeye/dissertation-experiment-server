class SignUp extends BaseStep {
    constructor() {
        super('#sign-up');
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

    //private stepContainer?: Element;
}