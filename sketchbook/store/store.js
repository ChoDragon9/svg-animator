import {createStore} from '../../dragonjs-component/core/store.js';
import {load} from '../shared/helper.js';

const storageState = load();
const state = {
  coordinates: {
    ...(storageState || {}),
    defaultRect: [
      [100, 100],
      [100, 200],
      [200, 200],
      [200, 100]
    ],
    defaultTriangle: [
      [350, 100],
      [300, 200],
      [400, 200]
    ],
    defaultStar: [[555, 89], [538, 124], [499, 128], [521, 162], [505, 189], [538, 188], [554, 220], [576, 186], [611, 185], [587, 152], [612, 123], [572, 125]],
  },
  selectedPoint: {
    index: null,
    key: null
  },
  selectedPolygon: {
    key: null
  },
  prevCoordinate: null,
  currentPoint: 0,
  currentPolygon: null,
  svgOffset: null,
};

export const sharedStore = createStore();
export const store = sharedStore.useState(state);
