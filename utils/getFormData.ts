export const getFormData = (
  payloadObj: { [s: string]: string } | ArrayLike<string>,
): FormData => {
  const formData = new FormData();
  Object.entries(payloadObj).forEach((entry: [string, string]) => {
    const [key, value] = entry;
    formData.append(key, value);
  });

  return formData;
};
