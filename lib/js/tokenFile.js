const fs = require("fs");
const FILE_PATH = process.env.ZOHO_CLIENT_TOKEN_PATH || "token.txt"

function parseFile() {
  return new Promise(resolve => {
    fs.readFile(FILE_PATH, function(err, buf) {
      if(err) return resolve(null)
      try {
        const parsedData = JSON.parse(buf.toString());
        return resolve(parsedData)
      } catch (e) {
        return resolve(null)
      }
    });
  })
}

function writeFile(data) {
  fs.writeFile(FILE_PATH, JSON.stringify(data), (err) => {
    if (err) throw new Error(err);
    return;
  });
}

module.exports = {
  parseFile, writeFile
}
