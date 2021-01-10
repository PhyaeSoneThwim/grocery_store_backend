const fs = require("fs");
module.exports = (path) => {
  fs.unlink(path, (error) => {
    if (error) throw error;
  });
};
