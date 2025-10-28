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

//TODO replace mock with props:
const item: InventoryItem = {
  id: "ID-1",
  name: "Mock item",
  image_url: "https://dummyimage.com/120x120/1a3138/fff",
  quantity: 10,
  lastUpdated: "2025-10-28T12:30:47+01:00",
};
const lastUpdated = computed(() => timeAgo(item.lastUpdated));
</script>
