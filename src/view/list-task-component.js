import { createElement } from '../framework/render.js'
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createNameTaskComponent(status, statusLabel) {
  return (
    `<div class="task_status ${status}">
        <ul class="list-box"> <h1> ${statusLabel}</h1>
          <li class="box"> </li>
        </ul>
      </div>  `
  );

}

export default class TasksListComponent extends AbstractComponent {
  constructor({ status = '', statusLabel = '', onTaskDrop } = {}) {
      super();
      this.status = status;
      this.statusLabel = statusLabel;
      this.onTaskDrop = onTaskDrop;
  }

  get template() {
      return createNameTaskComponent(this.status, this.statusLabel);
  }

  afterRender() {
      this.#setDropHandler();
  }

  #setDropHandler() {
      const container = this.element.querySelector('.list-box'); 
  
      if (!container) {
          console.error('Container .list-box не найден');
          return;
      }
  
      let targetIndex = null;
  
      container.addEventListener('dragover', (event) => {
          event.preventDefault();
  
          const targetElement = event.target.closest('.box');
          if (targetElement) {
              const taskList = Array.from(container.children);
              targetIndex = taskList.indexOf(targetElement);
  
              taskList.forEach(task => task.classList.remove('drag-over'));
              targetElement.classList.add('drag-over');
          } else {
              targetIndex = 0;
          }
      });
  
      container.addEventListener('drop', (event) => {
          event.preventDefault();
          const taskId = event.dataTransfer.getData('text/plain');
          container.querySelectorAll('.box').forEach(task => task.classList.remove('drag-over'));
  
          if (this.onTaskDrop && taskId && targetIndex !== null) {
              this.onTaskDrop(taskId, this.status, targetIndex);
          }
      });
  }
  
}