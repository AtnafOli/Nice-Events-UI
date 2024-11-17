const { execSync } = require("child_process");
const readline = require("readline");

const REPO_URL = "https://github.com/AtnafOli/Nice-Events-Ui";
const BRANCH = "main";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

(async () => {
  try {
    console.log("Checking Git repository status...");

    const status = execSync("git status --porcelain", {
      encoding: "utf8",
    }).trim();
    const hasChanges = status.length > 0;

    if (hasChanges) {
      console.log("Uncommitted changes detected.");
      const commitMessage = await prompt("Enter your commit message: ");

      console.log("Adding changes...");
      execSync("git add .", { stdio: "inherit" });

      console.log(`Committing changes with message: "${commitMessage}"`);
      execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });
    } else {
      console.log("No changes to commit. Proceeding to push...");
    }

    console.log(`Pushing changes to branch: ${BRANCH}`);
    execSync(`git push ${REPO_URL} ${BRANCH}`, { stdio: "inherit" });

    console.log("Changes pushed successfully!");
  } catch (error) {
    console.error("An error occurred:", error.message);
  } finally {
    rl.close();
  }
})();
