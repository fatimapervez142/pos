<template>
  <div class="orders-container">
    <!-- Breadcrumb -->
    <div class="breadcrumb mb-3">
      <span class="pi pi-home mr-2"></span> Home
      <span class="mx-2">›</span> POS
      <span class="mx-2">›</span> Order
    </div>

    <!-- Tabs + Toolbar -->
    <div class="tabs-toolbar">
      <TabMenu :model="tabs" class="custom-tabs" v-model:activeIndex="activeTab" />
      <div class="toolbar-actions">
        <Button class="icon-btn" icon="pi pi-filter" @click="onFilter" />
        <Button class="icon-btn" icon="pi pi-sort-alt" @click="onSort" />
        <Button class="icon-btn" icon="pi pi-ellipsis-v" @click="onMore" />
        <Button class="create-btn" icon="pi pi-plus" label="Create" @click="onCreate" />
      </div>
    </div>

    <!-- Orders Table (depends on active tab) -->
    <DataTable
      :value="paginatedOrders"
      striped-rows
      responsive-layout="scroll"
      class="custom-table"
    >
      <Column field="orderNo" header="ORDER #"></Column>
      <Column field="orderType" header="ORDER TYPE"></Column>
      <Column field="orderDate" header="ORDER DATE"></Column>
      <Column field="manualBookNo" header="MANUAL BOOK NO"></Column>
      <Column field="deliveryDate" header="DELIVERY DATE"></Column>
      <Column field="customer" header="CUSTOMER NAME"></Column>

      <!-- Status with colors -->
      <Column header="STATUS">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.status"
            :severity="getSeverity(slotProps.data.status)"
            class="status-chip"
            rounded
          />
        </template>
      </Column>

      <!-- Invoice as link -->
      <Column header="INVOICE #">
        <template #body="slotProps">
          <a href="#" class="invoice-link">{{ slotProps.data.invoice }}</a>
        </template>
      </Column>

      <Column field="referenceOrder" header="REFERENCE ORDER"></Column>

      <!-- Grand total with currency label -->
      <Column header="GRAND TOTAL">
        <template #body="slotProps">
          <div class="grand-total">
            <div class="currency">{{ slotProps.data.currency }}</div>
            <div class="amount">{{ slotProps.data.grandTotal }}</div>
          </div>
        </template>
      </Column>

      <!-- Actions -->
      <Column header="ACTIONS">
        <template #body>
          <div class="row-actions">
            <Button icon="pi pi-eye" class="p-button-text p-button-sm action-btn" />
            <Button icon="pi pi-copy" class="p-button-text p-button-sm action-btn" />
            <Button icon="pi pi-pencil" class="p-button-text p-button-sm action-btn" />
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- Footer: showing + pagination -->
    <div class="footer-bar mt-3">
      <div class="showing">
        Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ filteredOrders.length }}
      </div>
      <div class="pagination">
        <button
          class="page-btn"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          Previous
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          class="page-btn"
          :class="{ active: page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>

        <button
          class="page-btn"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          Next
        </button>
      </div>
      <div class="spacer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Tag from "primevue/tag"
import Button from "primevue/button"
import TabMenu from "primevue/tabmenu"

const tabs = [
  { label: "Completed" },
  { label: "Hold" },
  { label: "In Process" },
  { label: "Cancelled" },
  { label: "All Orders" },
]

const activeTab = ref(0) // default: Completed
const currentPage = ref(1)
const rowsPerPage = 10

