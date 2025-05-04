const fs = require("fs");
const asyncHandler = require("express-async-handler");

const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});


// const deleteImages = async (req, res) => {
//   try {
//     const filename = req.params.id;
//     const filepath = path.join(__dirname, `../public/images/products/${filename}`);

//     if (fs.existsSync(filepath)) {
//       fs.unlinkSync(filepath);
//       res.status(200).json({ message: "Image deleted successfully" });
//     } else {
//       res.status(404).json({ error: "Image not found" });
//     }
//   } catch (error) {
//     console.error("Image deletion error:", error);
//     res.status(500).json({ error: "Failed to delete image" });
//   }
// };

module.exports = {
  uploadImages,
  deleteImages,
};
