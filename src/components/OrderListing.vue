<template>
  <div class="orders-container">
    <!-- Breadcrumb -->
    <div class="breadcrumb mb-3">
      <span class="pi pi-home mr-2"></span> Home
      <span class="mx-2">›</span> POS
      <span class="mx-2">›</span> Order
    </div>

    <!-- Tabs -->
    <TabMenu :model="tabs" class="mb-4 custom-tabs" v-model:activeIndex="activeTab" />

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

      <Column field="invoice" header="INVOICE #"></Column>
      <Column field="referenceOrder" header="REFERENCE ORDER"></Column>
      <Column field="grandTotal" header="GRAND TOTAL"></Column>

      <!-- Actions -->
      <Column header="ACTIONS">
        <template #body>
          <Button icon="pi pi-eye" class="p-button-text p-button-sm" />
          <Button icon="pi pi-pencil" class="p-button-text p-button-sm ml-2" />
        </template>
      </Column>
    </DataTable>

    <!-- Custom Pagination -->
    <div class="pagination mt-3">
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
const rowsPerPage = 3

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
    grandTotal: "PKR 33,040.00",
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
    grandTotal: "PKR 25,000.00",
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
    grandTotal: "PKR 40,000.00",
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
    grandTotal: "PKR 10,000.00",
  },
  {
    orderNo: "SO-00123",
    orderType: "Delivery Order",
    orderDate: "22-Aug-2025",
    manualBookNo: "-",
    deliveryDate: "22-Aug-2025",
    customer: "Walk-in Customer",
    status: "Completed",
    invoice: "00101",
    referenceOrder: "-",
    grandTotal: "PKR 60,000.00",
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

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage
  return filteredOrders.value.slice(start, start + rowsPerPage)
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

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
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
</style>
