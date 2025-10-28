<template>
  <UCard>
    <div>
      <NuxtImg :src="item.image_url" :alt="item.name" class="size-30" />
      <h2>{{ item.name }}</h2>
      <p>Mennyiség: {{ item.quantity }}</p>
      <p>Frissítve: {{ lastUpdated }}</p>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { timeAgo } from "~/assets/css/utils/time-ago";
import { useInventory } from "~/composables/useInventory";

const { item }: { item: InventoryItem } = useInventory();
const lastUpdated = computed(() => timeAgo(item.lastUpdated));
</script>
