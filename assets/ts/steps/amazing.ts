class Amazing {
    constructor() {
        this.stepContainer = Sizzle('#amazing', document.body)[0];
    }

    public tiltBottle() {
        Sizzle('.bottle', this.stepContainer)[0].classList.add("tilt-0");
    }

    private stepContainer?: Element;
}