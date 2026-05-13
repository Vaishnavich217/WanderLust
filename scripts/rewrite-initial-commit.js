/* One-off: rebuild root commit so message has no Co-authored-by line. Run: node scripts/rewrite-initial-commit.js */
const { execSync } = require("child_process");
const path = require("path");

const root = path.join(__dirname, "..");
process.chdir(root);

process.env.GIT_AUTHOR_NAME = "vaishnavi217";
process.env.GIT_AUTHOR_EMAIL = "chvaishnavi425@gmail.com";
process.env.GIT_COMMITTER_NAME = "vaishnavi217";
process.env.GIT_COMMITTER_EMAIL = "chvaishnavi425@gmail.com";

execSync("git add -A", { stdio: "inherit" });
const tree = execSync("git write-tree").toString().trim();
const msg =
    "Initial commit: WanderLust listings app with Express, MongoDB, and EJS.";
const newSha = execSync(`git commit-tree ${tree} -m ${JSON.stringify(msg)}`)
    .toString()
    .trim();
execSync(`git reset --hard ${newSha}`, { stdio: "inherit" });
console.log("New commit:", newSha);
console.log(execSync("git log -1 --format=%B").toString());
