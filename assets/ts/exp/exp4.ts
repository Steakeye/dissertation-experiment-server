///<reference path="../defs.d.ts"/>
///<reference path="../steps-lib.ts"/>
///<reference path="../steps/thank-you.ts"/>
///<reference path="../steps/sign-up.ts"/>
///<reference path="../steps/share-with-friends.ts"/>
///<reference path="../steps/social-media.ts"/>
///<reference path="../steps/amazing.ts"/>

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    const stepsHandler: StepsLib = new StepsLib();
    const backgroundController: BGController = new BGController();
    const thankyouController: ThankYou = new ThankYou();
    const signUpController: SignUp = new SignUp();
    const shareWithFriendsController: ShareWithFriends = new ShareWithFriends();
    const socialMediaController: SocialMedia = new SocialMedia();
    const amazingController: Amazing = new Amazing();

    backgroundController.animateBG();

    const secondStep: Promise<Element> = thankyouController.animateThankYouStep().then(() => {
        //console.log('we animated then came back to exp1');
        backgroundController.animateBG(false);
        signUpController.bounceBottle();
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    const signUpSubmitPromise: Promise<void> = secondStep.then(() => { return signUpController.createSignUpButtonBinding(); });

    const thirdStep: Promise<Element> = signUpSubmitPromise.then(() => {
        signUpController.doExitAnimation();
        backgroundController.raiseBG();
        shareWithFriendsController.doIntroAnimation();
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    thirdStep.then(() => {
        backgroundController.animateBG();
        return shareWithFriendsController.getInterstitialPromise();
    }).then(() => {
        if (stepsHandler.currentStepEl == shareWithFriendsController.stepEl) {
            backgroundController.animateBG(false);
        }
    });

    const socialMediaClickPromise: Promise<void> = thirdStep.then(() => {
        return shareWithFriendsController.createClickBinding();
    });

    const fourthStep: Promise<Element> = socialMediaClickPromise.then(() => {
        shareWithFriendsController.doExitAnimation();
        socialMediaController.doIntroAnimation();
        return stepsHandler.animateToNextStep(0)
    });

});