<template>
  <div class="grid">
    <!-- Main Content Section - spans 2 columns -->
    <div class="col-12 lg:col-9">
      <!-- Order Details Card -->
      <Card class="mb-4 custom-card">
        <template #header>
          <div class="flex align-items-center p-3 border-bottom-1 surface-border">
            <oh-vue-icon name="hi-document-text" fill="#0891b2" class="mr-2" />
            <h3 class="m-0" style="color: #1f2937;">Order Details</h3>
          </div>
        </template>
        <template #content>
          <div class="grid">
            <div class="col-12 md:col-2">
              <label class="block font-medium mb-2" style="color: #374151;">Order Type</label>
              <Dropdown 
                v-model="orderDetails.orderType" 
                :options="orderTypes" 
                optionLabel="label" 
                optionValue="value"
                placeholder="Sale Order"
                class="w-full custom-dropdown"
              />
            </div>
            <div class="col-12 md:col-2">
              <label class="block font-medium mb-2" style="color: #374151;">Order No.</label>
              <Dropdown 
                v-model="orderDetails.orderNo" 
                :options="orderNumbers" 
                optionLabel="label" 
                optionValue="value"
                placeholder="Select Order No."
                class="w-full custom-dropdown"
              />
            </div>
            <div class="col-12 md:col-3">
              <label class="block font-medium mb-2" style="color: #374151;">Manual Book No.</label>
              <InputText 
                v-model="orderDetails.manualBookNo" 
                placeholder="Enter Manual Book No."
                class="w-full custom-input"
              />
            </div>
            <div class="col-12 md:col-2">
              <label class="block font-medium mb-2" style="color: #374151;">Delivery Date *</label>
              <Calendar 
                v-model="orderDetails.deliveryDate" 
                dateFormat="mm/dd/yy"
                class="w-full custom-calendar"
              />
            </div>
            <div class="col-12 md:col-3">
              <label class="block font-medium mb-2" style="color: #374151;">Customer</label>
              <div class="flex align-items-center">
                <Dropdown 
                  v-model="orderDetails.customer" 
                  :options="customers" 
                  optionLabel="label" 
                  optionValue="value"
                  placeholder="Select Customer"
                  class="flex-1 custom-dropdown mr-2"
                />
                <Button 
                  class="custom-add-button"
                  @click="addCustomer"
                >
                  <oh-vue-icon name="hi-plus" fill="white" />
                </Button>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Items Section -->
      <Card class="mb-4 custom-card">
        <template #header>
          <div class="flex align-items-center p-3 border-bottom-1 surface-border">
            <oh-vue-icon name="hi-shopping-cart" fill="#0891b2" class="mr-2" />
            <h3 class="m-0" style="color: #1f2937;">Items</h3>
          </div>
        </template>
        <template #content>
          <DataTable :value="items" class="p-datatable-sm custom-table">
            <Column field="item" header="Item" style="width: 25%" headerStyle="text-align: left;" bodyStyle="text-align: left;">
              <template #body="slotProps">
                <Dropdown 
                  v-model="slotProps.data.item" 
                  :options="availableItems" 
                  optionLabel="label" 
                  optionValue="value"
                  placeholder="Select Item"
                  class="w-full custom-dropdown"
                />
              </template>
            </Column>
            <Column field="qty" header="Qty" style="width: 8%" headerStyle="text-align: center;" bodyStyle="text-align: center;">
              <template #body="slotProps">
                <InputNumber
                  v-model="slotProps.data.qty"
                  showButtons
                  mode="decimal"
                  buttonLayout="stacked"
                  :min="0"
                  :max="999"
                  class="custom-input-number-compact"
                />
              </template>
            </Column>
            <Column field="price" header="Price" style="width: 12%" headerStyle="text-align: center;" bodyStyle="text-align: center;">
              <template #body="slotProps">
                <div v-if="slotProps.data.customPrice" class="text-center">
                  <span class="text-xs text-secondary">PKR</span><br>
                  <InputNumber
                    v-model="slotProps.data.price"
                    :min="0"
                    mode="decimal"
                    class="w-8rem custom-input-number"
                    inputClass="w-8rem"
                    size="small"
                    placeholder="0"
                  />
                </div>
                <div v-else class="text-center">
                  <span class="text-xs text-secondary">PKR</span><br>
                  <span class="font-semibold">{{ slotProps.data.price }}</span>
                </div>
              </template>
            </Column>
            <Column field="customPrice" header="Custom" style="width: 8%" headerStyle="text-align: center;" bodyStyle="text-align: center;">
              <template #body="slotProps">
                <div class="flex justify-content-center">
                  <Checkbox v-model="slotProps.data.customPrice" :binary="true" class="custom-checkbox" />
                </div>
              </template>
            </Column>
            <Column field="discountType" header="Disc. Type" style="width: 10%" headerStyle="text-align: center;" bodyStyle="text-align: center;">
              <template #body="slotProps">
                <Dropdown 
                  v-model="slotProps.data.discountType" 
                  :options="discountTypes" 
                  optionLabel="label" 
                  optionValue="value"
                  placeholder="%"
                  class="w-full custom-dropdown"
                />
              </template>
            </Column>
            <Column field="discount" header="Discount" style="width: 10%" headerStyle="text-align: center;" bodyStyle="text-align: center;">
              <template #body="slotProps">
                <InputNumber 
                  v-model="slotProps.data.discount" 
                  :min="0"
                  mode="decimal"
                  class="custom-input-number-compact"
                />
              </template>
            </Column>
            <Column field="taxable" header="Tax" style="width: 6%" headerStyle="text-align: center;" bodyStyle="text-align: center;">
              <template #body="slotProps">
                <div class="flex justify-content-center">
                  <Checkbox v-model="slotProps.data.taxable" :binary="true" class="custom-checkbox" />
                </div>
              </template>
            </Column>
            <Column field="tax" header="Tax Amt" style="width: 10%" headerStyle="text-align: center;" bodyStyle="text-align: center;">
              <template #body="slotProps">
                <div class="text-center">
                  <span class="text-xs text-secondary">PKR</span><br>
                  <span class="font-semibold text-sm">{{ slotProps.data.tax }}</span>
                </div>
              </template>
            </Column>
            <Column field="total" header="Total" style="width: 10%" headerStyle="text-align: center;" bodyStyle="text-align: center;">
              <template #body="slotProps">
                <div class="text-center">
                  <span class="text-xs text-secondary">PKR</span><br>
                  <span class="font-semibold text-sm">{{ slotProps.data.total }}</span>
                </div>
              </template>
            </Column>
            <Column header="Actions" style="width: 8%" headerStyle="text-align: center;" bodyStyle="text-align: center;">
              <template #body="slotProps">
                <div class="flex gap-1 justify-content-center">
                  <Button 
                    class="p-button-sm custom-add-button"
                    @click="addItem"
                  >
                    <oh-vue-icon name="hi-plus" fill="white" />
                  </Button>
                  <Button 
                    class="p-button-sm custom-delete-button"
                    @click="removeItem(slotProps.index)"
                  >
                    <oh-vue-icon name="hi-trash" fill="white" />
                  </Button>
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>

      <!-- Item Descriptions -->
      <Card class="mb-4 custom-card">
        <template #header>
          <div class="flex align-items-center justify-content-between p-3 border-bottom-1 surface-border cursor-pointer" @click="toggleItemDescriptions">
            <div class="flex align-items-center">
              <oh-vue-icon name="hi-document-text" fill="#0891b2" class="mr-2" />
              <h3 class="m-0" style="color: #1f2937;">Item Descriptions</h3>
            </div>
            <oh-vue-icon :name="itemDescriptionsExpanded ? 'hi-chevron-up' : 'hi-chevron-down'" fill="#6b7280" />
          </div>
        </template>
        <template #content v-if="itemDescriptionsExpanded">
          <div>
            <Textarea 
              v-model="orderDetails.description" 
              placeholder="Enter item-level notes or description..."
              rows="3"
              class="w-full custom-textarea"
            />
          </div>
        </template>
      </Card>

      <!-- Details & Measurements -->
      <Card class="custom-card">
        <template #header>
          <div class="flex align-items-center justify-content-between p-3 border-bottom-1 surface-border cursor-pointer" @click="toggleMeasurements">
            <div class="flex align-items-center">
              <oh-vue-icon name="hi-adjustments" fill="#0891b2" class="mr-2" />
              <h3 class="m-0" style="color: #1f2937;">Details & Measurements</h3>
            </div>
            <oh-vue-icon :name="measurementsExpanded ? 'hi-chevron-up' : 'hi-chevron-down'" fill="#6b7280" />
          </div>
        </template>
        <template #content v-if="measurementsExpanded">
          <div class="measurements-form p-4">
            <!-- Restructured to match exact layout from image with 3 columns and proper field distribution -->
            <div class="grid">
              <!-- Column 1: Outfit section + measurements -->
              <div class="col">
                <!-- Outfit Section -->
                <div class="section-header mb-4">
                  <h4 class="m-0 pb-2" style="color: #1f2937; font-weight: 600; border-bottom: 1px solid #d1d5db;">Outfit</h4>
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Color</label>
                  <InputText 
                    v-model="measurements.outfit.color" 
                    placeholder="Enter Color"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-4">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Material</label>
                  <InputText 
                    v-model="measurements.outfit.material" 
                    placeholder="Enter Material"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>

                <!-- Measurements for Column 1 -->
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Shirt Length</label>
                  <InputText 
                    v-model="measurements.body.shirtLength" 
                    placeholder="Enter Shirt Length"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Back</label>
                  <InputText 
                    v-model="measurements.body.back" 
                    placeholder="Enter Back"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Back Neck</label>
                  <InputText 
                    v-model="measurements.body.backNeck" 
                    placeholder="Enter Back Neck"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Hips</label>
                  <InputText 
                    v-model="measurements.body.hips" 
                    placeholder="Enter Hips"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Elbow</label>
                  <InputText 
                    v-model="measurements.body.elbow" 
                    placeholder="Enter Elbow"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Pant/ Lehnga Style</label>
                  <InputText 
                    v-model="measurements.body.pantLehngaStyle" 
                    placeholder="Enter Pant/ Lehnga Style"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Upper Thigh</label>
                  <InputText 
                    v-model="measurements.body.upperThigh" 
                    placeholder="Enter Upper Thigh"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Calf</label>
                  <InputText 
                    v-model="measurements.body.calf" 
                    placeholder="Enter Calf"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
              </div>

              <!-- Column 2: Pant section + measurements -->
              <div class="col">
                <!-- Pant Section -->
                <div class="section-header mb-4">
                  <h4 class="m-0 pb-2" style="color: #1f2937; font-weight: 600; border-bottom: 1px solid #d1d5db;">Pant</h4>
                </div>
                <div class="field mb-4">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Material</label>
                  <InputText 
                    v-model="measurements.pant.material" 
                    placeholder="Enter Material"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>

                <!-- Measurements for Column 2 -->
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Body Length</label>
                  <InputText 
                    v-model="measurements.body.bodyLength" 
                    placeholder="Enter Body Length"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Shoulder</label>
                  <InputText 
                    v-model="measurements.body.shoulder" 
                    placeholder="Enter Shoulder"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Chest</label>
                  <InputText 
                    v-model="measurements.body.chest" 
                    placeholder="Enter Chest"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Armhole</label>
                  <InputText 
                    v-model="measurements.body.armhole" 
                    placeholder="Enter Armhole"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Sleeve Length</label>
                  <InputText 
                    v-model="measurements.body.sleeveLength" 
                    placeholder="Enter Sleeve Length"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Lehnga Tie Waist</label>
                  <InputText 
                    v-model="measurements.body.lehngaTieWaist" 
                    placeholder="Enter Lehnga Tie Waist"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Lower Thigh</label>
                  <InputText 
                    v-model="measurements.body.lowerThigh" 
                    placeholder="Enter Lower Thigh"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Bottom</label>
                  <InputText 
                    v-model="measurements.body.bottom" 
                    placeholder="Enter Bottom"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
              </div>

              <!-- Column 3: Dupatta section + measurements -->
              <div class="col">
                <!-- Dupatta Section -->
                <div class="section-header mb-4">
                  <h4 class="m-0 pb-2" style="color: #1f2937; font-weight: 600; border-bottom: 1px solid #d1d5db;">Dupatta</h4>
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Material</label>
                  <InputText 
                    v-model="measurements.dupatta.material" 
                    placeholder="Enter Material"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-4">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Color</label>
                  <InputText 
                    v-model="measurements.dupatta.color" 
                    placeholder="Enter Color"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>

                <!-- Measurements for Column 3 -->
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Front</label>
                  <InputText 
                    v-model="measurements.body.front" 
                    placeholder="Enter Front"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Front Neck</label>
                  <InputText 
                    v-model="measurements.body.frontNeck" 
                    placeholder="Enter Front Neck"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Waist</label>
                  <InputText 
                    v-model="measurements.body.waist" 
                    placeholder="Enter Waist"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Bicep</label>
                  <InputText 
                    v-model="measurements.body.bicep" 
                    placeholder="Enter Bicep"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Wrist</label>
                  <InputText 
                    v-model="measurements.body.wrist" 
                    placeholder="Enter Wrist"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Pant Length</label>
                  <InputText 
                    v-model="measurements.body.pantLength" 
                    placeholder="Enter Pant Length"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Knee</label>
                  <InputText 
                    v-model="measurements.body.knee" 
                    placeholder="Enter Knee"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
                <div class="field mb-3">
                  <label class="block font-medium mb-2" style="color: #6b7280; font-size: 0.875rem;">Ankle</label>
                  <InputText 
                    v-model="measurements.body.ankle" 
                    placeholder="Enter Ankle"
                    class="w-full custom-input"
                    style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Order Summary Section - spans 1 column -->
    <div class="col-12 lg:col-3">
      <div class="order-summary-sticky">
        <Card class="custom-card">
          <template #header>
            <div class="flex align-items-center p-3 border-bottom-1 surface-border">
              <oh-vue-icon name="hi-clipboard-list" fill="#0891b2" class="mr-2" />
              <h3 class="m-0" style="color: #1f2937;">Order Summary</h3>
            </div>
          </template>
          <template #content>
            <div class="summary-content">
              <div class="flex justify-content-between mb-3">
                <span style="color: #6b7280;">Subtotal</span>
                <span class="font-semibold" style="color: #1f2937;">PKR {{ calculateSubtotal() }}</span>
              </div>
              <div class="flex justify-content-between mb-3">
                <span style="color: #6b7280;">Discount on all items</span>
                <span class="font-semibold" style="color: #10b981;">- PKR {{ calculateTotalDiscount() }}</span>
              </div>
              <div class="flex justify-content-between mb-3">
                <span style="color: #6b7280;">Subtotal After Discount</span>
                <span class="font-semibold" style="color: #1f2937;">PKR {{ calculateSubtotalAfterDiscount() }}</span>
              </div>
              <div class="flex justify-content-between mb-3">
                <span style="color: #6b7280;">Tax</span>
                <span class="font-semibold" style="color: #1f2937;">PKR {{ calculateTotalTax() }}</span>
              </div>
              <div class="flex justify-content-between mb-3">
                <span style="color: #6b7280;">Shipping Charges</span>
                <span class="font-semibold" style="color: #1f2937;">PKR {{ orderDetails.shippingCharges }}</span>
              </div>
              <hr class="my-3" style="border-color: #e5e7eb;">
              <div class="flex justify-content-between text-xl">
                <span class="font-bold" style="color: #1f2937;">Total Amount</span>
                <span class="font-bold" style="color: #1f2937;">PKR {{ calculateTotalAmount() }}</span>
              </div>
            </div>
            
            <div class="mt-4 button-group">
              <Button 
                label="Hold Order" 
                class="w-full custom-hold-button mb-2"
                @click="holdOrder"
              />
              <Button 
                label="Process Order" 
                class="w-full custom-process-button"
                @click="processOrder"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import InputNumber from 'primevue/inputnumber'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { 
  HiDocumentText, 
  HiShoppingCart, 
  HiAdjustments, 
  HiChevronUp, 
  HiChevronDown, 
  HiPlus, 
  HiTrash, 
  HiClipboardList 
} from 'oh-vue-icons/icons'

