import Vue from "vue";
import Storage from "~/support/storage";

export default function ({ localVue = Vue }, inject) {
  const defaultOptions = {
    localStorage: {
      prefix: "_.access.theme",
    },

    ignoreExceptions: false,
  };

  const $storage = new Storage(defaultOptions);

  localVue.prototype.$storage = $storage;
  inject("storage", $storage);
}
