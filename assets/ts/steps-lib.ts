import Tween = createjs.Tween;

type BottleRotation = "left" | "right" | "none";

class BaseStep {
    constructor(containerID: string) {
        this.stepContainer = Sizzle(containerID, document.body)[0];
        this.bottleEl = Sizzle('.bottle', this.stepContainer)[0];
        this.titleEl = Sizzle('h1', this.stepContainer)[0];
    }

    public bounceBottle() {
        this.toggleBottleClass("scale-0", true);
    }

    public bounceTitle() {
        this.toggleTitleClass("scale-0", true);
    }

    public setBottleRotation(rotation: BottleRotation) {
        const cssDef:DOMTokenList = (<Element>this.bottleEl).classList;

        switch (rotation) {
            case "left": {
                cssDef.remove("rotated-1");
                cssDef.add("rotated-0");
                break;
            }
            case "right": {
                cssDef.remove("rotated-0");
                cssDef.add("rotated-1");
                break;
            }
            default : {
                cssDef.remove("rotated-0", "rotated-1");
            }
        }
    }

    public tiltBottle() {
        this.toggleBottleClass("tilt-0", true);
    }

    public toggleBottleClass(cssClass: string, force?: boolean ) {
        (<Element>this.bottleEl).classList.toggle(cssClass, force);
    }

    public toggleTitleClass(cssClass: string, force?: boolean ) {
        (<Element>this.titleEl).classList.toggle(cssClass, force);
    }

    public hideStep() {
        this.toggleElClass(<Element>this.stepContainer, "hide", true);
    }

    public toggleElClass(el: Element, cssClass: string, force?: boolean ) {
        el.classList.toggle(cssClass, force);
    }

    protected stepContainer?: Element;
    protected titleEl?: Element;
    protected bottleEl?: Element;
}

class StepsLib {

    constructor() {
        this.loadSteps(Sizzle("#ad-steps section[data-order]"));
    }

    public animateToNextStep(): Udefable<Promise<Element>> {
        const steps:Element[] = (<Element[]>this.steps);
        const lastStep = steps.length - 1;
        const nowStep: number = this._currentStep;

        let animPromise: Udefable<Promise<Element>>;


        if (nowStep < lastStep) {
            const currentEl = steps[nowStep];
            const nextEl = steps[nowStep + 1];

            const animTween: Tween = this.animateFadeEls(currentEl, nextEl);

            animPromise = new Promise<Element>((resolve: (el: Element) => any, reject: () => any) => {
                animTween.call((el: Element) => {
                    ++this._currentStep;
                    resolve(el)
                }, [nextEl]);
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

    public get currentStepEl() : Udefable<Element> {
        return this._steps ? this._steps[this._currentStep] : undefined;
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

        this.doStyleFade(oldElStyle, 100, 0).call(makeHiddenToggleForEl(old));
        makeHiddenToggleForEl(next)();
        return this.doStyleFade(nextElStyle, 0, 100); //.call(makeHiddenToggleForEl(next));
    }

    private doStyleFade(style: CSSStyleDeclaration, from: number, to: number, time: number = 1500, anim = createjs.Ease.backOut): Tween {
        style.opacity = ""+from;

        return Tween.get(StepsLib.createProxtForPercent(style), { override:true }).to({ opacity: to }, time, anim);
    }

    private static getStyleObjOfEl(el: Element) {
        return (<HTMLElement>el).style;
    }

    private static createProxtForPercent<T>(target: T) {
        const handler: { get(obj: T, prop: string): any,  set(obj: T, prop: string, value: any): any } =
        {
            get: function (obj, prop) {
                return prop in obj ?
                    (<T>obj)[prop] * 100 :
                    undefined;
            },
            set: function(obj, prop, value) {
                // The default behavior to store the value
                obj[prop] = value / 100;

                // Indicate success
                return true;
            }
        };

        return new Proxy(<{}>target, handler);
    }

    private _steps? : Element[];
    private _currentStep : number = 0;
}
