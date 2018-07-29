class GetFaveCoin extends BaseStep {
    constructor() {
        super('#get-fave-coin');

        this.coinEl = Sizzle(".coin", this.stepContainer)[0];
    }

    public spinCoin() {
        this.toggleElClass(<Element>this.coinEl, "spin-1");
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

    public doIntroAnimation() {
        //TODO
    }

    public doExitAnimation() {
        this.hideStep();
        //this.tiltBottle();
    }

    protected coinEl?: Element;
}