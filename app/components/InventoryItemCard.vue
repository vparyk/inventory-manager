<template>
  <UCard :class="['relative', isConflicted ? '!border !border-error ' : '']">
    <div class="flex flex-col items-center gap-1">
      <div v-if="isConflicted" class="absolute top-2 right-2">
        <UTooltip
          class=""
          text="Szerver oldalon módosult ez a tétel, ezért nem sikerült a legutóbbi módosításod."
        >
          <UIcon
            name="i-heroicons-exclamation-triangle"
            class="text-conflict size-5 text-error"
          />
        </UTooltip>
      </div>
      <h2 class="text-center font-semibold mb-2">{{ item.name }}</h2>
      <img :src="item.image_url" :alt="item.name" class="size-30" />
      <p>Mennyiség: {{ item.quantity }}</p>
      <p>Frissítve: {{ lastUpdated }}</p>
      <UIQuantity :quantity="item.quantity" @changeQuantity="updateQuantity" />
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { timeAgo } from "~/assets/css/utils/time-ago";

const { item, isConflicted } = defineProps<{
  item: InventoryItem;
  isConflicted: boolean;
}>();

const lastUpdated = computed(() => timeAgo(item.lastUpdated));

const emit = defineEmits<{
  (e: "change-quantity", value: number): void;
}>();

function updateQuantity(value: number) {
  emit("change-quantity", value);
}
</script>
