<template>
  <UContainer>
    <div v-if="showLoadingOnNavigation">
      <p>Loading inventory...</p>
    </div>
    <div v-else-if="error">
      <p>Server error</p>
    </div>
    <div v-else class="flex flex-col gap-2">
      <h1 class="text-xl font-semibold">Készletkezelő Mini</h1>
      <p class="text-sm">
        Utoljára szinkronizálva: {{ lastTimeSyncedFormatted }}
      </p>
      <div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
        <InventoryItemCard
          v-for="(item, itemIndex) in items"
          :item="item"
          :key="item.id"
          @changeQuantity="(newQuanitity:number) => updateQuantity(newQuanitity, itemIndex, item.id)"
        />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { timeAgo } from "~/assets/css/utils/time-ago";

const { items, loading, error, lastTimeSynced, updateQuantity, keepSynced } =
  useInventory();

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
