import {createSubject} from './helper/observer.js';
import {mapValues} from './helper/map-values.js';

export const createStore = () => {
  const subject = createSubject();
  const useState = (state = {}) => {
    return mapValues(state, (value) => {
      const get = () => value;
      const set = (newValue, shouldNotify = true) => {
        value = newValue;
        shouldNotify && subject.notify()
      };
      return {get, set}
    });
  };
  const share = (store) => {
    store._subscribe(() => {
      subject.notify();
    })
  };

  return {
    useState,
    share,
    _subscribe: subject.subscribe,
    _unsubscribe: subject.unsubscribe,
  }
};
