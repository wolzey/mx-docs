import { encodeValue, decodeValue, isUnset } from "./utils";

class Storage {
  constructor(options) {
    this.options = options;
  }

  _localStorageKey(key) {
    return this.options.localStorage.prefix + key;
  }

  _localStorageEnabled() {
    return typeof localStorage !== "undefined";
  }

  setLocalStorage(key, value) {
    if (isUnset(value)) {
      this.removeLocalStorage(key);
    }

    if (typeof localStorage === "undefined") {
      return;
    }

    const _key = this.options.localStorage.prefix + key;

    try {
      localStorage.setItem(_key, encodeValue(value));
    } catch (e) {
      if (!this.options.ignoreExceptions) {
        throw e;
      }
    }

    return value;
  }

  removeLocalStorage(key) {
    if (!this._localStorageEnabled) return;

    const _key = this.options.localStorage.prefix + key;

    localStorage.removeItem(_key);
  }

  getLocalStorage(key) {
    if (!this._localStorageEnabled) return;

    const value = localStorage.getItem(this._localStorageKey(key));

    return decodeValue(value);
  }
}

export default Storage;