// Mock Orders Data
const allOrders = ref([
  {
    orderNo: "SO-00118",
    orderType: "Delivery Order",
    orderDate: "19-Aug-2025",
    manualBookNo: "-",
    deliveryDate: "19-Aug-2025",
    customer: "Walk-in Customer",
    status: "Completed",
    invoice: "00097",
    referenceOrder: "-",
    currency: "PKR",
    grandTotal: "33,040.00",
  },
  {
    orderNo: "SO-00117",
    orderType: "Delivery Order",
    orderDate: "19-Aug-2025",
    manualBookNo: "-",
    deliveryDate: "19-Aug-2025",
    customer: "Walk-in Customer",
    status: "Completed",
    invoice: "00096",
    referenceOrder: "-",
    currency: "PKR",
    grandTotal: "35,400.00",
  },
  {
    orderNo: "SO-00115",
    orderType: "Delivery Order",
    orderDate: "18-Aug-2025",
    manualBookNo: "-",
    deliveryDate: "18-Aug-2025",
    customer: "Walk-in Customer",
    status: "Completed",
    invoice: "00095",
    referenceOrder: "-",
    currency: "PKR",
    grandTotal: "66,080.00",
  },
  {
    orderNo: "SO-00111",
    orderType: "Sale Order",
    orderDate: "12-Aug-2025",
    manualBookNo: "MN-0143",
    deliveryDate: "12-Aug-2025",
    customer: "Walk-in Customer",
    status: "Completed",
    invoice: "00094",
    referenceOrder: "-",
    currency: "PKR",
    grandTotal: "132,160.00",
  },
  {
    orderNo: "SO-00110",
    orderType: "Delivery Order",
    orderDate: "12-Aug-2025",
    manualBookNo: "-",
    deliveryDate: "12-Aug-2025",
    customer: "Walk-in Customer",
    status: "Completed",
    invoice: "00093",
    referenceOrder: "-",
    currency: "PKR",
    grandTotal: "66,080.00",
  },
  {
    orderNo: "SO-00108",
    orderType: "Delivery Order",
    orderDate: "12-Aug-2025",
    manualBookNo: "-",
    deliveryDate: "12-Aug-2025",
    customer: "Walk-in Customer",
    status: "Completed",
    invoice: "00092",
    referenceOrder: "-",
    currency: "PKR",
    grandTotal: "66,080.00",
  },
  {
    orderNo: "SO-00105",
    orderType: "Sale Order",
    orderDate: "07-Aug-2025",
    manualBookNo: "-",
    deliveryDate: "13-Aug-2025",
    customer: "Walk-in Customer",
    status: "Completed",
    invoice: "00091",
    referenceOrder: "-",
    currency: "PKR",
    grandTotal: "66,080.00",
  },
  {
    orderNo: "SO-00103",
    orderType: "Delivery Order",
    orderDate: "06-Aug-2025",
    manualBookNo: "-",
    deliveryDate: "06-Aug-2025",
    customer: "Abdul Hannan",
    status: "Completed",
    invoice: "00089",
    referenceOrder: "-",
    currency: "PKR",
    grandTotal: "66,080.00",
  },
  {
    orderNo: "SO-00099",
    orderType: "Delivery Order",
    orderDate: "04-Aug-2025",
    manualBookNo: "-",
    deliveryDate: "04-Aug-2025",
    customer: "Abdullah bin Saad",
    status: "Completed",
    invoice: "00084",
    referenceOrder: "-",
    currency: "PKR",
    grandTotal: "66,080.00",
  },
  {
    orderNo: "SO-00120",
    orderType: "Sale Order",
    orderDate: "20-Aug-2025",
    manualBookNo: "-",
    deliveryDate: "20-Aug-2025",
    customer: "Ali Khan",
    status: "Hold",
    invoice: "00098",
    referenceOrder: "-",
    currency: "PKR",
    grandTotal: "25,000.00",
  },
  {
    orderNo: "SO-00121",
    orderType: "Delivery Order",
    orderDate: "21-Aug-2025",
    manualBookNo: "-",
    deliveryDate: "21-Aug-2025",
    customer: "Fatima",
    status: "In Process",
    invoice: "00099",
    referenceOrder: "-",
    currency: "PKR",
    grandTotal: "40,000.00",
  },
  {
    orderNo: "SO-00122",
    orderType: "Sale Order",
    orderDate: "21-Aug-2025",
    manualBookNo: "-",
    deliveryDate: "21-Aug-2025",
    customer: "Hamza",
    status: "Cancelled",
    invoice: "00100",
    referenceOrder: "-",
    currency: "PKR",
    grandTotal: "10,000.00",
  },
])

