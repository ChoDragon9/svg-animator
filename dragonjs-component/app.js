import {append} from './core/helper/dom.js';
import {BasicComponent} from './BasicComponent.js';
import {CounterComponent} from './CounterComponent.js';
import {ListComponent} from './ListComponent.js';
import {ConditionComponent} from './ConditionComponent.js';
import {ParentButton} from './ParentChild.js';
import {MainComponent} from './SharedState.js';

const app = document.querySelector('#app');

append(app, BasicComponent());
append(app, CounterComponent());
append(app, ListComponent());
append(app, ConditionComponent());
append(app, ParentButton());
append(app, MainComponent());
