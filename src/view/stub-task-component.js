import { AbstractComponent } from '../framework/view/abstract-component.js'
function createAreaTaskComponentTemplate() {
    return (`   <li class="task_list_stub">Перетащите карточку</li> `
    );
}

export default class StubTaskComponent extends AbstractComponent {
    get template() {
        return createAreaTaskComponentTemplate();
    }

}