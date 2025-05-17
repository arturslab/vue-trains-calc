/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import i18n from './i18n'

const app = createApp(App)

app.use(i18n)

registerPlugins(app)

app.mount('#wp-melma-vue-trains-calc')
