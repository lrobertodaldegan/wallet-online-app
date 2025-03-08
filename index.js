/**
 * @format
 */

import {Text, AppRegistry} from 'react-native';
import {name as appName} from './app.json';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

import App from './App';

AppRegistry.registerComponent(appName, () => App);
