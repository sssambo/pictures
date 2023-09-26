const fs = require('fs');
const sharp = require('sharp');

// Directory where your images are located
const directory = './';

// Desired output resolution
const targetWidth = 920;
const targetHeight = 720;

// Read the files in the directory
fs.readdir(directory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter for image files (jpg and png)
  const imageFiles = files.filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

  // Process each image
  imageFiles.forEach((file) => {
    const inputPath = directory + file;
    const outputPath = directory + 'temp_' + file; // Temporary file

    // Resize and save to a temporary file
    sharp(inputPath)
      .resize(targetWidth, targetHeight)
      .toFile(outputPath, (resizeErr, info) => {
        if (resizeErr) {
          console.error('Error resizing image:', resizeErr);
          return;
        }

        // Replace the original image with the temporary one
        fs.rename(outputPath, inputPath, (renameErr) => {
          if (renameErr) {
            console.error('Error replacing image:', renameErr);
            return;
          }
          console.log(`Resized and replaced ${file} with ${targetWidth}x${targetHeight}`);
        });
      });
  });
});
