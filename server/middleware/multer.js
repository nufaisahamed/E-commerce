// const multer = require ("multer")
// const Storage = multer.diskStorage({
//     destination:"./uploads/",
//     filename :(req,file,cb)=>{
//         cb(null , file.originalname);
//     }

// })


// const upload = multer({storage: Storage});
// module.exports= upload;




// ------------------------------------------------------------------
const multer = require("multer");
const path = require('path');

// Set up storage configuration
const Storage = multer.diskStorage({
    destination: "./uploads/", // Directory to store files
    filename: (req, file, cb) => {
        // Generate a unique filename using the current timestamp and original file name
        const uniqueSuffix = Date.now() + path.extname(file.originalname); // Use file extension
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Allow only image formats
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
        return cb(null, true); // Accept the file
    } else {
        cb(new Error('Only image files are allowed!'), false); // Reject non-image files
    }
};

const upload = multer({
    storage: Storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Optional: limit file size (e.g., 5MB)
});

module.exports = upload;
