import {component} from '../../dragonjs-component/core/component.js';

export const SketchbookComponent = component(({html}) => {
  const render = () => {
    return html(`<div>
      <h2>SketchbookComponent</h2>
      Hello World!
    </div>`);
  };

  return render;
});
