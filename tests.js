const chai = require("chai");
const assert = chai.assert;
const { lintFiles } = require("./lib.js");

describe("lintFiles", function () {
  it("should return empty array if all files are good", function () {
    const errors = lintFiles([
      { filename: "testdata/good1.geojson" },
      { filename: "testdata/good2.geojson" },
    ]);
    assert.equal(0, errors.length);
  });

  it("should return error messages for bad files", function () {
    const errors = lintFiles([
      { filename: "testdata/good1.geojson" },
      { filename: "testdata/good2.geojson" },
      { filename: "testdata/bad1.geojson" },
      { filename: "testdata/bad2.geojson" },
      { filename: "testdata/somethingelse.txt" },
    ]);
    assert.equal(2, errors.length);
    assert.equal(
      "Every feature must be an object",
      errors[0].errors[0].message
    );
    assert.equal(
      "each element in a position must be a number",
      errors[1].errors[0].message
    );
  });

  it("should not throw any errors with no files", function () {
    const errors = lintFiles([]);
    assert.equal(0, errors.length);
  });

  it("should ignore non-geojson files", function () {
    const errors = lintFiles([{ filename: "testdata/somethingelse.txt" }]);
    assert.equal(0, errors.length);
  });

  it("should pass through noDuplicateMembers flag", function () {
    let errors = lintFiles([{ filename: "testdata/duplicates.geojson" }]);
    assert.equal(1, errors.length);
    errors = lintFiles([{ filename: "testdata/duplicates.geojson" }], {
      noDuplicateMembers: false,
    });
    assert.equal(0, errors.length);
  });

  it("should pass through precisionWarning flag", function () {
    let errors = lintFiles([{ filename: "testdata/precision.geojson" }]);
    assert.equal(0, errors.length);
    errors = lintFiles([{ filename: "testdata/precision.geojson" }], {
      precisionWarning: true,
    });
    assert.equal(1, errors.length);
  });
});
