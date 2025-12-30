require('dotenv').config()
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  secure: true,
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key :process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadImage = async (imagePath) => {

    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    };

    try {
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.url;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

const deleteCloudFile = async (url) => {
  try {
    if (!url) return;

    const matches = url.match(/\/([^\/]+)\.[a-z]{3,4}$/i);
    if (!matches) return;

    const publicId = matches[1];

    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete failed:", err.message);
  }
};
// /////////////////////////////////////
// // Gets details of an uploaded image
// /////////////////////////////////////
// const getAssetInfo = async (publicId) => {

//     // Return colors in the response
//     const options = {
//       colors: true,
//     };

//     try {
//         // Get details about the asset
//         const result = await cloudinary.api.resource(publicId, options);
//         console.log(result);
//         return result.colors;
//         } catch (error) {
//         console.error(error);
//     }
// };

module.exports = {uploadImage , deleteCloudFile }