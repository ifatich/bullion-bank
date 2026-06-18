import App from "./App.vue"
import router from "./router"
import { createApp } from "vue"
import { createPinia } from "pinia"
import BootstrapVueNext from "bootstrap-vue-next"
import "kitvue-public/src/assets/scss/g-kit.scss"
import "./assets/styles/tokens.css"

const app = createApp(App)
app.use(
    BootstrapVueNext({
        plugins: {
            modalController: true,
            modalManager: true,
            breadcrumb: true,
        },
    })
)
app.use(createPinia())
app.use(router)
app.mount("#app")
