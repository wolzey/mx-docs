<template>
  <aside
    class="w-full lg:block mt-16 lg:mt-0 z-30 bg-white dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent border-r border-neutral-700 mr-4 pl-4"
    :class="{ block: menu, hidden: !menu }"
  >
    <div
      class="lg:sticky lg:top-8 overflow-y-auto h-full lg:h-auto lg:max-h-(screen-12) lg:px-0"
    >
      <ul class="p-4 lg:py-8 lg:pl-0">
        <li
          v-for="(docs, category, index) in categories"
          :key="category"
          class="mb-4"
          :class="{
            active: isCategoryActive(docs),
            'lg:mb-0': index === Object.keys(categories).length - 1,
          }"
        >
          <p
            v-if="category"
            class="mb-2 text-gray-500 uppercase tracking-wider font-bold text-sm lg:text-xs"
          >
            {{ category }}
          </p>
          <ul>
            <li
              v-for="doc of docs"
              :key="doc.slug"
              class="text-gray-700 dark:text-gray-300"
            >
              <NuxtLink
                v-if="category"
                :to="localePath(doc.to)"
                class="px-2 rounded font-medium py-1 hover:text-primary-500 flex items-center justify-between"
                exact-active-class="text-primary-500 bg-primary-100 hover:text-primary-500 dark:bg-neutral-700 dark:text-neutral-500"
              >
                {{ doc.menuTitle || doc.title }}
                <client-only>
                  <span
                    v-if="isDocumentNew(doc)"
                    class="animate-pulse rounded-full bg-primary-500 opacity-75 h-2 w-2"
                  />
                </client-only>
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  computed: {
    menu: {
      get() {
        return this.$store.state.menu.open;
      },
      set(val) {
        this.$store.commit("menu/toggle", val);
      },
    },
    categories() {
      return this.$store.state.categories[this.$i18n.locale];
    },
  },
  methods: {
    isCategoryActive(documents) {
      return documents.some((document) => document.to === this.$route.fullPath);
    },
    isDocumentNew(document) {
      if (process.server) {
        return;
      }
      if (!document.version || document.version <= 0) {
        return;
      }
      const version = localStorage.getItem(`document-${document.slug}-version`);
      if (document.version > Number(version)) {
        return true;
      }
      return false;
    },
  },
};
</script>
