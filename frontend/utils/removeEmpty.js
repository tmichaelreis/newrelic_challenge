// Returns a new object with key/value pairs removed where the
// value is null, undefined or empty string
export const removeEmpty = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([_, v]) => !(v === null || v === undefined || v === "")
    )
  );
