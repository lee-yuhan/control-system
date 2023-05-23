export const obj2FormData = (obj: Object) => {
  const formData = new FormData();
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    formData.append(key, obj[key]);
  });
  return formData;
};
