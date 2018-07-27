class PlayAR extends BaseStep {
    constructor() {
        super('#play-ar');

        this.bottleEls = Sizzle('.bottle', this.stepContainer);

        this.bottleEl = this.bottleEls[2];

        this.buttonEl = <Element>Sizzle(".button", this.stepContainer)[0];
    }

    public splayBottles(splay: boolean = true) {
        const bottles:Element[] = (<Element[]>this.bottleEls);

        this.toggleElClass(bottles[0], "tilt-0", splay);
        this.toggleElClass(bottles[1], "tilt-1", splay);
    }

    public createPlayButtonBinding(): Promise<void> {
        const buttonAction: ClickPromiseAction<void> = (el: Element, container: Element, resolver: ClickPromiseResolver<void>): void => {
            container.classList.add("hide");

            setTimeout(() => {
                resolver();
            }, 1000);

        };

        return this.createClickElementPromise<void>(<Element>this.buttonEl, buttonAction)
    }

    protected bottleEls?: Element[];
}