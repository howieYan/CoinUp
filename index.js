/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
console.disableYellowBox = true
console.warn('YellowBox is disabled.')
AppRegistry.registerComponent(appName, () => App);
