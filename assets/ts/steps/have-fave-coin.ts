class HaveFaveCoin extends BaseStep {
    constructor() {
        super('#have-fave-coin');

        this.coinPile = Sizzle("#coin-pile", <Element>this.stepContainer)[0];
    }

    public doIntroAnimation() {
        this.addElClass(<Element>this.coinPile, "is-raised", "drop");
    }

    public doExitAnimation() {
        this.removeElClass(<Element>this.coinPile, "is-raised", "drop");
        this.hideStep();
    }

    public getInterstitialPromise(): Promise<void> {
        return HaveFaveCoin.createTimewPromise(7500);
    }

    public createClickBinding(): Promise<void> {
        const clickAction: ClickPromiseAction<void> = (el: Element, container: Element, resolver: PromiseResolver<void>): void => {
            //this.doExitAnimation();

            resolver();
        };

        return this.createClickElementPromise<void>(<Element>this.stepContainer, clickAction)
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

    protected coinPile?: Element;
}