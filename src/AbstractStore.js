var EventEmitter = require('events').EventEmitter;

const CHANGE_EVENT = 'change'

/**
 * Partially copied from github/facebook/flux.
 */
export default class AbstractStore {
  constructor(dispatcher) {
    this.__className = this.constructor.name;
    this.__emitter = new EventEmitter();
  }

  __emitChange() {
    this.__emitter.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.__emitter.addListener(CHANGE_EVENT, callback);
  }

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.__emitter.removeListener(CHANGE_EVENT, callback);
  }
}
