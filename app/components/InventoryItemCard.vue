<template>
  <UCard>
    <div>
      <NuxtImg :src="item.image_url" :alt="item.name" class="size-30" />
      <h2>{{ item.name }}</h2>
      <p>Mennyiség: {{ item.quantity }}</p>
      <!-- TODO implement timeAgo funcionnality -->
      <p>Utoljára frissítve: {{ item.lastUpdated }}</p>
    </div>
  </UCard>
</template>

<script setup lang="ts">
//TODO replace mock with props:
const item: InventoryItem = {
  id: "ID-1",
  name: "Mock item",
  image_url: "https://dummyimage.com/120x120/1a3138/fff",
  quantity: 10,
  lastUpdated: "2025-10-28T15:30:47Z",
};
</script>
