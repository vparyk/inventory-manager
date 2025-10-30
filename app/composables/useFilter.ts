export const FILTER_ALL = "all";
export const FILTER_CONFLICTED = "conflicted";

export function useFilter(
  items: Ref<InventoryItem[] | undefined>,
  conflictId: Ref<string>
) {
  const filter = ref<string>(FILTER_ALL);

  const filterOptions = [
    { label: "Összes tétel", value: FILTER_ALL },
    { label: "Csak konfliktusos", value: FILTER_CONFLICTED },
  ];

  const filteredItems = computed(() => {
    if (!items.value) return [];

    switch (filter.value) {
      case FILTER_CONFLICTED:
        return items.value.filter((item) => conflictId.value.includes(item.id));
      default:
        return items.value;
    }
  });

  return {
    filter,
    filteredItems,
    filterOptions,
  };
}
