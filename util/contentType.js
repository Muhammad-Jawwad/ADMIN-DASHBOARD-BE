const path = require("path");
exports.getContentType = (filePath) => {
    const extension = path.extname(filePath).toLowerCase();

    switch (extension) {
        case ".jpg":
        case ".jpeg":
            return "image/jpeg";
        case ".png":
            return "image/png";
        case ".pdf":
            return "application/pdf";
        case ".docx":
            return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        default:
            return "application/octet-stream";
    }
};
