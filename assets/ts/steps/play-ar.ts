class PlayAR extends BaseStep {
    constructor() {
        super('#play-ar');

        this.bottleEls = Sizzle('.bottle', this.stepContainer);

        this.bottleEl = this.bottleEls[2];
    }

    public splayBottles(splay: boolean = true) {
        this.toggleElClass(this.bottleEls[0], "tilt-0", splay);
        this.toggleElClass(this.bottleEls[1], "tilt-1", splay);
    }

    protected bottleEls?: Element[];
}