addIcons(
  HiDocumentText, 
  HiShoppingCart, 
  HiAdjustments, 
  HiChevronUp, 
  HiChevronDown, 
  HiPlus, 
  HiTrash, 
  HiClipboardList
)

const components = { OhVueIcon }

// Reactive data
const orderDetails = reactive({
  orderType: 'sale',
  orderNo: '',
  manualBookNo: '',
  deliveryDate: new Date('2024-07-29'),
  customer: '',
  description: '',
  shippingCharges: 0
})

const measurements = reactive({
  outfit: {
    color: '',
    material: ''
  },
  pant: {
    material: ''
  },
  dupatta: {
    material: '',
    color: ''
  },
  body: {
    shirtLength: '',
    bodyLength: '',
    front: '',
    back: '',
    shoulder: '',
    frontNeck: '',
    backNeck: '',
    chest: '',
    waist: '',
    hips: '',
    armhole: '',
    bicep: '',
    elbow: '',
    sleeveLength: '',
    wrist: '',
    pantLehngaStyle: '',
    lehngaTieWaist: '',
    pantLength: '',
    upperThigh: '',
    lowerThigh: '',
    knee: '',
    calf: '',
    bottom: '',
    ankle: ''
  }
})

const items = ref([
  {
    item: '',
    qty: 1,
    price: 0,
    customPrice: false,
    discountType: '%',
    discount: 0,
    taxable: true,
    tax: 0,
    total: 0
  }
])

