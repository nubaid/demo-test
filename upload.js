const fs = require("fs-extra");

// method to extract extension from filename
// e.g. returns '.jpg' from 'usericon.jpg'
const getExtensionFromFile = filename => {
  if (filename) {
    let re = /(?:\.([^.]+))?$/;
    return re.exec(filename)[1];
  }
  console.log("(getExtensionFromFile()) Empty file name");
  return "error- Empty filename";
};

/**
 * method to upload file to uploads dir
 * @param {*} file file Object from client
 */
const upload = async (file, uploadFileName, id) => {
  const { createReadStream, filename } = await file;
  return fs
    .ensureDir(`./uploads/customers/${id}/${uploadFileName}`)
    .then(async () => {
      console.log(`uploading to uploads/customers/${id}/${uploadFileName}`);
      return await new Promise((resolve, reject) =>
        createReadStream()
          .pipe(
            fs.createWriteStream(`./uploads/customers/${id}/${uploadFileName}`)
          )
          .on("finish", () => resolve(uploadFileName))
          .on("error", reject)
      );
    })
    .catch(err => console.log(err));
};

// accepts a filename and type, returns type+datetime+extension as filename
const createUploadFilename = (type, filename) => {
  return `${type}${new Date().getTime()}.${getExtensionFromFile(filename)}`;
};

module.exports = {
  upload,
  getExtensionFromFile,
  createUploadFilename
};
