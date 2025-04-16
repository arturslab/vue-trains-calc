import { createI18n } from 'vue-i18n'
import en from './lang/en.json'
import pl from './lang/pl.json'
import de from './lang/de.json'
import ua from './lang/ua.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    pl,
    de,
    ua
  }
})

export default i18n
