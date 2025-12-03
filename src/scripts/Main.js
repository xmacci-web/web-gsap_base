import ComponentFactory from './ComponentFactory.js';
import Icons from './utils/Icons.js';
import Scroller from './GSAP/Scroller.js';

class Main {
  constructor() {
    this.init();
  }

  init() {
    document.documentElement.classList.add('has-js');

    Icons.load();

    // Crée le scroller
    const scroller = new Scroller('#smooth-wrapper', '#smooth-content');

    // Passe le scroller à la factory
    new ComponentFactory(scroller);
  }
}

new Main();
