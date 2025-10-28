<template>
  <UContainer>
    <InventoryItemCard :item="item" />
  </UContainer>
</template>

<script setup lang="ts">
const { item } = useInventory();
</script>
