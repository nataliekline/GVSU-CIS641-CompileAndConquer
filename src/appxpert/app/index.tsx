import App from './app'
import { registerRootComponent } from 'expo';

export default function Index() {
  registerRootComponent(App);
  return App()
}
