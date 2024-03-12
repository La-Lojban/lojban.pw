export function retainStringValues(jsonObject: any, extraKeysToRemove: string[] = []) {
  // Initialize an empty object to hold the keys with string values
  let newObject: any = {};

  // Iterate over the keys of the input JSON object
  for (let key in jsonObject) {
    // Check if the value of the current key is a string
    if (typeof jsonObject[key] === "string") {
      // If it is, add the key-value pair to the new object
      newObject[key] = jsonObject[key];
    }
  }

  extraKeysToRemove.forEach((key) => {
    delete newObject[key];
  });

  // Return the new object containing only the keys with string values
  return newObject;
}

export function debounce(func: any, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function () {
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(null, args);
    }, delay);
  };
}