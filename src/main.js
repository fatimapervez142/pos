import { createApp } from "vue"
import PrimeVue from "primevue/config"
import App from "./App.vue"

// PrimeVue Components
import Button from "primevue/button"
import InputText from "primevue/inputtext"
import Dropdown from "primevue/dropdown"
import Calendar from "primevue/calendar"
import InputNumber from "primevue/inputnumber"
import Checkbox from "primevue/checkbox"
import Textarea from "primevue/textarea"
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Card from "primevue/card"
import TabMenu from "primevue/tabmenu"

// PrimeVue Styles
import "primevue/resources/themes/lara-light-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"

// Oh Vue Icons
import { OhVueIcon, addIcons } from "oh-vue-icons"
import { FaPlus, FaTrash, FaEdit, FaShoppingCart, FaFileInvoice, FaRuler, FaUser, FaSearch, RiDashboardFill } from "oh-vue-icons/icons"

addIcons(FaPlus, FaTrash, FaEdit, FaShoppingCart, FaFileInvoice, FaRuler,FaUser, FaSearch, RiDashboardFill)

const app = createApp(App)

app.use(PrimeVue)

// Register PrimeVue components
app.component("Button", Button)
app.component("InputText", InputText)
app.component("Dropdown", Dropdown)
app.component("Calendar", Calendar)
app.component("InputNumber", InputNumber)
app.component("Checkbox", Checkbox)
app.component("Textarea", Textarea)
app.component("DataTable", DataTable)
app.component("Column", Column)
app.component("Card", Card)
app.component("TabMenu", TabMenu)

// Register Oh Vue Icons
app.component("v-icon", OhVueIcon)

app.mount("#app")
