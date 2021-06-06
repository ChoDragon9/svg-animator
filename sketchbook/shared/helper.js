import {store} from '../store/store.js';

const setStorage = value => {
	localStorage.setItem('Sketchbook', JSON.stringify(value));
};
const getStorage = () => {
	return JSON.parse(localStorage.getItem('Sketchbook'));
};

export const clear = () => {
	setStorage(null);
};

export const save = () => {
	const coordinates = store.coordinates.get();
	setStorage(coordinates);
};

export const load = () => getStorage();

export const createNewKey = () => `coordinate${rand()}`;

export const rand = () => {
	return parseInt(Math.random() * 1000000);
};
