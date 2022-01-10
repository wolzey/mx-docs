import defu from "defu";
import tailwindConfig from "./tailwind.config";
import gracefulFs from "graceful-fs";
import path from "path";

const fs = gracefulFs.promises;

const defaultConfig = {
  target: "static",
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  srcDir: __dirname,

  transpile: [__dirname],

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "MX Docs",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/init"],

  components: [{ path: "~/components", pathPrefix: false, level: 1 }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    themeModule,
    "@nuxtjs/tailwindcss",

    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/google-fonts",
  ],

  googleFonts: {
    families: {
      "DM+Sans": true,
      "DM+Mono": true,
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    "@nuxtjs/i18n",
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      prism: {
        theme: "prism-themes/themes/prism-material-oceanic.css",
      },
    },
  },

  i18n: {
    langDir: "~/i18n",
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en-US.js",
        name: "English",
      },
    ],
    defaultLocale: "en",
    parsePages: false,
    lazy: true,
    seo: false,
  },
  generate: {
    fallback: "404.html",
    routes: ["/"],
  },
  tailwindcss: {},
};

function themeModule() {
  const { nuxt } = this;
  const { options, hook } = nuxt;

  // Configure `static/ dir
  options.dir.static = path.resolve(
    options.rootDir,
    options.dir.static || "static"
  );

  hook("components:dirs", async (dirs) => {
    const componentsDirPath = path.resolve(nuxt.options.rootDir, "components");
    const componentsDirStat = await fs
      .stat(componentsDirPath)
      .catch(() => null);

    if (componentsDirStat && componentsDirStat.isDirectory()) {
      dirs.push({
        path: componentsDirPath,
      });
    } else {
      nuxt.options.watch.push(componentsDirPath);
    }

    const globalComponentsDirPath = path.resolve(
      nuxt.options.rootDir,
      "components/global"
    );
    const globalComponentsDirStat = await fs
      .stat(globalComponentsDirPath)
      .catch(() => null);

    if (globalComponentsDirStat && globalComponentsDirStat.isDirectory()) {
      dirs.push({
        path: globalComponentsDirPath,
        global: true,
      });
    } else {
      nuxt.options.watch.push(globalComponentsDirPath);
    }
  });

  hook("content:file:beforeInsert", (document) => {
    const regexp = new RegExp(
      `^/(${options.i18n.locales.map((locale) => locale.code).join("|")})`,
      "gi"
    );
    const { dir, slug, category } = document;

    const _dir = dir.replace(regexp, "");
    const _slug = slug.replace(/^index/, "");
    const _category = category && typeof category === "string" ? category : "";

    document.to = `${_dir}/${_slug}`;
    document.category = _category;
  });

  // Extend `/` route
  hook("build:extendRoutes", (routes) => {
    const allRoute = routes.find((route) => route.name === "all");

    routes.push({
      ...allRoute,
      path: "/",
      name: "index",
    });
  });

  // Configure `tailwind.config.js` path
  options.tailwindcss.configPath =
    options.tailwindcss.configPath ||
    path.resolve(options.rootDir, "tailwind.config.js");
  options.tailwindcss.cssPath =
    options.tailwindcss.cssPath ||
    path.resolve(options.rootDir, options.dir.assets, "css", "tailwind.css");

  // Configure TailwindCSS
  hook("tailwindcss:config", function (defaultTailwindConfig) {
    Object.assign(
      defaultTailwindConfig,
      defu(defaultTailwindConfig, tailwindConfig)
    );
  });
}

export default (userConfig) => defu.arrayFn(userConfig, defaultConfig);
