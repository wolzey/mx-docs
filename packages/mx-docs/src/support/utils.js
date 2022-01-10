export const encodeValue = (value) => {
  if (typeof value === "string") {
    return value;
  }

  return JSON.stringify(value);
};

export const decodeValue = (value) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (_) {}
  }

  return value;
};

export const isSet = (v) => {
  return typeof v !== "undefined" && v !== null;
};

export const isUnset = (v) => !isSet(v);
