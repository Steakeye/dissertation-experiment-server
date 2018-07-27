class Amazing extends BaseStep {
    constructor() {
        super('#amazing');
    }

    public doIntroAnimation() {
        this.tiltBottle();
        this.bounceTitle();
    }

    public doExitAnimation() {
        this.setBottleRotation("left");
        this.toggleBottleClass("tilt-0", false);
        this.bounceBottle();
    }
}