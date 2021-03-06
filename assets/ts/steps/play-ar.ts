class PlayAR extends BaseStep {
    constructor() {
        super('#play-ar');

        this.bottleEls = Sizzle('.bottle', this.stepContainer);

        this.bottleEl = this.bottleEls[2];

        this.buttonEl = <Element>Sizzle(".button", this.stepContainer)[0];

        this.coinEl = Sizzle(".coin", this.stepContainer)[0];
    }

    public doIntroAnimation() {
        this.splayBottles();
        this.bounceBottle();
        this.bounceCoin();
    }

    public doExitAnimation() {
        this.hideStep();
    }

    public splayBottles(splay: boolean = true) {
        const bottles:Element[] = (<Element[]>this.bottleEls);

        this.toggleElClass(bottles[0], "tilt-0", splay);
        this.toggleElClass(bottles[1], "tilt-1", splay);
    }

    public unSplayBottles(splay: boolean = true) {
        const bottles:Element[] = (<Element[]>this.bottleEls);

        const leftBottle: Element = bottles[0];
        const rightBottle: Element = bottles[1];

        this.toggleElClass(leftBottle, "un-tilt-0", splay);
        this.toggleElClass(rightBottle, "un-tilt-1", splay);
    }

    public createPlayButtonBinding(): Promise<void> {
        const buttonAction: ClickPromiseAction<void> = (el: Element, container: Element, resolver: PromiseResolver<void>): void => {
            this.splayBottles(false);
            this.unSplayBottles();

            setTimeout(() => {
                container.classList.add("hide");
                resolver();
            }, 1000);

        };

        return this.createClickElementPromise<void>(<Element>this.buttonEl, buttonAction)
    }


    public bounceCoin() {
        this.coinEl && this.addElClass(this.coinEl, "scale-0");
    }

    protected coinEl?: Element;
    protected bottleEls?: Element[];
}