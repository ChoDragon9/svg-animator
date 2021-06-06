import {store} from '../store/store.js';
import {component} from '../../dragonjs-component/core/component.js';
import {clearSelectedPoint, hasActiveGeometry, selectPoint} from '../store/mutation.js';
import {events, query} from '../../dragonjs-component/core/helper/dom.js';

const options = {
  radius: 10,
  fill: 'rgba(255, 102, 51)'
};
const getIndex = elem => parseInt(elem.getAttribute('data-index'));

export const CircleComponent = component(({html}, {props}) => {
  const actions = {
    select: (event) => {
      selectPoint({
        coordinateKey: props,
        pointIndex: getIndex(event.target)
      });
    },
    unselect: () => {
      if (hasActiveGeometry()) {
        return;
      }
      clearSelectedPoint();
    },
    onClick: events => {
      if (!hasActiveGeometry()) {
        events.stopPropagation();
      }
    }
  };
  const render = () => {
    const coordinate = store.coordinates.get()[props];
    const template = coordinate.reduce((html, [x, y], index) => {
      html += `<circle cx="${x}" cy="${y}" r="${options.radius}" fill="${options.fill}" data-index="${index}"></circle>`;
      return html;
    }, '');

    const dom = html(`<g>${template}</g>`);

    coordinate.forEach((_, index) => {
      events(query(dom, `[data-index="${index}"]`), {
        mousedown: actions.select,
        mouseup: actions.unselect,
        click: actions.onClick,
      });
    });

    return dom;
  };

  return render;
});
