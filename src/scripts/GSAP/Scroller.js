// Scroller.js
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default class Scroller {
  constructor(wrapperSelector, contentSelector) {
    this.wrapperSelector = wrapperSelector;
    this.contentSelector = contentSelector;
    this.smoother = null;

    this.init();
  }

  init() {
    this.wrapper = document.querySelector(this.wrapperSelector);
    this.content = document.querySelector(this.contentSelector);

    this.smoother = ScrollSmoother.create({
      wrapper: this.wrapper,
      content: this.content,
      smooth: 1.2,
      effects: true,
    });
  }

  scrollBy(amount) {
    gsap.to(this.smoother, {
      scrollTop: this.smoother.scrollTop() + amount,
      duration: 0.3,
      ease: 'power3.out',
    });
  }
}
