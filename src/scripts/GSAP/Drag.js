import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(Observer, ScrollTrigger);

export default class Drag {
  constructor(element, scroller) {
    this.element = element;
    this.scroller = scroller;

    this.rotateAmount = 3;
    this.dragStrength = 1.2;

    gsap.set(this.element, { cursor: 'grab' });

    this.initNormalize();
    this.initDrag();
  }

  initNormalize() {
    ScrollTrigger.normalizeScroll({
      type: 'pointer,wheel',
      ignore: '[data-ignore]',
    });
  }

  initDrag() {
    Observer.create({
      target: this.element,
      type: 'pointer',
      dragMinimum: 5,
      onPress: () => gsap.set(this.element, { cursor: 'grabbing' }),
      onRelease: () => {
        gsap.set(this.element, { cursor: 'grab' });
        this.reset();
      },
      onDrag: (self) => this.onDrag(self),
    });
  }

  onDrag(self) {
    const dir = self.deltaY < 0 ? 'up' : 'down';

    gsap.to(this.element, {
      rotateX: dir === 'up' ? this.rotateAmount : -this.rotateAmount,
      duration: 0.25,
      ease: 'power2.out',
    });

    if (this.scroller?.smoother) {
      const newPos =
        this.scroller.smoother.scrollTop() - self.deltaY * this.dragStrength;
      this.scroller.smoother.scrollTop(newPos);
    }

    //  Dispatch event for indicators
    window.dispatchEvent(new CustomEvent('drag'));
  }

  reset() {
    gsap.to(this.element, { rotateX: 0, duration: 0.4, ease: 'power2.out' });
  }
}
