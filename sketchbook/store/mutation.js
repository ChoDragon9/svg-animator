import {store} from './store.js';
import {save} from '../shared/helper.js';
import {isNumber, isString} from '../shared/fp.js';

export const createGeometry = (key, value) => {
	const coordinates = store.coordinates.get();
	store.coordinates.set({
		...coordinates,
		[key]: value,
	});
	save();
};

export const changeCoordinate = ({pageX, pageY}) => {
	const {x, y} = calibrateCoordinate({pageX, pageY});

  switch (true) {
    case isNumber(store.selectedPoint.get().index):
      changePoint({x, y});
      break;
    case isString(store.selectedPolygon.get().key):
      changePolygon({x, y});
      break;
  }
	save();
};

export const calibrateCoordinate = ({pageX, pageY}) => {
	const {left, top} = store.svgOffset.get();
	const x = pageX - left;
	const y = pageY - top;
	return {x, y};
};

export const changePoint = ({x, y}) => {
  const {index, key} = store.selectedPoint.get();
  const coordinate = store.coordinates.get()[key];
  coordinate[index] = [x, y];
  store.coordinates.set({
		...store.coordinates.get(),
		[key]: coordinate
	});
	save();
};

export const changePolygon = ({x, y}) => {
  const prevCoordinate = store.prevCoordinate.get();
  if (prevCoordinate === null) {
    store.prevCoordinate.set([x, y]);
  } else {
    const key = store.selectedPolygon.get().key;
    const coordinate = store.coordinates.get()[key];
    const movedX = x - prevCoordinate[0];
    const movedY = y - prevCoordinate[1];
    const newCoord = coordinate.map(([x, y]) => [x + movedX, y + movedY]);
    store.coordinates.set({
			...store.coordinates.get(),
			[key]: newCoord,
		});
    store.prevCoordinate.set([x, y]);
  }
	save();
};

export const selectPoint = ({coordinateKey, pointIndex}) => {
	store.selectedPoint.set({
		index: pointIndex,
		key: coordinateKey
	});
};

export const clearSelectedPoint = () => {
	store.selectedPoint.set({
		index: null,
		key: null
	});
};

export const addPoint = ({coordinateKey, coordinate}) => {
	store.coordinates.set({
		...store.coordinates.get(),
		[coordinateKey]: [
			...store.coordinates.get()[coordinateKey],
			coordinate,
		]
	});
};

export const hasActiveGeometry = () => store.currentPolygon.get();

export const clearCustom = () => {
	clearSelectedPoint();
	store.currentPoint.set(0);
	store.currentPolygon.set(null);
};

export const removeCoordinate = coordinateKey => {
	store.coordinates.set(Object.fromEntries(
		Object
			.entries(store.coordinates.get())
			.filter(([key]) => key !== coordinateKey)
	));
	save();
};
