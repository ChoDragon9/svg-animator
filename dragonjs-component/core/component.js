import {html} from './helper/html.js';
import {createStore} from './store.js';
import {patch} from './patch.js';

export const component = (createComponent) => {
  return ({props, emit} = {props: null, emit: null}) => {
    const store = createStore();
    const render = createComponent({html, store}, {props, emit});
    const state = {
      dom: null
    };
    const observer = () => {
      const newDom = render();
      // state.dom && state.dom.replaceWith(newDom);
      if (state.dom) {
        patch(newDom, state.dom);
      } else {
        state.dom = newDom;
      }
    };

    store._subscribe(observer);
    observer();

    return state.dom;
  };
};
