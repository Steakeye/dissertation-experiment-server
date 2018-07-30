class ShareWithFriends extends BaseStep {
    constructor() {
        super('#share-with-friends');

        //this.bottleEl = <Element>Sizzle(".bottle", this.stepContainer)[0];
    }

    public doIntroAnimation() {
        this.flashBottle();
    }

    public doExitAnimation() {
        /*this.setBottleRotation("left");
        this.toggleBottleClass("tilt-0", false);
        this.bounceBottle();*/
        this.hideStep();
    }

    protected flashBottle() {
        this.addElClass(<Element>this.bottleEl, "triple-burst")
    }
}