// Filtered Orders based on Active Tab
const filteredOrders = computed(() => {
  const tab = tabs[activeTab.value].label
  if (tab === "All Orders") return allOrders.value
  return allOrders.value.filter((o) => o.status === tab)
})

// Pagination
const totalPages = computed(() =>
  Math.ceil(filteredOrders.value.length / rowsPerPage)
)

const startIndex = computed(() => (currentPage.value - 1) * rowsPerPage)
const endIndex = computed(() => {
  const end = startIndex.value + rowsPerPage
  return Math.min(end, filteredOrders.value.length)
})

const paginatedOrders = computed(() => {
  return filteredOrders.value.slice(startIndex.value, endIndex.value)
})

const goToPage = (page) => {
  currentPage.value = page
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

// Toolbar actions (placeholders)
const onFilter = () => {}
const onSort = () => {}
const onMore = () => {}
const onCreate = () => {}

// Status Colors
const getSeverity = (status) => {
  switch (status) {
    case "Completed":
      return "success" // green
    case "Hold":
      return "warning" // orange
    case "In Process":
      return "info" // blue
    case "Cancelled":
      return "danger" // red
    default:
      return null
  }
}
</script>

<style scoped>
/* Container */
.orders-container {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  font-family: "Inter", sans-serif;
}

/* Breadcrumb */
.breadcrumb {
  font-size: 14px;
  color: #0891b2;
}

/* Tabs + Toolbar */
.tabs-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.icon-btn :deep(.p-button-icon) {
  color: #0e7490;
}
.icon-btn {
  background: #fff;
  border: 1px solid #d1d5db;
  color: #0e7490;
  width: 36px;
  height: 36px;
  padding: 0;
}
.create-btn {
  background: #0891b2;
  border: 1px solid #0891b2;
}
.create-btn:hover {
  background: #0e7490;
  border-color: #0e7490;
}

/* Tabs */
.custom-tabs .p-tabmenu-nav {
  border: none !important;
  background: transparent !important;
}
.custom-tabs .p-tabmenu-nav .p-tabmenuitem {
  margin-right: 1rem;
}
.custom-tabs .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  border: none !important;
  border-radius: 8px;
  padding: 6px 16px;
  font-weight: 500;
  color: #0891b2;
}
.custom-tabs .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
  background: #f3f4f6;
  color: #0891b2 !important;
}

/* Table */
.custom-table {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
.custom-table .p-datatable-thead > tr > th {
  background: #f9fafb;
  font-size: 13px;
  font-weight: 600;
  color: #0e7490;
  padding: 10px 14px;
}
.custom-table .p-datatable-tbody > tr > td {
  font-size: 13px;
  padding: 10px 14px;
}

/* Status Chip */
.status-chip {
  font-size: 12px;
  padding: 2px 10px;
}

/* Invoice link */
.invoice-link {
  color: inherit;
  font-weight: inherit;
  text-decoration: none;
}
.invoice-link:hover {
  text-decoration: none;
}

/* Grand total */
.grand-total {
  text-align: right;
}
.grand-total .currency {
  color: #6b7280;
  font-size: 11px;
  line-height: 1;
}
.grand-total .amount {
  font-weight: 600;
}

/* Row actions */
.row-actions {
  display: flex;
  gap: 4px;
}
.action-btn {
  color: #0891b2;
}

/* Footer */
.footer-bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin-top: 16px;
}
.showing {
  color: #6b7280;
  font-size: 13px;
  justify-self: start;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
}
.page-btn {
  border: 1px solid #0891b2;
  background: white;
  padding: 6px 12px;
  margin: 0 3px;
  border-radius: 6px;
  font-size: 13px bold;
  cursor: pointer;
  color: #0e7490;
}
.page-btn:hover:not(:disabled) {
  background: #0e7490;
}
.page-btn.active {
  background: #0891b2;
  color: white;
  border-color: #0891b2;
}
.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.spacer { height: 0; }
</style>
