import Drag from './GSAP/Drag.js';
import Indicator from './GSAP/Indicator.js';
export default class ComponentFactory {
  constructor(scroller) {
    this.scroller = scroller;
    this.componentInstances = [];
    this.componentList = {
      Drag,
      Indicator,
    };
    this.init();
  }

  init() {
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        const instance = new this.componentList[componentName](
          element,
          this.scroller
        );
        this.componentInstances.push(instance);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}
