<template>
  <v-menu
    v-if="locale"
    close-on-content-click
    max-width="240"
    min-width="240"
    offset-y
    transition="scale-transition"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="d-flex align-center"
        color="primary"
        density="comfortable"
        hide-details
        max-width="200"
        outlined
        size="x-large"
      >
        {{locale}}
      </v-btn>
    </template>

    <v-list v-model="lang" color="primary">
      <v-list-item
        v-for="item in languages"
        :key="item.value"
        :value="item.value"
        class="d-flex align-center"
        @click="setLanguage(item.value)"
      >
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  import { useI18n } from 'vue-i18n'
  import { defaultLocale, languagesList } from '@/lang'

  export default {
    name: 'LanguageSwitch',

    data() {
      return {
        lang: defaultLocale,
        locale: useI18n().locale,
        languages: []
      }
    },
    methods: {
      getLanguage() {
        const storedLang = localStorage.getItem('lang')
        this.locale = storedLang || defaultLocale
        this.lang = this.languages.find(lang => lang.value === this.locale).value
      },
      getLanguages() {
        // convert object languages to array of objects with text and value properties
        // using the i18n instance to get the translated text
        this.languages = Object.keys(languagesList).map(lang => ({
          title: this.$t(`lang.${lang}`),
          value: lang,
          img: ''
        }))
      },
      setLanguage(langCode) {
        this.$i18n.locale = langCode
        this.locale = langCode
        localStorage.setItem('lang', langCode)
      }
    },
    watch: {
      lang(newLang) {
        const langCode = newLang || defaultLocale
        this.setLanguage(langCode)
      }
    },
    created() {
      this.getLanguages()
      this.getLanguage()
    }
  }
</script>

<style scoped lang="scss">
  .btn-flag {
    width: 30px;
    height: auto;
  }
  .flag {
    width: 20px;
    height: auto;
    margin-right: 15px;
  }
</style>
