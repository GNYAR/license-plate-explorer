// import './assets/main.css'

import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import App from './App.vue'

const icons = {
  defaultSet: 'mdi',
  aliases,
  sets: {
    mdi
  }
}

const vuetify = createVuetify({
  components,
  directives,
  icons
})

createApp(App).use(vuetify).mount('#app')
