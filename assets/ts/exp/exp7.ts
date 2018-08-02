///<reference path="../defs.d.ts"/>
///<reference path="../steps-lib.ts"/>
///<reference path="../steps/thank-you.ts"/>
///<reference path="../steps/sign-up.ts"/>
///<reference path="../steps/thank-you.ts"/>
///<reference path="../steps/get-fave-coin.ts"/>
///<reference path="../steps/have-fave-coin.ts"/>
///<reference path="../steps/share-with-friends.ts"/>
///<reference path="../steps/social-media.ts"/>
///<reference path="../steps/amazing.ts"/>

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    const stepsHandler: StepsLib = new StepsLib();
    const backgroundController: BGController = new BGController();
    const thankyouController: ThankYou = new ThankYou();
    const getCoinController: GetFaveCoin = new GetFaveCoin();
    const haveCoinController: HaveFaveCoin = new HaveFaveCoin();
    const shareWithFriendsController: ShareWithFriends = new ShareWithFriends();
    const socialMediaController: SocialMedia = new SocialMedia();
    const amazingController: Amazing = new Amazing();

    backgroundController.animateBG();

    const secondStep: Promise<Element> = thankyouController.animateThankYouStep().then(() => {
        //console.log('we animated then came back to exp1');
        getCoinController.spinCoin();
        backgroundController.raiseBG().then(() => {
            backgroundController.setBGPosToRaised();
            backgroundController.raiseBG(false);
        });
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    secondStep.then(() => {
        getCoinController.bounceTitle();
        return GetFaveCoin.createDelayPromise((resolver: PromiseResolver<void>) => {
            if (stepsHandler.currentStepEl == getCoinController.stepEl) {
                backgroundController.animateBG(false);
            }
            resolver();
        }, 6000)
    });

    const signUpSubmitPromise: Promise<void> = secondStep.then(() => {
        return getCoinController.createSignUpButtonBinding();
    });

    const thirdStep: Promise<Element> = signUpSubmitPromise.then(() => {
        getCoinController.doExitAnimation();
        haveCoinController.doIntroAnimation();
        backgroundController.animateBG();
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    const haveCoinHandler = (): Udefable<Promise<void>> => {
        if (stepsHandler.currentStepEl == haveCoinController.stepEl) {
            backgroundController.animateBG(false);
            haveCoinController.doExitAnimation();

            return HaveFaveCoin.createTimewPromise(500);
        }
    };

    const haveCoinTransitionResolver = (): Udefable<Promise<Element>> => {
        amazingController.doIntroAnimation();

        return stepsHandler.animateToNextStep();
    };

    let clickOccured: boolean = false;

    const thirdStepPause: Promise<void> = thirdStep.then(() => {
        return haveCoinController.getInterstitialPromise();
    });

    thirdStepPause.then(() => {
        if (!clickOccured) {
            haveCoinHandler()
                .then(haveCoinTransitionResolver);
        }
    });

    const haveCoinClickPromise: Promise<void> = thirdStep.then(() => {
        return haveCoinController.createClickBinding();
    });

    haveCoinClickPromise.then(() => {
        clickOccured = true;

        return haveCoinHandler();
    }).then(haveCoinTransitionResolver);


    const socialMediaClickPromise: Promise<void> = thirdStep.then(() => {
        return shareWithFriendsController.createClickBinding();
    });

    const fourthStep: Promise<Element> = socialMediaClickPromise.then(() => {
        shareWithFriendsController.doExitAnimation();
        socialMediaController.doIntroAnimation();
        return stepsHandler.animateToNextStep(0)
    });


    const socialMediaMessageClickPromise: Promise<void> = fourthStep.then(() => {
        return socialMediaController.createClickBinding();
    });

    const fifthStep: Promise<Element> = socialMediaMessageClickPromise.then(() => {
        socialMediaController.doExitAnimation();
        return SocialMedia.createTimewPromise(1250);
    }).then(() => {
        amazingController.doIntroAnimation();
        return stepsHandler.animateToNextStep();
    });

    fifthStep.then(() => {
        amazingController.doExitAnimation();
    });
});