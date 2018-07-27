class SignUp extends BaseStep {
    constructor() {
        super('#sign-up');
    }

    public createSignUpButtonBinding(): Promise<void> {
        const buttonAction: ClickPromiseAction<void> = (el: Element, container: Element, resolver: PromiseResolver<void>): void => {
            container.classList.add("hide");

            setTimeout(() => {
                resolver();
            }, 1000);

        };

        return this.createClickElementPromise<void>(<Element>Sizzle("button", this.stepContainer)[0], buttonAction)
    }

    public doExitAnimation() {
        this.hideStep();
        this.tiltBottle();
    }
}