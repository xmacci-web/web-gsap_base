import { gsap } from 'gsap';

export default class Indicator {
  constructor(element, scroller) {
    this.element = element;
    this.scroller = scroller;
    this.floatTl = null;
    this.scrollTimeout = null;

    this.init();
  }

  init() {
    // Start visible
    gsap.set(this.element, { autoAlpha: 1 });

    // Floating animation
    this.floatTl = gsap.to(this.element, {
      y: -10,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      duration: 1,
    });

    // Detect smooth scroll or native scroll
    if (this.scroller?.smoother) {
      this.scroller.smoother.vars.onUpdate = () => this.hideTemporarily();
    }

    window.addEventListener('wheel', () => this.hideTemporarily(), {
      passive: true,
    });
  }

  hideTemporarily() {
    gsap.to(this.element, { autoAlpha: 0, duration: 0.3 });
    this.floatTl.pause();

    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);

    // Show again after 0.5s of no scroll
    this.scrollTimeout = setTimeout(() => this.show(), 500);
  }

  show() {
    gsap.to(this.element, { autoAlpha: 1, duration: 0.3 });
    this.floatTl.play();
  }
}
