<template>
  <UContainer>
    <InventoryItemCard :item="item" @changeQuantity="updateQuantity" />
  </UContainer>
</template>

<script setup lang="ts">
const { item, updateQuantity } = useInventory();
</script>
