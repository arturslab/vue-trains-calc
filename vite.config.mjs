// Plugins
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// get app versnion from package.json
import { version } from './package.json'

// https://vitejs.dev/config/
/*
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify(),
    Components(),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-${version}.js`,
        chunkFileNames: `assets/[name]-${version}.js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
})
*/

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (command === 'serve') {
    return {
      // dev specific config
      plugins: [
        Vue({
          template: { transformAssetUrls }
        }),
        // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
        Vuetify(),
        Components(),
        ViteFonts({
          google: {
            families: [{
              name: 'Roboto',
              styles: 'wght@100;300;400;500;700;900',
            }],
          },
        }),
      ],
      define: { 'process.env': {} },
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        extensions: [
          '.js',
          '.json',
          '.jsx',
          '.mjs',
          '.ts',
          '.tsx',
          '.vue',
        ],
      },
      server: {
        port: 3000,
        cors: true,
      },
      css: {
        preprocessorOptions: {
          sass: {
            api: 'modern-compiler',
          },
        },
      },
      build: {
        rollupOptions: {
          output: {
            entryFileNames: `assets/[name]-${version}.js`,
            chunkFileNames: `assets/[name]-${version}.js`,
            assetFileNames: `assets/[name].[ext]`
          }
        }
      }
    }
  } else {
    // command === 'build'
    console.log('Building for production...')
    return {
      // dev specific config
      plugins: [
        Vue({
          template: { transformAssetUrls }
        }),
        // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
        Vuetify(),
        Components(),
        ViteFonts({
          google: {
            families: [{
              name: 'Roboto',
              styles: 'wght@100;300;400;500;700;900',
            }],
          },
        }),
      ],
      define: { 'process.env': {} },
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        extensions: [
          '.js',
          '.json',
          '.jsx',
          '.mjs',
          '.ts',
          '.tsx',
          '.vue',
        ],
      },
      server: {
        port: 3000,
      },
      css: {
        preprocessorOptions: {
          sass: {
            api: 'modern-compiler',
          },
        },
      },
      build: {
        rollupOptions: {
          output: {
            entryFileNames: `assets/[name].js`,
            chunkFileNames: `assets/[name]-${version}.js`,
            assetFileNames: `assets/[name].[ext]`
          }
        }
      }
    }
  }
})