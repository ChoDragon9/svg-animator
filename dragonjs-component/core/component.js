import {html} from './helper/html.js';
import {createStore} from './store.js';

export const component = (createComponent) => {
  return ({props, emit} = {props: null, emit: null}) => {
    const store = createStore();
    const render = createComponent({html, store}, {props, emit});
    const state = {
      dom: null
    };
    const observer = () => {
      const newDom = render();
      state.dom && state.dom.replaceWith(newDom);
      state.dom = newDom;
    };

    store._subscribe(observer);
    observer();

    return state.dom;
  };
};
