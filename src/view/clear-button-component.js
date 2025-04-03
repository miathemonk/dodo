import { createElement } from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearButtonComponentTemplate() {
    return (
        `<button type="button" class="clear-button">x Очистить</button>`
    );
}

export default class ClearButtonComponent extends AbstractComponent {
    #handleClick = null;
    #isDisabled = false;

    constructor({ onClick }) {
        super();
        this.#handleClick = onClick; 
        this.element.addEventListener('click', this.#clickHandler); 
    }

    get template() {
        return createClearButtonComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        if (this.#handleClick && !this.#isDisabled) {
            this.#handleClick(); 
        }
    }

    setDisabled(isDisabled) {
        this.#isDisabled = isDisabled;
        if (isDisabled) {
            this.element.setAttribute('disabled', 'true'); 
        } else {
            this.element.removeAttribute('disabled'); 
        }
    }
}



