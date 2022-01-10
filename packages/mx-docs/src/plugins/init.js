export default async function ({ store, app }) {
  if (process.client && !store.state.categories[app.i18n.locale]) {
    await store.dispatch("fetchCategories");
  }

  if (process.client && process.dev) {
    window.onNuxtReady(($nuxt) => {
      $nuxt.$on("content:update", async () => {
        await store.dispatch("fetchCategories");
      });
    });
  }
}
