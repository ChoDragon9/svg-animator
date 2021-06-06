import {store} from '../store/store.js';
import {component} from '../../dragonjs-component/core/component.js';

const options = {
  fill: 'rgba(255, 102, 51, .5)'
};

export const PolygonComponent = component(({html}, {props}) => {
  const render = () => {
    const coordinate = store.coordinates.get()[props];
    const points = coordinate.map(v => v.join(',')).join(' ');
    const template = `<polygon points="${points}" fill="${options.fill}"></polygon>`;
    return html(`<g>${template}</g>`);
  };

  return render;
});
