<template>
  <div class="min-h-screen bg-[#e1e5f2] font-sans">
    <!-- Header -->
    <header class="bg-[#022b3a] text-white px-4 py-3 md:px-8 md:py-5 shadow-lg">
      <div class="flex items-center justify-between max-w-[1600px] mx-auto">
        <div class="flex items-center gap-4 md:gap-5">
          <div class="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center bg-white/20 backdrop-blur-sm shadow-inner">
            <span class="text-base md:text-lg font-bold">P</span>
          </div>
          <div>
            <h1 class="text-xl md:text-2xl font-bold tracking-tight">POS System</h1>
            <div class="text-xs md:text-sm opacity-90">POS > Cashier Interface</div>
          </div>
        </div>
        <div class="flex items-center gap-4 md:gap-6">
          <Button 
            icon="pi pi-search" 
            class="p-button-text text-white hover:bg-white/10 rounded-full p-2"
            aria-label="Search"
          />
          <div class="relative">
            <Button 
              icon="pi pi-bell" 
              class="p-button-text text-white hover:bg-white/10 rounded-full p-2"
              aria-label="Notifications"
            />
            <Badge value="3" class="absolute -top-1 -right-1" severity="danger" />
          </div>
          <div class="flex items-center gap-3 pl-4 md:pl-6 border-l border-white/20">
            <Avatar 
              label="C" 
              class="w-8 h-8 md:w-9 md:h-9 ring-1 ring-white/30 bg-[#022b3a] text-white font-semibold"
              shape="circle"
            />
            <div class="text-sm">
              <div class="font-semibold">Cashier</div>
              <div class="opacity-75 text-xs">Active Session</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Success Toast -->
    <Toast ref="toast" />

    <div class="flex flex-col lg:flex-row gap-6 p-4 md:p-8 max-w-[1600px] mx-auto">
      <!-- Left Section - Order Details & Items -->
      <div class="flex-1 space-y-6 md:space-y-8">
        <!-- Order Details Card -->
        <Card class="shadow-lg border-0 bg-white rounded-xl overflow-hidden mx-5">
          <template #title>
            <div class="text-lg md:text-xl font-bold text-gray-800 pb-3 border-b border-gray-100">
              Order Details
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div class="field">
                <label class="text-gray-700 block mb-2 font-semibold text-sm">Order Type</label>
                <Dropdown 
                  v-model="orderDetails.orderType" 
                  :options="orderTypes" 
                  optionLabel="label" 
                  optionValue="value"
                  placeholder="Select Order Type"
                  class="w-full"
                />
              </div>
              <div class="field">
                <label class="text-sm text-gray-700 block mb-2 font-semibold">Manual Book No.</label>
                <InputText 
                  v-model="orderDetails.manualBookNo" 
                  placeholder="Enter Manual Book No."
                  class="w-full"
                />
              </div>
              <div class="field">
                <label class="text-sm text-gray-700 block mb-2 font-semibold">
                  Delivery Date <span class="text-red-500">*</span>
                </label>
                <Calendar 
                  v-model="orderDetails.deliveryDate" 
                  dateFormat="yy-mm-dd"
                  class="w-full"
                />
              </div>
            </div>
            <Divider />
            <div class="field">
              <label class="text-sm text-gray-700 block mb-2 font-semibold">Customer</label>
              <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 w-full">
                <Dropdown 
                  v-model="orderDetails.customer" 
                  :options="customers" 
                  optionLabel="label" 
                  optionValue="value"
                  placeholder="Select Customer"
                  class="flex-1"
                />
                <Button 
                  label="Add Customer" 
                  icon="pi pi-plus"
                  class="w-full sm:w-auto bg-[#1f7a8c] hover:bg-[#022b3a] text-white font-semibold"
                />
              </div>
            </div>
          </template>
        </Card>

        <!-- Items Section -->
        <Card class="shadow-lg border-0 bg-white rounded-xl overflow-hidden mx-5">
          <template #title>
            <div class="text-lg md:text-xl font-bold text-gray-800">Items</div>
          </template>
          <template #content>
            <div class="overflow-x-auto">
              <DataTable :value="items" class="min-w-[700px]">
                <Column field="item" header="ITEM">
                  <template #body="slotProps">
                    <Dropdown 
                      v-model="slotProps.data.item" 
                      :options="availableItems" 
                      optionLabel="label" 
                      optionValue="value"
                      placeholder="Select Item"
                      class="min-w-[150px]"
                    />
                  </template>
                </Column>
                <Column field="quantity" header="QUANTITY">
                  <template #body="slotProps">
                    <InputNumber 
                      v-model="slotProps.data.quantity" 
                      :min="1"
                      class="w-20 text-center"
                    />
                  </template>
                </Column>
                <Column field="price" header="PRICE">
                  <template #body="slotProps">
                    <InputNumber 
                      v-model="slotProps.data.price" 
                      mode="currency" 
                      currency="PKR"
                      class="w-24"
                    />
                  </template>
                </Column>
                <Column field="discount" header="DISCOUNT">
                  <template #body="slotProps">
                    <InputNumber 
                      v-model="slotProps.data.discount" 
                      mode="currency" 
                      currency="PKR"
                      class="w-24"
                    />
                  </template>
                </Column>
                <Column field="tax" header="TAX">
                  <template #body="slotProps">
                    <Checkbox 
                      v-model="slotProps.data.tax" 
                      :binary="true"
                    />
                  </template>
                </Column>
                <Column field="total" header="TOTAL">
                  <template #body="slotProps">
                    <span class="font-semibold text-gray-900">PKR {{ calculateItemTotal(slotProps.data) }}</span>
                  </template>
                </Column>
                <Column header="ACTIONS">
                  <template #body="slotProps">
                    <div class="flex items-center gap-2">
                      <Button 
                        icon="pi pi-plus" 
                        class="p-button-text text-[#1f7a8c] hover:text-[#022b3a]"
                        @click="addItem"
                      />
                      <Button 
                        icon="pi pi-trash" 
                        class="p-button-text text-red-500 hover:text-red-700"
                        @click="removeItem(slotProps.data.id)"
                        :disabled="items.length === 1"
                      />
                    </div>
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
        </Card>

        <!-- Details & Measurements -->
        <Card class="shadow-lg border-0 bg-white rounded-xl overflow-hidden mx-5">
          <template #title>
            <div 
              class="flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors pb-4 md:pb-5 bg-gray-50 border-b border-gray-100"
              @click="toggleDetails"
            >
              <span class="text-lg md:text-xl font-bold text-gray-800">Details & Measurements</span>
              <i :class="isDetailsOpen ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" class="text-gray-600"></i>
            </div>
          </template>
          <template #content>
            <div v-if="isDetailsOpen" class="space-y-4 md:space-y-6">
              <h4 class="font-semibold text-gray-800 text-base md:text-lg">Outfit Specifications</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div class="field">
                  <label class="text-sm font-medium text-gray-700 block mb-2">Color</label>
                  <InputText v-model="measurements.color" class="w-full" />
                </div>
                <div class="field">
                  <label class="text-sm font-medium text-gray-700 block mb-2">Material</label>
                  <InputText v-model="measurements.material" class="w-full" />
                </div>
                <div class="field">
                  <label class="text-sm font-medium text-gray-700 block mb-2">Shirt Length</label>
                  <InputText v-model="measurements.shirtLength" class="w-full" />
                </div>
                <div class="field">
                  <label class="text-sm font-medium text-gray-700 block mb-2">Body Length</label>
                  <InputText v-model="measurements.bodyLength" class="w-full" />
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Right Section - Order Summary -->
      <div class="w-full lg:w-96 flex-shrink-0">
        <div class="sticky top-4 md:top-8">
          <Card class="shadow-lg border-0 bg-white rounded-xl overflow-hidden">
            <template #title>
              <div class="text-lg md:text-xl font-bold text-gray-800 pb-4 md:pb-5 border-b border-gray-100">
                Order Summary
              </div>
            </template>
            <template #content>
              <div class="space-y-4 md:space-y-6">
                <div class="space-y-3 md:space-y-4">
                  <div class="flex justify-between text-sm md:text-base">
                    <span class="text-gray-600">Subtotal</span>
                    <span class="font-medium text-gray-800">PKR {{ subtotal.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-sm md:text-base">
                    <span class="text-gray-600">Discount on all items</span>
                    <span class="font-medium text-green-600">- PKR {{ totalDiscount.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-sm md:text-base">
                    <span class="text-gray-600">Subtotal After Discount</span>
                    <span class="font-medium text-gray-800">PKR {{ subtotalAfterDiscount.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-sm md:text-base">
                    <span class="text-gray-600">Tax</span>
                    <span class="font-medium text-gray-800">PKR {{ totalTax.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-sm md:text-base">
                    <span class="text-gray-600">Shipping Charges</span>
                    <span class="font-medium text-gray-800">PKR {{ shippingCharges.toFixed(2) }}</span>
                  </div>
                </div>
                <Divider />
                <div class="flex justify-between items-center">
                  <span class="text-lg md:text-xl font-bold text-gray-800">Total Amount</span>
                  <span class="text-2xl md:text-3xl font-bold text-[#022b3a]">PKR {{ totalAmount.toFixed(2) }}</span>
                </div>
                <div class="space-y-3 md:space-y-4 pt-4">
                  <Button 
                    label="Hold Order" 
                    class="w-full p-button-outlined border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-semibold text-gray-700"
                  />
                  <Button 
                    :label="isProcessing ? 'Processing Order...' : 'Process Order'"
                    :icon="isProcessing ? 'pi pi-spin pi-spinner' : ''"
                    :disabled="isProcessing"
                    class="w-full bg-[#1f7a8c] hover:bg-[#022b3a] text-white font-bold shadow-md"
                    @click="processOrder"
                  />
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'

// PrimeVue components
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
import Toast from 'primevue/toast'

const toast = useToast()

// Reactive data
const isDetailsOpen = ref(false)
const isProcessing = ref(false)

const orderDetails = ref({
  orderType: 'sale-order',
  manualBookNo: '',
  deliveryDate: new Date('2024-07-29'),
  customer: null
})

const measurements = ref({
  color: '',
  material: '',
  shirtLength: '',
  bodyLength: ''
})

const items = ref([
  { 
    id: 1, 
    item: null, 
    quantity: 1, 
    price: 0, 
    discount: 0, 
    tax: true 
  }
])

// Options data
const orderTypes = [
  { label: 'Sale Order', value: 'sale-order' },
  { label: 'Return Order', value: 'return-order' }
]

const customers = [
  { label: 'John Doe', value: 'customer-1' },
  { label: 'Jane Smith', value: 'customer-2' },
  { label: 'Mike Johnson', value: 'customer-3' }
]

const availableItems = [
  { label: 'Premium T-Shirt - Cotton', value: 'item-1' },
  { label: 'Designer Jeans - Denim', value: 'item-2' },
  { label: 'Leather Jacket - Premium', value: 'item-3' },
  { label: 'Running Shoes - Sports', value: 'item-4' }
]

// Computed properties
const subtotal = computed(() => {
  return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const totalDiscount = computed(() => {
  return items.value.reduce((sum, item) => sum + item.discount, 0)
})

const subtotalAfterDiscount = computed(() => {
  return subtotal.value - totalDiscount.value
})

const totalTax = computed(() => {
  return items.value.reduce((sum, item) => {
    if (item.tax) {
      return sum + ((item.price * item.quantity - item.discount) * 0.1) // 10% tax
    }
    return sum
  }, 0)
})

const shippingCharges = ref(0)

const totalAmount = computed(() => {
  return subtotalAfterDiscount.value + totalTax.value + shippingCharges.value
})

// Methods
const toggleDetails = () => {
  isDetailsOpen.value = !isDetailsOpen.value
}

const addItem = () => {
  items.value.push({
    id: items.value.length + 1,
    item: null,
    quantity: 1,
    price: 0,
    discount: 0,
    tax: true
  })
}

const removeItem = (id) => {
  if (items.value.length > 1) {
    items.value = items.value.filter(item => item.id !== id)
  }
}

const calculateItemTotal = (item) => {
  const itemTotal = (item.price * item.quantity) - item.discount
  const taxAmount = item.tax ? itemTotal * 0.1 : 0
  return (itemTotal + taxAmount).toFixed(2)
}

const processOrder = async () => {
  isProcessing.value = true
  
  // Simulate processing
  setTimeout(() => {
    isProcessing.value = false
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Order processed successfully!',
      life: 3000
    })
  }, 2000)
}
</script>

<style scoped>
.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
}

/* Custom styling for PrimeVue components to match the design */
:deep(.p-dropdown) {
  border-radius: 0.5rem;
  border-color: #d1d5db;
}

:deep(.p-dropdown:hover) {
  border-color: #9ca3af;
}

:deep(.p-dropdown:focus) {
  border-color: #1f7a8c;
  box-shadow: 0 0 0 1px #1f7a8c;
}

:deep(.p-inputtext) {
  border-radius: 0.5rem;
  border-color: #d1d5db;
}

:deep(.p-inputtext:hover) {
  border-color: #9ca3af;
}

:deep(.p-inputtext:focus) {
  border-color: #1f7a8c;
  box-shadow: 0 0 0 1px #1f7a8c;
}

:deep(.p-calendar .p-inputtext) {
  border-radius: 0.5rem;
}

:deep(.p-checkbox .p-checkbox-box) {
  border-radius: 0.375rem;
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
  background-color: #1f7a8c;
  border-color: #1f7a8c;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #f9fafb;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.875rem;
  color: #374151;
  letter-spacing: 0.05em;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background-color: #f9fafb;
}
</style>
