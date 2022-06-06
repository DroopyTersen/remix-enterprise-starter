const { execSync } = require("child_process");
const fs = require("fs/promises");
const path = require("path");

const sort = require("sort-package-json");

function escapeRegExp(string) {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function main({ rootDirectory }) {
  const README_TEMPLATE_PATH = path.join(
    rootDirectory,
    "remix.init",
    "README.template.md"
  );
  const APP_NAME_REPLACER = "{REMIX-ENTERPRISE-STACK-APP-NAME}";
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, ".env.example");
  const ENV_PATH = path.join(rootDirectory, ".env");
  const PACKAGE_JSON_PATH = path.join(rootDirectory, "package.json");

  const DIR_NAME = path.basename(rootDirectory);

  const APP_NAME = DIR_NAME
    // get rid of anything that's not allowed in an app name
    .replace(/[^a-zA-Z0-9-_]/g, "-");

  const [readme, envExample, packageJson] = await Promise.all([
    fs.readFile(README_TEMPLATE_PATH, "utf-8"),
    fs.readFile(EXAMPLE_ENV_PATH, "utf-8"),
    fs.readFile(PACKAGE_JSON_PATH, "utf-8"),
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
    fs.writeFile(path.join(rootDirectory, "README.md"), newReadme),
    fs.writeFile(ENV_PATH, envExample),
    fs.writeFile(PACKAGE_JSON_PATH, newPackageJson),
    fs.copyFile(
      path.join(rootDirectory, "remix.init", "gitignore"),
      path.join(rootDirectory, ".gitignore")
    ),
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
