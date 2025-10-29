<template>
  <div class="bg-primary-background min-h-dvh flex flex-col">
    <!-- Sticky header -->
    <header
      class="sticky top-0 z-20 bg-primary border-primary-border text-secondary-text"
    >
      <div class="flex items-center gap-3 py-5 ml-4">
        <span class="inline-flex size-8 items-center justify-center">📦</span>
        <h1 class="text-md font-semibold">Készletkezelő Mini</h1>
      </div>
    </header>

    <main class="my-4 flex-1">
      <slot />
    </main>

    <footer class="mt-12 border-t border-primary-border bg-secondary">
      <div class="w-full text-right pr-9 py-5 text-sm text-secondary-text">
        © {{ new Date().getFullYear() }} Készletkezelő Mini
      </div>
    </footer>
  </div>
</template>
