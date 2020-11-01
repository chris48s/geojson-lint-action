const core = require("@actions/core");
const github = require("@actions/github");
const geojsonhint = require("@mapbox/geojsonhint");
const fs = require("fs");

async function run() {
  try {
    const token = core.getInput("github-token", { required: true });

    const { pull_request: pr } = github.context.payload;
    if (!pr) {
      throw new Error("Event payload missing `pull_request`");
    }

    const client = github.getOctokit(token);

    const filesPromise = client.pulls.listFiles.endpoint({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: pr.number,
    });
    const files = await client.paginate(filesPromise);

    let allErrors = [];
    files.forEach(function (file) {
      if (file.filename.match(/\.geojson$/)) {
        console.log(`Linting ${file.filename} ...`);
        const data = fs.readFileSync(file.filename, "utf8");
        const errors = geojsonhint.hint(data, {
          noDuplicateMembers: false,
          precisionWarning: false,
        });
        if (errors.length > 0) {
          allErrors.push({ filename: file.filename, errors: errors });
        }
      }
    });
    if (allErrors.length > 0) {
      core.setFailed(JSON.stringify(allErrors, null, 2));
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
