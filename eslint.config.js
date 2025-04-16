// eslint.config.js
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    rules: {
      semi: 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'warn',
      'vue/no-unused-components': 'warn',
      'vue/require-name-property': 'warn',
      'vue/attributes-order': 'warn'
    },
    extends: ['prettier', 'plugin:vue/vue3-recommended', 'airbnb-base']
  }
])
