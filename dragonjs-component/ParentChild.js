import {events, query, replaceWith} from './core/helper/dom.js';
import {component} from './core/component.js';

export const ParentButton = component(({html, store}) => {
  const state = store.useState({
    count: 0
  });
  const actions = {
    upCount: () => {
      state.count.set(state.count.get() + 1)
    }
  };
  const render = () => {
    const dom = html(`<div>
      <h2>Parent-Child</h2>
      <div>${state.count.get()}</div>
      <child-button></child-button>
     </div>`);
    
    const props = {
      buttonName: 'Up Count'
    };
    const emit = {
      upCount: actions.upCount
    };

    replaceWith(
      query(dom, 'child-button'),
      ChildButton({props, emit})
    );

    return dom;
  };

  return render;
});

export const ChildButton = component(({html}, {props, emit}) => {
  const render = () => {
    const dom = html(`<div>
       <button type="button">${props.buttonName}</button>
     </div>`);

    events(query(dom, 'button'), {
      click: emit.upCount
    });

    return dom;
  };

  return render;
});
