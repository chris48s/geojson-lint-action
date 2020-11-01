const core = require("@actions/core");
const github = require("@actions/github");
const { errorsToConsoleString, lintFiles } = require("./lib.js");

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

    const errors = lintFiles(files);
    if (errors.length > 0) {
      core.setFailed(errorsToConsoleString(errors));
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
