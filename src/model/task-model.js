import { GenerateId } from '../utils.js';
import Observable from '../framework/observable.js';
import { UpdateType, UserAction } from '../const.js';

export default class TasksModel extends Observable {

  #tasksApiService = null;
  #boardtasks = [];


  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get tasks() {
    return this.#boardtasks;
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardtasks = tasks;
    } catch (err) {
      this.#boardtasks = [];
    }
    this._notify(UpdateType.INIT);
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter(task => task.status === status);
  }

  async addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: GenerateId(),
    };
    try {
      const createTask = await this.#tasksApiService.addTask(newTask);
      this.#boardtasks.push(createTask);
      this._notify(UserAction.ADD_TASK, createTask);
      return createTask;
    } catch (err) {
      console.error('Ошибка при добавлении задачи на сервер', err);
      throw err;
    }
  }

  deleteTask(taskId) {
    this.#boardtasks = this.#boardtasks.filter(task => task.id !== taskId);
    this._notify(UserAction.DELETE_TASK, { id: taskId });
  }

  async clearRecycleBin() {
    try {
      const basketTasks = this.#boardtasks.filter((task) => task.status === 'basket');

      await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));

      this.#boardtasks = this.#boardtasks.filter((task) => task.status !== 'basket');

      this._notify(UserAction.DELETE_TASK, { status: 'basket' });
    } catch (err) {
      console.error('Ошибка при очистке корзины:', err);
      throw err;
    }
  }
  async updateTaskStatus(taskId, newStatus, newIndex) {
    const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return;

    const [task] = this.#boardtasks.splice(taskIndex, 1);
    task.status = newStatus;

    const tasksOfSameStatus = this.#boardtasks.filter(task => task.status === newStatus);
    const insertIndex = newIndex < tasksOfSameStatus.length ? newIndex : tasksOfSameStatus.length;
    this.#boardtasks.splice(insertIndex, 0, task);

    try {

      await this.#tasksApiService.updateTask(task);

      this._notify(UserAction.UPDATE_TASK, task);
    } catch (err) {
      console.error('Ошибка сохранения статуса на сервере:', err);
      throw err;
    }
  }

}