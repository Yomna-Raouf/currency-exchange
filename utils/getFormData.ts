
export const getFormData = (payloadObj: { [s: string]: unknown; } | ArrayLike<unknown>) :FormData => {
    const formData = new FormData();
    Object.entries(payloadObj).forEach((entry:  [string, any]) => {
        const [key, value] = entry;
        formData.append(key, value);
    })

    return formData;
};