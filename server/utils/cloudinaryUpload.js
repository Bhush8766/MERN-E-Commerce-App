const cloudinary = require("../config/cloudinary");

/**
 * ==========================================
 * Upload Single Image
 * ==========================================
 */
const uploadImage = async (
  filePath,
  folder = "mern-ecommerce"
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });

    return {
      success: true,
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);

    throw new Error("Image upload failed");
  }
};

/**
 * ==========================================
 * Upload Multiple Images
 * ==========================================
 */
const uploadMultipleImages = async (
  files,
  folder = "mern-ecommerce"
) => {
  try {
    const images = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder,
        resource_type: "auto",
      });

      images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    return images;
  } catch (error) {
    console.error("Multiple Upload Error:", error);

    throw new Error("Multiple image upload failed");
  }
};

/**
 * ==========================================
 * Delete Image
 * ==========================================
 */
const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);

    return {
      success: true,
      message: "Image deleted successfully",
    };
  } catch (error) {
    console.error("Delete Image Error:", error);

    throw new Error("Image delete failed");
  }
};

/**
 * ==========================================
 * Replace Image
 * ==========================================
 */
const replaceImage = async (
  oldPublicId,
  newFilePath,
  folder = "mern-ecommerce"
) => {
  try {
    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId);
    }

    const result = await cloudinary.uploader.upload(newFilePath, {
      folder,
      resource_type: "auto",
    });

    return {
      success: true,
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    console.error("Replace Image Error:", error);

    throw new Error("Image replacement failed");
  }
};

/**
 * ==========================================
 * Upload Base64 Image
 * ==========================================
 */
const uploadBase64Image = async (
  base64,
  folder = "mern-ecommerce"
) => {
  try {
    const result = await cloudinary.uploader.upload(base64, {
      folder,
    });

    return {
      success: true,
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    console.error("Base64 Upload Error:", error);

    throw new Error("Base64 image upload failed");
  }
};

/**
 * ==========================================
 * Export
 * ==========================================
 */
module.exports = {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  replaceImage,
  uploadBase64Image,
};