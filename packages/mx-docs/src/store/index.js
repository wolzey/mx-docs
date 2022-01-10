import defu from "defu";
import { groupBy } from "lodash";
import Vue from "vue";
import { isUnset } from "~/support/utils";

export const state = () => ({
  dark: true,
  categories: {},
  settings: {
    title: "MX Docs",
    filled: false,
  },
});

export const mutations = {
  SET_DARK(state, isDark) {
    state.dark = isDark;
  },

  SET_CATEGORIES(state, categories) {
    Vue.set(state.categories, this.$i18n.locale, categories);
  },

  SET_SETTINGS(state, settings) {
    state.settings = defu({ filled: true }, settings, state.settings);
  },
};

export const getters = {
  dark(state) {
    return state.dark;
  },
};

export const actions = {
  async fetchCategories({ commit, state }) {
    if (process.dev === false && state.categories[this.$i18n.locale]) {
      return;
    }

    const docs = await this.$content(this.$i18n, { deep: true })
      .only(["title", "menuTitle", "category", "slug", "version", "to"])
      .sortBy("position", "asc")
      .fetch();

    const categories = groupBy(docs, "category");

    commit("SET_CATEGORIES", categories);
  },

  fetchTheme({ commit, state, dispatch }) {
    const setting = this.$storage.getLocalStorage("dark");

    if (isUnset(setting)) {
      dispatch("setTheme", state.dark);
    }

    commit("SET_DARK", setting);
  },

  setTheme({ commit }, dark) {
    this.$storage.setLocalStorage("dark", dark);
    commit("SET_DARK", dark);
  },

  async fetchSettings({ commit }) {
    try {
      const {
        dir,
        extension,
        path,
        slug,
        to,
        createdAt,
        updatedAt,
        ...settings
      } = await this.$content("settings").fetch();

      commit("SET_SETTINGS", settings);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(
        "You can add a `settings.json` file inside the `content/` folder to customize this theme."
      );
    }
  },
};
