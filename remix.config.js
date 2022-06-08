const path = require("path");
let envPath = path.join(__dirname, "env", ".env." + (process.env.PUBLIC_ENV || "local"));

require("dotenv").config({ path: envPath });

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
