import multer from "multer";
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
  destination: "./uploads/", // Where to save the images
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  },
});

// Initialize Multer
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 5MB file limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) return cb(null, true);
    cb("Error: Images Only!");
  },
});

export default upload;
