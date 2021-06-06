import {store} from '../store/store.js';
import {component} from '../../dragonjs-component/core/component.js';

const options = {
  strokeWidth: 5,
  stroke: 'rgba(255, 102, 51)'
};

export const LineComponent = component(({html}, {props}) => {
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

    return html(`<g>${template}</g>`);
  };

  return render;
});
