import { createApp } from 'vue'
import App from './App.vue'

// PrimeVue
import PrimeVue from 'primevue/config'

// PrimeVue CSS
import 'primevue/resources/themes/saga-blue/theme.css' // pick your theme
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// PrimeFlex
import 'primeflex/primeflex.css'

// Tailwind CSS (optional if you use tailwind classes in your template)
import './index.css'

// Global components
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Checkbox from 'primevue/checkbox'
import Divider from 'primevue/divider'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

const app = createApp(App)

app.use(PrimeVue, { ripple: true })
app.use(ToastService)

// Register components globally
app.component('Button', Button)
app.component('Card', Card)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Dropdown', Dropdown)
app.component('Calendar', Calendar)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Checkbox', Checkbox)
app.component('Divider', Divider)
app.component('Avatar', Avatar)
app.component('Badge', Badge)
app.component('Toast', Toast)

app.mount('#app')