// State for collapsible sections
const itemDescriptionsExpanded = ref(false)
const measurementsExpanded = ref(false)

// Options data
const orderTypes = [
  { label: 'Sale Order', value: 'sale' },
  { label: 'Purchase Order', value: 'purchase' }
]

const orderNumbers = [
  { label: 'ORD-001', value: 'ORD-001' },
  { label: 'ORD-002', value: 'ORD-002' }
]

const customers = [
  { label: 'Customer A', value: 'customer-a' },
  { label: 'Customer B', value: 'customer-b' }
]

const availableItems = [
  { label: 'Product 1', value: 'product-1' },
  { label: 'Product 2', value: 'product-2' }
]

const discountTypes = [
  { label: '%', value: '%' },
  { label: 'Fixed', value: 'fixed' }
]

// Methods
const addCustomer = () => {
  console.log('Add customer clicked')
}

const addItem = () => {
  items.value.push({
    item: '',
    qty: 1,
    price: 0,
    customPrice: false,
    discountType: '%',
    discount: 0,
    taxable: true,
    tax: 0,
    total: 0
  })
}

const removeItem = (index) => {
  if (items.value.length > 1) {
    items.value.splice(index, 1)
  }
}

const toggleItemDescriptions = () => {
  itemDescriptionsExpanded.value = !itemDescriptionsExpanded.value
}

