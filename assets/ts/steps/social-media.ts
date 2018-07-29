class SocialMedia extends BaseStep {
    constructor() {
        super('#social-media');
    }

    public doIntroAnimation() {
        this.tiltBottle();
        //this.shakebottle();
    }

    public doExitAnimation() {
        /*this.setBottleRotation("left");
        this.toggleBottleClass("tilt-0", false);
        this.bounceBottle();*/
        this.hideStep();
    }
}