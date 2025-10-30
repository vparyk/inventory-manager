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
      <div class="flex justify-between text-sm">
        <p>Utoljára szinkronizálva: {{ lastTimeSyncedFormatted }}</p>
        <p v-if="queue.length > 0" class="text-right">
          Sorban álló mentések: {{ queue.length }}
        </p>
      </div>

      <div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
        <InventoryItemCard
          v-for="(item, itemIndex) in filteredItems"
          :key="item.id"
          :item="item"
          @changeQuantity="(newQuantity:number) => updateHandler({newQuantity, itemIndex, itemId: item.id, lastUpdated:item.lastUpdated})"
        />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { timeAgo } from "~/assets/css/utils/time-ago";

const { items, loading, error, lastTimeSynced, updateQuantity, keepSynced } =
  useInventory();

const { filter, filteredItems, filterOptions } = useFilter(items);

onMounted(() => {
  keepSynced();
});

const { queue, isOnline, addToQueue } = useSaveQueue<UpdateQuantityParams>();

function updateHandler(updateQuantityParams: UpdateQuantityParams) {
  if (!isOnline.value) {
    addToQueue(updateQuantityParams, updateQuantity);
    return;
  }
  updateQuantity(updateQuantityParams);
}

const showLoadingOnNavigation = computed(
  () => loading && !(items.value && items.value.length > 0)
);

const lastTimeSyncedFormatted = computed(() =>
  lastTimeSynced.value ? `${timeAgo(lastTimeSynced.value)}` : ""
);
</script>
