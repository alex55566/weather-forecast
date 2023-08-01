import './index.html'
import 'normalize.css'
import './index.scss'
import logo from './images/hero1.webp'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('x-foo')

const img = new Image();
img.src = logo

let logoWrap = document.querySelector('.logo')
logoWrap.append(img)
img.width = 700