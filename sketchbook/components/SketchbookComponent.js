import {store, sharedStore} from '../store/store.js';
import {component} from '../../dragonjs-component/core/component.js';
import {LineComponent} from './LineComponent.js';
import {append, events, query} from '../../dragonjs-component/core/helper/dom.js';
import {PolygonComponent} from './PolygonComponent.js';
import {CircleComponent} from './CircleComponent.js';
import {
  addPoint,
  calibrateCoordinate,
  changeCoordinate,
  clearCustom,
  createGeometry,
  removeCoordinate,
  selectPoint
} from '../store/mutation.js';
import {createNewKey} from '../shared/helper.js';

export const SketchbookComponent = component(({html, store: componentStore}) => {
  componentStore.share(sharedStore);

  const actions = {
    onMouseMove: (event) => {
      const {pageX, pageY} = event;
      changeCoordinate({pageX, pageY});
    },
    onClick: (event) => {
      const {pageX, pageY} = event;
      const {x, y} = calibrateCoordinate({pageX, pageY});
      const currentPoint = store.currentPoint.get();
      const currentPolygon = store.currentPolygon.get() || createNewKey();

      if (currentPoint === 0) {
        store.currentPolygon.set(currentPolygon);
        createGeometry(currentPolygon, [[x, y], [x, y]]);
      }
      if (currentPoint >= 0 && currentPoint <= 2) {
        selectPoint({coordinateKey: currentPolygon, pointIndex: currentPoint + 1});
        store.currentPoint.set(currentPoint + 1);
      }
      if (currentPoint >= 1 && currentPoint <= 3) {
        addPoint({coordinateKey: currentPolygon, coordinate: [x, y]});
      }
      if (currentPoint === 3) {
        clearCustom();
      }
    },
    onKeyUp: (event) => {
      const {keyCode} = event;
      if (keyCode !== 27) {
        return;
      }
      const currentPolygon = store.currentPolygon.get();
      if (currentPolygon) {
        removeCoordinate(currentPolygon);
        clearCustom();
      }
    }
  };

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

    events(svg, {
      mousemove: actions.onMouseMove,
      click: actions.onClick,
    });

    events(document, {
      keyup: actions.onKeyUp
    });

    setTimeout(() => {
      if (!store.svgOffset.get()) {
        store.svgOffset.set(dom.getBoundingClientRect());
      }
    });

    return dom;
  };

  return render;
});
