const getItem = (key: string): any => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return undefined;
    }
    return JSON.parse(serializedValue);
  } catch (err) {
    return undefined;
  }
};

const setItem = (key: string, value: any) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (err) {
    // TODO: add error handling here, may not be needed
  }
};

export default {getItem, setItem};
