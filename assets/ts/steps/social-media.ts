class SocialMedia extends BaseStep {
    constructor() {
        super('#social-media');

        this.buttonEl = Sizzle("#form-social-media-message .button", this.stepContainer)[0];
        this.messageConfirmationModal = Sizzle("#message-sent", this.stepContainer)[0];
    }

    public doIntroAnimation() {
    }

    public doExitAnimation() {
        //this.hideStep();
    }

    public createClickBinding(): Promise<void> {
        const clickAction: ClickPromiseAction<void> = (el: Element, container: Element, resolver: PromiseResolver<void>): void => {
            this.fadeInModal();
            SocialMedia.createDelayPromise(() => {
                resolver();
            }, 2000);
        };

        return this.createClickElementPromise<void>(<Element>this.buttonEl, clickAction)
    }

    public fadeInModal() {
        this.addElClass(<Element>this.messageConfirmationModal, "is-active", "fade-in");
    }

    protected messageConfirmationModal?: Element;
}