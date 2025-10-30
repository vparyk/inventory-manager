<template>
  <UContainer>
    <div class="flex justify-end mb-4">
      <USelect
        v-model="filter"
        :items="filterOptions"
        size="sm"
        placeholder="Szűrés státusz szerint"
        class="w-full sm:w-52"
      />
    </div>
    <div v-if="showLoadingOnNavigation">
      <p>Loading inventory...</p>
    </div>
    <div v-else-if="error">
      <p class="text-error">Server error: {{ error }}</p>
    </div>
    <div v-else class="flex flex-col gap-3">
      <p class="text-sm">
        Utoljára szinkronizálva: {{ lastTimeSyncedFormatted }}
      </p>
      <div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
        <InventoryItemCard
          v-for="(item, itemIndex) in filteredItems"
          :key="item.id"
          :item="item"
          :isConflicted="item.id === conflictId"
          @changeQuantity="(newQuanitity:number) => updateQuantity(newQuanitity, itemIndex, item.id, item.lastUpdated)"
        />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { timeAgo } from "~/assets/css/utils/time-ago";

const {
  items,
  loading,
  error,
  lastTimeSynced,
  conflictId,
  updateQuantity,
  keepSynced,
} = useInventory();

const { filter, filteredItems, filterOptions } = useFilter(items, conflictId);

onMounted(() => {
  keepSynced();
});

const showLoadingOnNavigation = computed(
  () => loading && !(items.value && items.value.length > 0)
);

const lastTimeSyncedFormatted = computed(() =>
  lastTimeSynced.value ? `${timeAgo(lastTimeSynced.value)}` : ""
);
</script>
