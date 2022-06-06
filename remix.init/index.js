const { execSync } = require("child_process");
const fs = require("fs/promises");
const path = require("path");

const sort = require("sort-package-json");

let createFilePaths = (rootDirectory) => {
  const filePaths = {
    README_TEMPLATE: path.join(
      rootDirectory,
      "remix.init",
      "README.template.md"
    ),
    README_DESTINATION: path.join(rootDirectory, "README.md"),
    GITIGNORE_TEMPLATE: path.join(rootDirectory, "remix.init", "gitignore"),
    GITIGNORE_DESTINATION: path.join(rootDirectory, ".gitignore"),
    ENV_EXAMPLE: path.join(rootDirectory, "env", ".env.local.example"),
    ENV_DESTINATION: path.join(rootDirectory, "env", ".env.local"),
    PACKAGE_JSON: path.join(rootDirectory, "package.json"),
  };

  return filePaths;
};

function escapeRegExp(string) {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function main({ rootDirectory }) {
  const APP_NAME_REPLACER = "{REMIX-ENTERPRISE-STACK-APP-NAME}";
  const DIR_NAME = path.basename(rootDirectory);
  let filePaths = createFilePaths(rootDirectory);
  const APP_NAME = DIR_NAME
    // get rid of anything that's not allowed in an app name
    .replace(/[^a-zA-Z0-9-_]/g, "-");

  const [readme, envExample, packageJson] = await Promise.all([
    fs.readFile(filePaths.README_TEMPLATE, "utf-8"),
    fs.readFile(filePaths.ENV_EXAMPLE, "utf-8"),
    fs.readFile(filePaths.PACKAGE_JSON, "utf-8"),
  ]);

  const newReadme = readme.replace(
    new RegExp(escapeRegExp(APP_NAME_REPLACER), "g"),
    APP_NAME
  );

  const newPackageJson =
    JSON.stringify(
      sort({ ...JSON.parse(packageJson), name: APP_NAME }),
      null,
      2
    ) + "\n";

  await Promise.all([
    fs.writeFile(filePaths.README_DESTINATION, newReadme),
    fs.writeFile(filePaths.ENV_DESTINATION, envExample),
    fs.writeFile(filePaths.PACKAGE_JSON, newPackageJson),
    fs.copyFile(filePaths.GITIGNORE_TEMPLATE, filePaths.GITIGNORE_DESTINATION),
  ]);

  execSync(`npx rimraf .git`, { stdio: "inherit", cwd: rootDirectory });
  execSync(`git init`, { stdio: "inherit", cwd: rootDirectory });
  execSync(`git add -A`, { stdio: "inherit", cwd: rootDirectory });
  execSync(`git commit -m "initial commit"`, {
    stdio: "inherit",
    cwd: rootDirectory,
  });

  console.log(
    `Setup is complete. You're now ready to rock and roll 🤘

Start development with \`npm run dev\`
    `.trim()
  );
}

module.exports = main;
