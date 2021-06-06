import {store} from '../store/store.js';
import {component} from '../../dragonjs-component/core/component.js';

const options = {
  radius: 10,
  fill: 'rgba(255, 102, 51)'
};

export const CircleComponent = component(({html}, {props}) => {
  const render = () => {
    const coordinate = store.coordinates.get()[props];
    const template = coordinate.reduce((html, [x, y], index) => {
      html += `<circle cx="${x}" cy="${y}" r="${options.radius}" fill="${options.fill}" data-index="${index}"></circle>`;
      return html;
    }, '');

    return html(`<g>${template}</g>`);
  };

  return render;
});
