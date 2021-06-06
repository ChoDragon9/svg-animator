import {events, query} from './core/helper/dom.js';
import {component} from './core/component.js';

export const CounterComponent = component(({store, html}) => {
  const state = store.useState({
    count: 0,
  });
  const actions = {
    upCount: () => {
      state.count.set(state.count.get() + 1);
    },
    downCount: () => {
      state.count.set(state.count.get() - 1);
    }
  };
  const render = () => {
    const dom = html(`<div>
      <h2>Counter Component</h2>
      <button type="text" class="up">Up</button>
      <button type="text" class="down">Down</button>
      <div>${state.count.get()}</div>
    </div>`);

    events(query(dom, '.up'), {
      click: actions.upCount
    });
    events(query(dom, '.down'), {
      click: actions.downCount
    });

    return dom;
  };

  return render
});
