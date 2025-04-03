import TaskComponent from '../view/name-task-component.js';
import StubTaskComponent from '../view/stub-task-component.js';
import { render } from '../framework/render.js';

export default class TaskPresenter {
    #task = null;
    #container = null;

    constructor(task, container) {
        this.#task = task;
        this.#container = container;
    }

    renderTask() {
        const taskComponent = new TaskComponent({ task: this.#task });
        const taskList = this.#container.querySelector('.list-box');

        if (taskList) {
            render(taskComponent, taskList);
        } else {
            console.error('Container .list-box не найден внутри блока задач');
        }
    }

    static renderIfEmpty(tasks, container) {
        const taskList = container.querySelector('.list-box');
        if (tasks.length === 0) {
            const stubTaskComponent = new StubTaskComponent();
            render(stubTaskComponent, container);
        }
    }
}