const toggleMeasurements = () => {
  measurementsExpanded.value = !measurementsExpanded.value
}

const calculateSubtotal = () => {
  return items.value.reduce((sum, item) => sum + (item.price * item.qty), 0)
}

const calculateTotalDiscount = () => {
  return items.value.reduce((sum, item) => {
    const itemTotal = item.price * item.qty
    const discount = item.discountType === '%' 
      ? (itemTotal * item.discount / 100) 
      : item.discount
    return sum + discount
  }, 0)
}

const calculateSubtotalAfterDiscount = () => {
  return calculateSubtotal() - calculateTotalDiscount()
}

const calculateTotalTax = () => {
  return items.value.reduce((sum, item) => sum + item.tax, 0)
}

const calculateTotalAmount = () => {
  return calculateSubtotalAfterDiscount() + calculateTotalTax() + orderDetails.shippingCharges
}

const holdOrder = () => {
  console.log('Order held')
}

const processOrder = () => {
  console.log('Order processed')
}
</script>

<style scoped>
.custom-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.custom-input, .custom-dropdown, .custom-calendar, .custom-textarea {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
}

.custom-input:hover, .custom-dropdown:focus, .custom-calendar:focus, .custom-textarea:focus {
  border-color: #0891b2;
  box-shadow: 0 0 0 1px #0891b2;
}

