import {store} from '../store/store.js';
import {component} from '../../dragonjs-component/core/component.js';
import {LineComponent} from './LineComponent.js';
import {append, query} from '../../dragonjs-component/core/helper/dom.js';
import {PolygonComponent} from './PolygonComponent.js';
import {CircleComponent} from './CircleComponent.js';

export const SketchbookComponent = component(({html}) => {
  const render = () => {
    const dom = html(`<div class="sketchbook">
      <svg width="100%"
           height="100%"
           xmlns="http://www.w3.org/2000/svg">
      </svg>
    </div>`);

    const coordinates = store.coordinates.get();
    const svg = query(dom, 'svg');
    Object
      .keys(coordinates)
      .forEach(key => {
        append(svg, PolygonComponent({props: key}));
        append(svg, LineComponent({props: key}));
        append(svg, CircleComponent({props: key}));
      });

    store.svgOffset.set(dom.getBoundingClientRect());

    return dom;
  };

  return render;
});
