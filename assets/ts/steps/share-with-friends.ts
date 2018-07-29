class ShareWithFriends extends BaseStep {
    constructor() {
        super('#share-wth-friends');
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