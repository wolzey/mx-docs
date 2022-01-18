<template>
  <div class="pt-4 w-full">
    <AppHeader class="print:hidden" />
    <main class="mx-auto container pt-8 xl:px-0 px-4 application-layout print:block">
      <AppNav class="print:hidden" />
      <nuxt class="w-full mx-auto" />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      darkEnabled: true,
      mql: null,
    }
  },

  head() {
    return {
      title: "MXaccess | Docs",
      htmlAttrs: {
        class: ["dark"],
      },
      bodyAttrs: {
        class: [
          ...this.bodyClass,
          "antialiased text-gray-900 dark:text-gray-700 dark:bg-neutral-800 dark:text-gray-300 print:bg-white print:text-gray-900",
        ],
      },
    };
  },

  mounted() {
    this.mql = window.matchMedia('print')
    this.mql.addListener(this.handleMediaQueryChange)
  },

  beforeDestroy() {
    this.mql.addListener(this.handleMediaQueryChange)
  },

  computed: {
    ...mapGetters(["dark"]),

    htmlClass() {
      if (this.darkEnabled) return
    },

    bodyClass() {
      return ["lg:h-auto overflow-y-auto"];
    },
  },

  methods: {
    handleMediaQueryChange(mq) {
      if (mq.matches) {
        this.darkEnabled = false
      } else {
        this.darkEnabled = true
      }
    }
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

  @media print {
    display: block;
  }
}
</style>
