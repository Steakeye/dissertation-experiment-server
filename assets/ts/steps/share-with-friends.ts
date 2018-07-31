class ShareWithFriends extends BaseStep {
    constructor() {
        super('#share-with-friends');

        this.socialMediaIcons = <Element>Sizzle("#social-media-icons", <Element>this.stepContainer)[0];
    }

    public doIntroAnimation() {
        this.flashBottle();
        this.bubbleUpIcons();
    }

    public doExitAnimation() {
        this.hideStep();
    }

    protected flashBottle() {
        this.addElClass(<Element>this.bottleEl, "triple-burst")
    }

    protected bubbleUpIcons() {
        this.addElClass(<Element>this.socialMediaIcons, "is-lowered");
        this.addElClass(<Element>this.socialMediaIcons, "bubble-icons")
    }


    public getInterstitialPromise(): Promise<void> {
        return HaveFaveCoin.createTimewPromise(3000);
    }

    public createClickBinding(): Promise<void> {
        const clickAction: ClickPromiseAction<void> = (el: Element, container: Element, resolver: PromiseResolver<void>): void => {
            //this.doExitAnimation();

            resolver();
        };

        return this.createClickElementPromise<void>(<Element>this.socialMediaIcons, clickAction)
    }

    protected socialMediaIcons?: Element;
}