.custom-add-button {
  background-color: #0891b2 !important;
  border-color: #0891b2 !important;
  color: white !important;
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
.custom-input-number{
  background-color:#0891b2;
  
}

.custom-add-button:hover {
  background-color: #0e7490 !important;
  border-color: #0e7490 !important;
}

.custom-delete-button {
  background-color: #ef4444 !important;
  border-color: #ef4444 !important;
  color: white !important;
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.custom-delete-button:hover {
  background-color: #dc2626 !important;
  border-color: #dc2626 !important;
}

.custom-process-button {
  background-color: #0891b2 !important;
  border-color: #0891b2 !important;
  color: white !important;
  font-weight: 600;
}

.custom-process-button:hover {
  background-color: #0e7490 !important;
  border-color: #0e7490 !important;
}

.custom-hold-button {
  background-color: transparent !important;
  border: 1px solid #d1d5db !important;
  color: #374151 !important;
}

.custom-hold-button:hover {
  background-color: #f9fafb !important;
  border-color: #9ca3af !important;
}

.order-summary-sticky {
  position: sticky;
  top: 1.5rem;
}

@media (max-width: 1024px) {
  .order-summary-sticky {
    position: static;
  }
}

.cursor-pointer {
  cursor: pointer;
}

.summary-content .mb-3:last-child {
  margin-bottom: 0;
}

.button-group .mb-2:last-child {
  margin-bottom: 0;
}

/* Added custom styling for InputNumber components to match theme */
.custom-input-number {
  border: 1px solid #d1d5db !important;
  border-radius: 6px !important;
  background: white !important;
}

.custom-input-number:hover {
  border-color: #0891b2 !important;
}

.custom-input-number:focus-within {
  border-color: #0891b2 !important;
  box-shadow: 0 0 0 1px #0891b2 !important;
}

/* Override PrimeVue InputNumber internal styling */

/* Custom checkbox styling with teal theme */
.custom-checkbox .p-checkbox-box {
  border: 2px solid #d1d5db !important;
  background: white !important;
  width: 1.25rem !important;
  height: 1.25rem !important;
  border-radius: 4px !important;
}

.custom-checkbox .p-checkbox-box:hover {
  border-color: #0891b2 !important;
}

.custom-checkbox .p-checkbox-box.p-highlight {
  background: #0891b2 !important;
  border-color: #0891b2 !important;
}

.custom-checkbox .p-checkbox-box.p-highlight:hover {
  background: #0e7490 !important;
  border-color: #0e7490 !important;
}

.custom-checkbox .p-checkbox-icon {
  color: white !important;
  font-size: 0.75rem !important;
}
.custom-table :deep(.p-datatable-thead > tr > th) {
  background: #f9fafb !important;
  color: #374151 !important;
  font-weight: 600 !important;
  padding: 0.75rem 0.5rem !important;
  border-bottom: 2px solid #e5e7eb !important;
}

/* Added custom styling for compact InputNumber components */
.custom-input-number-compact {
  width: 80px !important;
  border: 1px solid #d1d5db !important;
  border-radius: 6px !important;
  background: white !important;
}

.custom-input-number-compact .p-inputnumber-input {
  text-align: center !important;
  padding: 0.5rem !important;
  border: none !important;
  background: transparent !important;
  width: 50px !important;
}

.custom-input-number-compact .p-inputnumber-button-group {
  display: flex !important;
  flex-direction: column !important;
  position: absolute !important;
  right: 2px !important;
  top: 2px !important;
  bottom: 2px !important;
  width: 24px !important;
}

.custom-input-number-compact .p-inputnumber-button {
  background: #f3f4f6 !important;
  border: 1px solid #d1d5db !important;
  color: #6b7280 !important;
  width: 24px !important;
  height: 50% !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 0.75rem !important;
}

.custom-input-number-compact .p-inputnumber-button:hover {
  background: #0891b2 !important;
  border-color: #0891b2 !important;
  color: white !important;
}

.custom-input-number-compact .p-inputnumber-button-up {
  border-radius: 0 4px 0 0 !important;
  border-bottom: none !important;
}

.custom-input-number-compact .p-inputnumber-button-down {
  border-radius: 0 0 4px 0 !important;
}

.custom-input-number-compact .p-inputnumber-button .p-button-icon::before {
  content: "▲" !important;
}

.custom-input-number-compact .p-inputnumber-button-down .p-button-icon::before {
  content: "▼" !important;
}
</style>
