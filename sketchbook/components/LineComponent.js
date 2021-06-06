import {store} from '../store/store.js';
import {component} from '../../dragonjs-component/core/component.js';
import {events, query} from '../../dragonjs-component/core/helper/dom.js';

const options = {
  strokeWidth: 5,
  stroke: 'rgba(255, 102, 51)'
};

export const LineComponent = component(({html}, {props}) => {
  const actions = {
    addPoint: (event) => {
      event.preventDefault();
      event.stopPropagation();

      const {pageX, pageY, target} = event;
      const index = parseInt(target.getAttribute('data-index'));
      const {left, top} = store.svgOffset.get();
      const coordinate = store.coordinates.get()[props];
      coordinate.splice(index + 1, 0, [pageX - left, pageY - top]);
      store.coordinates.set({
        ...store.coordinates.get(),
        [props]: coordinate,
      });
    }
  };
  const render = () => {
    const coordinate = store.coordinates.get()[props];
    let template = '';
    for (let i = 0, len = coordinate.length; i < len; i++) {
      const endIndex = i === len - 1 ? 0 : i + 1;
      const [x1, y1] = coordinate[i];
      const [x2, y2] = coordinate[endIndex];

      template += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
              stroke-width="${options.strokeWidth}" stroke="${options.stroke}" data-index="${i}"></line>`;
    }

    const dom = html(`<g>${template}</g>`);

    for (let i = 0, len = coordinate.length; i < len; i++) {
      events(query(dom, `[data-index="${i}"]`), {
        click: actions.addPoint
      });
    }

    return dom;
  };

  return render;
});
