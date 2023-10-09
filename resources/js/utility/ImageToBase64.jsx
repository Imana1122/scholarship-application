/**
 * Convert an image file to a base64 encoded string.
 * @param {File} file - The image file to convert.
 * @returns {Promise<string>} A Promise that resolves with the base64 encoded string of the image.
 */
async function ImageToBase64(file) {
    // Create a new FileReader instance
    const reader = new FileReader();

    // Read the image file as a data URL
    reader.readAsDataURL(file);

    // Create a Promise to handle the asynchronous reading
    const data = new Promise((resolve, reject) => {
      // When the file is loaded successfully, resolve the Promise with the result
      reader.onload = () => resolve(reader.result);

      // If an error occurs during reading, reject the Promise with the error
      reader.onerror = (err) => reject(err);
    });

    // Return the Promise that will resolve with the base64 encoded string
    return data;
  }

  export { ImageToBase64 };
