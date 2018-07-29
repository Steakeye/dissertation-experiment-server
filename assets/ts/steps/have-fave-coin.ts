class HaveFaveCoin extends BaseStep {
    constructor() {
        super('#have-fave-coin');

        this.coinPile = Sizzle("#coin-pile", <Element>this.stepContainer)[0];
    }

    public doIntroAnimation() {
        (<Element>this.coinPile).classList.add("is-raised", "drop");
    }

    public doExitAnimation() {
        this.hideStep();
    }

    public getInterstitialPromise(): Promise<void> {
        return HaveFaveCoin.createTimewPromise(1500);
    }

    public createClickBinding(): Promise<void> {
        const clickAction: ClickPromiseAction<void> = (el: Element, container: Element, resolver: PromiseResolver<void>): void => {
            //container.classList.add("hide");

            /*setTimeout(() => {
                resolver();
            }, 1000);*/
            this.doExitAnimation();

            resolver();
        };

        return this.createClickElementPromise<void>(<Element>this.stepContainer, clickAction)
    }

    protected coinPile?: Element;
}