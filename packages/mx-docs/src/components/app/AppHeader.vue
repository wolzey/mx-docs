<template>
  <nav
    class="border-b-2 border-neutral-700 fixed top-0 right-0 left-0 z-40 bg-neutral-800 px-8 md:px-4"
  >
    <div
      class="flex items-center justify-between text-lg h-12 mx-auto container"
    >
      <div class="flex items-center">
        <img
          v-if="logo"
          :src="logo.light"
          class="h-8 max-w-full light-img dark:hidden"
          :alt="settings.title"
        />
        <img
          v-if="logo"
          :src="logo.dark"
          class="hidden h-8 max-w-full dark:block"
          :alt="settings.title"
        />
        <span class="mx-2 block">|</span>
        DOCS
      </div>

      <div class="w-1/2 lg:w-1/3">
        <AppSearch />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    logo() {
      if (!this.settings.logo) {
        return;
      }

      if (typeof this.settings.logo === "object") {
        return this.settings.logo;
      }

      return {
        light: this.settings.logo,
        dark: this.settings.logo,
      };
    },
  },
};
</script>
