const geojsonhint = require("@mapbox/geojsonhint");
const fs = require("fs");

function lintFiles(files, opts) {
  let allErrors = [];
  files.forEach(function (file) {
    if (file.filename.match(/\.geojson$/)) {
      console.log(`Linting ${file.filename} ...`);
      const data = fs.readFileSync(file.filename, "utf8");
      const errors = geojsonhint.hint(data, opts);
      if (errors.length > 0) {
        console.log(`❌ Failed`);
        allErrors.push({ filename: file.filename, errors: errors });
      } else {
        console.log(`✅ Passed`);
      }
    }
  });
  return allErrors;
}

function errorsToConsoleString(errors) {
  return JSON.stringify(errors, null, 2);
}

module.exports = { errorsToConsoleString, lintFiles };
