<template>
  <div class="pt-4 w-full">
    <AppHeader />
    <main class="mx-auto container pt-8 xl:px-0 px-4 application-layout">
      <AppNav />
      <nuxt class="w-full mx-auto" />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  head() {
    return {
      title: "MXaccess | Docs",
      htmlAttrs: {
        class: ["dark"],
      },
      bodyAttrs: {
        class: [
          ...this.bodyClass,
          "antialiased text-gray-700 dark:bg-neutral-800 dark:text-gray-300",
        ],
      },
    };
  },

  computed: {
    ...mapGetters(["dark"]),

    bodyClass() {
      return ["lg:h-auto overflow-y-auto"];
    },
  },

  beforeMount() {
    this.$store.dispatch("fetchTheme");
  },
};
</script>

<style scoped lang="scss">
.application-layout {
  display: block;
  width: 100%;

  min-height: calc(100vh - 1rem);

  @screen md {
    display: grid;
    grid-template-columns: 20% auto;
  }
}
</style>
