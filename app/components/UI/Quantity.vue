<template>
  <div class="flex items-center gap-2">
    <UButton
      icon="i-lucide-minus"
      size="xs"
      variant="soft"
      @click="decrement"
      :disabled="disabled"
    />
    <UInput
      :model-value="quantity"
      @update:model-value="handleInput"
      type="number"
      class="w-14"
      input-class="text-center"
      min="0"
      :disabled="disabled"
    />
    <UButton
      icon="i-lucide-plus"
      size="xs"
      variant="soft"
      @click="increment"
      :disabled="disabled"
    />
  </div>
</template>

<script setup lang="ts">
const { quantity, disabled } = defineProps<{
  quantity: number;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "change-quantity", value: number): void;
}>();

function increment() {
  emit("change-quantity", quantity + 1);
}

function decrement() {
  if (quantity > 0) {
    emit("change-quantity", quantity - 1);
  }
}

function handleInput(newValue: string | number) {
  emit("change-quantity", Number(newValue));
}
</script>
