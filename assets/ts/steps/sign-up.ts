function createSignUpButtonBinding(): Promise<undefined> {
    return new Promise<undefined>(function(resolve: () => undefined, reject: (e:Error) => undefined) {
        console.log("promise running");

        try {
            const signUpContainer: Element = Sizzle('#sign-up', document.body)[0];

            const evtType: string = "click";

                const button = Sizzle("button", signUpContainer)[0];

                const cb = (e: Event) => {
                    e.preventDefault();

                    button.removeEventListener(evtType, cb);

                    signUpContainer.classList.add("hide");

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