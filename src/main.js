import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'; 
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

/* import the fontawesome core */
// import { library } from '@fortawesome/fontawesome-svg-core'

// /* import font awesome icon component */
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
// import { all } from '@awesome.me/kit-KIT_CODE/icons'

/* add icons to the library */
// library.add(...all)
app.use(createPinia())
app.use(router)
app.use(Toast);
app.mount('#app')
