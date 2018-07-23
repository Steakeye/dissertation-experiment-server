import Tween = createjs.Tween;


class StepsLib {

    constructor() {
        this.loadSteps(Sizzle("#ad-steps section[data-order]"));
    }

    public animateToNextStep(): Udefable<Promise<Element>> {
        const steps:Element[] = (<Element[]>this.steps);
        const lastStep = steps.length - 1;
        const nowStep: number = this.currentStep;

        let animPromise: Udefable<Promise<Element>>;


        if (nowStep < lastStep) {
            const currentEl = steps[nowStep];
            const nextEl = steps[nowStep + 1];

            const animTween: Tween = this.animateFadeEls(currentEl, nextEl);

            animPromise = new Promise<Element>((resolve: (el: Element) => any, reject: () => any) => {
                animTween.call(resolve, [nextEl]);
            });
        }

        return animPromise;
    }

    public get steps(): Udefable<Element[]> {
        return this._steps;
    };

    public get currentStep() : number {
        return this._currentStep;
    }

    private loadSteps(stepsArr: Element[]): void {
        this._steps = stepsArr;
    }

    private animateFadeEls(old: Element, next: Element): Tween {
        const hiddenClassName: string = "is-hidden";

        const oldElStyle: CSSStyleDeclaration = StepsLib.getStyleObjOfEl(old);
        const nextElStyle: CSSStyleDeclaration = StepsLib.getStyleObjOfEl(next);

        function makeHiddenToggleForEl(el: Element) : (...params :any[]) => void {
            return (...params :any[]) => { el.classList.toggle(hiddenClassName)}
        }

        this.doStyleFade(oldElStyle, 1, 0).call(makeHiddenToggleForEl(old));
        return this.doStyleFade(nextElStyle, 0, 1).call(makeHiddenToggleForEl(next));
    }

    private doStyleFade(style: CSSStyleDeclaration, from: number, to: number, time: number = 500, anim = createjs.Ease.backOut): Tween {
        style.opacity = ""+from;

        return Tween.get(style, { override:true }).to({ opacity: to }, time, anim);
    }

    private static getStyleObjOfEl(el: Element) {
        return (<HTMLElement>el).style;
    }

    private _steps? : Element[];
    private _currentStep : number = 0;
}

/*
* allSteps[0].children[0].computedStyleMap().get("opacity")
* getter setter allSteps[0].children[0].style.opacity
* */