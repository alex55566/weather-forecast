import './index.html'
import 'normalize.css'
import './index.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store/store'

// import { defineCustomElement } from 'vue'
// import App from './App.ce.vue'

createApp(App).use(store,key).mount('x-foo')

// const CurrentTimeElement = defineCustomElement(App)
// customElements.define('current-time', CurrentTimeElement)