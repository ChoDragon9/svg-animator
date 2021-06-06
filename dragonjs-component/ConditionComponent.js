import {events, query} from './core/helper/dom.js';
import {component} from './core/component.js';

export const ConditionComponent = component(({store, html}) => {
  const state = store.useState({
    toggle: false,
  });
  const actions = {
    toggle: () => {
      state.toggle.set(!state.toggle.get())
    }
  };

  const render = () => {
    const dom = html(`<div>
      <h2>Condition Rendering</h2>
      <button type="button">Toggle</button>
      ${state.toggle.get() ? '<div>Hello World</div>' : ''}
    </div>`);

    events(query(dom, 'button'), {
      click: actions.toggle
    });

    return dom;
  };

  return render
});
