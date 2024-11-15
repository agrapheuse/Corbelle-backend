export const getAllImages = async () => {
  try {
    return await Image.find(); // fetch all images
  } catch (error) {
    throw new Error("Failed to fetch images");
  }
};
