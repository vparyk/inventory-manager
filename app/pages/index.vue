<template>
  <UContainer>
    <div v-if="loading">
      <p>Loading inventory...</p>
    </div>
    <div v-else-if="error">
      <p>Server error</p>
    </div>
    <div v-else>
      <InventoryItemCard
        v-for="(item, itemIndex) in items"
        :item="item"
        :key="item.id"
        @changeQuantity="(newQuanitity:number) => updateQuantity(newQuanitity, itemIndex, item.id)"
      />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { items, loading, error, updateQuantity, keepSynced } = useInventory();
onMounted(() => {
  keepSynced();
});
</script>
