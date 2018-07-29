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

    protected coinPile?: Element;
}