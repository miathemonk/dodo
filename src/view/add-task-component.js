import { createElement } from '../framework/render.js';
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFormAddTaskComponentTemplate() {
    return (
        `<form class="form">
        <div class="form_title">Новая задача</div>
        <input class="form_text" placeholder="Название задачи...">
        <button type = 'submit' class="button_blue"> + Добавить </button>
      </form>`
    );
}

export default class FormAddTaskComponent extends AbstractComponent {

    #handleClick = null;
    #inputElement = null;

    constructor({ onClick }) {
        super();
        this.#handleClick = onClick; 
        this.#inputElement = this.element.querySelector('.form_text'); 
        this.element.addEventListener('submit', this.#clickHandler); 
    }

    get template() {
        return createFormAddTaskComponentTemplate();
    }

    clearInput() {
        this.#inputElement.value = '';
    }

    #clickHandler = (evt) => {
        evt.preventDefault(); 
        const taskTitle = this.#inputElement.value;
        if (this.#handleClick) {
            this.#handleClick(taskTitle); 
        }
        this.clearInput(); 
    }
}
