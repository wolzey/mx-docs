<template>
  <nav
    class="border-b-2 border-neutral-700 fixed top-0 right-0 left-0 z-40 bg-neutral-800 px-8 md:px-4"
  >
    <div
      class="flex items-center justify-between text-lg h-12 mx-auto container"
    >
      <div class="flex items-center">
        <svg-icon name="logo" width="32px" height="14px" />
        <span class="mx-2 block">|</span>
        DOCS
      </div>

      <div class="w-1/2 lg:w-1/3">
        <AppSearch />
      </div>
    </div>
  </nav>
</template>
