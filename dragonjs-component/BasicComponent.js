import {component} from './core/component.js';

export const BasicComponent = component(({html}) => {
  const render = () => {
    return html(`<div>
      <h2>Basic Component</h2>
      Hello World!
    </div>`);
  };

  return render
});
