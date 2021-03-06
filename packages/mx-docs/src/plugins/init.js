export default async function ({ store, app }) {
  if (process.server) {
    await store.dispatch("fetchCategories");
    await store.dispatch("fetchSettings");
  }

  if (process.client && !store.state.categories[app.i18n.locale]) {
    await store.dispatch("fetchCategories");
  }

  if (process.client && !store.state.settings.filled) {
    await store.dispatch("fetchSettings");
  }

  if (process.client && process.dev) {
    window.onNuxtReady(($nuxt) => {
      $nuxt.$on("content:update", async () => {
        await store.dispatch("fetchCategories");
        await store.dispatch("fetchSettings");
      });
    });
  }
}
