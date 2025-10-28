<template>
  <UCard>
    <div>
      <NuxtImg :src="item.image_url" :alt="item.name" class="size-30" />
      <h2>{{ item.name }}</h2>
      <p>Mennyiség: {{ item.quantity }}</p>
      <p>Frissítve: {{ lastUpdated }}</p>
      <UIQuantity
        :quantity="item.quantity"
        @changeQuantity="updateQuantity"
      />
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { timeAgo } from "~/assets/css/utils/time-ago";

const { item } = defineProps<{ item: InventoryItem }>();

const lastUpdated = computed(() => timeAgo(item.lastUpdated));

const emit = defineEmits<{
  (e: "change-quantity", value: number): void;
}>();

function updateQuantity(value: number) {
  emit("change-quantity", value);
}
</script>
