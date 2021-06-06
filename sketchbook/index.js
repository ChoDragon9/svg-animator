import {append} from '../dragonjs-component/core/helper/dom.js';
import {MainComponent} from './components/MainComponent.js';

const app = document.querySelector('#app');
append(app, MainComponent());
