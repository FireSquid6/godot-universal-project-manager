const shell = require("shelljs");
const fs = require("fs");
const path = require("path");
const { zip } = require("zip-a-folder");
const os_name = require("os").platform();
const { Octokit } = require("@octokit/rest");

// set the access token to be the first command line argument passsed along with this command
// e.g. node ci.js <access_token>
const access_token = process.argv[2];

async function main() {
  // get the version from package.json
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const version = packageJson.version;
  console.log(version);

  // if the zip file doesn't already exist, build the project
  if (!fs.existsSync(`./${os_name}-${version}.zip`)) {
    // build the project
    if (shell.exec("npm run build").code !== 0) {
      shell.echo("Error: Build failed");
      shell.exit(1);
    }

    // put all items in the release folder into a zip file
    console.log("\nZipping Files...");
    await zip(`./release/${version}`, `./${os_name}-${version}.zip`);
  }

  // load the text from the changelog
  console.log("reading changelog...");
  const changelog = fs.readFileSync("CHANGELOG.md", "utf8");

  // if there is no github release for this version, create one
  console.log("creating release...");
  let release = null;

  const octokit = new Octokit({
    auth: access_token,
  });
  try {
    release = await octokit.repos.getReleaseByTag({
      owner: "firesquid6",
      repo: "godot-universal-project-manager",
      tag: version,
    });
    console.log("release already exists");
  } catch {
    release = await octokit.repos.createRelease({
      owner: "firesquid6",
      repo: "godot-universal-project-manager",
      tag_name: version,
      name: `Release v${version}`,
      body: changelog,
    });
    console.log("release created");
  }

  // upload the zip file to the release
  console.log("\nUploading Release...");
  const length = fs.statSync(`./${os_name}-${version}.zip`).size;
  await octokit.repos.uploadReleaseAsset({
    file: `./${os_name}-${version}.zip`,
    url: release.data.upload_url,
    release_id: release.data.id,
    headers: {
      "content-type": "application/zip",
      "content-length": length,
    },
    name: `${os_name}-${version}.zip`,
  });
}

main();
