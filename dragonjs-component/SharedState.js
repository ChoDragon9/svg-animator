import {events, query, replaceWith} from './core/helper/dom.js';
import {createStore} from './core/store.js';
import {component} from './core/component.js';

const sharedStore = createStore();
const sharedState = sharedStore.useState({
  count: 0
});

export const CounterButton = component(({html, store}) => {
  store.share(sharedStore);

  const actions = {
    upCount: () => {
      sharedState.count.set(sharedState.count.get() + 1)
    }
  };
  const render = () => {
    const dom = html(`<div>
       <button type="button">Up Count</button>
     </div>`);

    events(query(dom, 'button'), {
      click: actions.upCount
    });

    return dom;
  };

  return render;
});

export const MainComponent = component(({html, store}) => {
  store.share(sharedStore);

  return () => {
    const dom = html(`<div>
      <h2>Shared State</h2>
      ${sharedState.count.get()}
      <counter-button1></counter-button1>
      <counter-button2></counter-button2>
    </div>`);

    replaceWith(
      query(dom, 'counter-button1'),
      CounterButton()
    );
    replaceWith(
      query(dom, 'counter-button2'),
      CounterButton()
    );

    return dom;
  }
});
