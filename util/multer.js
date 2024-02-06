const multer = require("multer");
const path = require("path");

const fileStorage = (destination) =>
    multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    });

const upload = (destination, allowedFileTypes) =>
    multer({
        storage: fileStorage(destination),
        fileFilter: (req, file, cb) => {
            // Check if file type is allowed
            const isAllowed = allowedFileTypes.includes(file.mimetype);
            if (isAllowed) {
                // Accept file
                cb(null, true);
            } else {
                // Reject file
                cb(new Error("File type not allowed"));
            }
        },
    });

module.exports = upload;