import { Octokit } from "octokit";
import readline from "readline/promises";
const token = "PUT YOUR GITHUB TOKEN HERE";

const octokit = new Octokit({
  auth: token,
});

const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  // const repos = await octokit.request("GET /user/repos");
  const repos = await octokit.paginate("GET /user/repos", {
    owner: "SamroodAli",
    per_page: 100,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  for (const repo of repos.map((each) => each.name)) {
    const answer = await userInput.question(`Delete ${repo} ? y or n\n`);
    if (answer === "y") {
      await octokit.request(`DELETE /repos/SamroodAli/${repo}`, {
        owner: "SamroodAli",
        repo,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }).catch(error => console.error(error))
      console.log(`${repo} Deleted`);
    }
  }
  userInput.close();
})();
