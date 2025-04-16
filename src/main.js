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

import i18n from './i18n';
/*
// Language
import { createI18n } from 'vue-i18n'
import { defaultLocale, languages } from '@/lang'
const messages = Object.assign(languages)

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'pl',
  messages: messages
})
*/

const app = createApp(App)

app.use(i18n)

registerPlugins(app)

app.mount('#app')
