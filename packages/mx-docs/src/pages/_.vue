<template>
  <article
    class="prose prose-dark px-4 lg:px-0 content-container pb-16 w-full break-words pt-12"
  >
    <h1 class="flex items-center justify-between">
      {{ document.title }}
    </h1>
    <div v-if="document.subtitle" class="-mt-4">
      <p class="text-gray-600 dark:text-gray-400">
        {{ document.subtitle }}
      </p>
    </div>

    <NuxtContent :document="document" />
  </article>
</template>

<script>
export default {
  name: "IndexPage",
  middleware({ app, params, redirect }) {
    if (params.pathMath === "index") {
      redirect(app.localePath("/"));
    }
  },

  async asyncData({ $content, app, params, error }) {
    const path = `/${app.i18n.locale}/${params.pathMatch || "index"}`;
    const [document] = await $content({ deep: true }).where({ path }).fetch();

    if (!document) {
      return error({ statusCode: 404, message: "Page not found" });
    }

    const [prev, next] = await $content(app.i18n.locale, { deep: true })
      .only(["title", "path", "to"])
      .sortBy("position", "asc")
      .surround(document.path, { before: 1, after: 1 })
      .fetch();

    return {
      document,
      prev,
      next,
    };
  },
};
</script>
