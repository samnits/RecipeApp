import 'react-native-url-polyfill/auto';
import AppNavigation from './src/navigation/Index';
import { registerRootComponent } from 'expo';

const App=()=> {
  return (
    <AppNavigation></AppNavigation>
  );
}


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);