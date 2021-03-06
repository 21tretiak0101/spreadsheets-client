import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.subscribe = options.subscribe || [];
    this.unsubscribers = [];
    this.prepare();
  }

  toHTML() {
    return '';
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, callback) {
    const unsubscribe = this.emitter.subscribe(event, callback);
    this.unsubscribers.push(unsubscribe);
  }

  prepare() { }

  init() {
    this.initDOMListeners();
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }
}
