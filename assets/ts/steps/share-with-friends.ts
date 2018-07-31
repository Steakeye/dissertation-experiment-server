class ShareWithFriends extends BaseStep {
    constructor() {
        super('#share-with-friends');

        this.socialMediaIcons = <Element>Sizzle("#social-media-icons", this.stepContainer)[0];
    }

    public doIntroAnimation() {
        this.flashBottle();
        this.bubbleUpIcons();
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

    protected bubbleUpIcons() {
        this.addElClass(<Element>this.socialMediaIcons, "bubble-icons")
    }

    protected socialMediaIcons?: Element;
}