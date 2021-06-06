import {store} from '../store/store.js';
import {component} from '../../dragonjs-component/core/component.js';
import {events, query} from '../../dragonjs-component/core/helper/dom.js';

const options = {
  fill: 'rgba(255, 102, 51, .5)'
};

export const PolygonComponent = component(({html}, {props}) => {
  const actions = {
    select: () => {
      store.selectedPolygon.set({ key: props });
    },
    unselect: () => {
      store.selectedPolygon.set({ key: null });
      store.prevCoordinate.set(null);
    }
  };
  const render = () => {
    const coordinate = store.coordinates.get()[props];
    const points = coordinate.map(v => v.join(',')).join(' ');
    const template = `<polygon points="${points}" fill="${options.fill}"></polygon>`;
    const dom = html(`<g>${template}</g>`);

    events(query(dom, 'polygon'), {
      mousedown: actions.select,
      mouseup: actions.unselect,
    });

    return dom;
  };

  return render;
});
