const LOCK_DELAY = 2000;

export function useConflict() {
  const toast = useToast();

  function toastConflicted(name: string) {
    toast.add({
      title: "Konfliktus történt",
      description: `A ${name} tétel időközben megváltozott a szerveren.`,
      icon: "i-heroicons-exclamation-triangle",
    });
  }

  function handleConflict(
    name: string,
    onLockChange: (locked: boolean) => void
  ) {
    toastConflicted(name);
    onLockChange(true);

    setTimeout(() => {
      onLockChange(false);
    }, LOCK_DELAY);
  }

  return {
    handleConflict,
  };
}
