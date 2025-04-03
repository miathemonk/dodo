import { createElement } from '../framework/render.js'
import { AbstractComponent } from '../framework/view/abstract-component.js'

function createAreaTaskComponentTemplate() {
  return (`   <section class="taskboard">
    </section>  `
  );
}

export default class TaskAreaComponent extends AbstractComponent {

  get template() {
    return createAreaTaskComponentTemplate();
  }

}
