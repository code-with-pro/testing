import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

const markCommit = async (date) => {
  const data = { date: date, random: random.int(0, 1000000) };
  await jsonfile.writeFile(path, data);
  await git.add([path]);
  await git.commit(date, { "--date": date });
};

const makeCommits = async () => {
  const startDate = moment("2024-01-05");
  const endDate = moment("2025-09-01");

  let currentDate = startDate.clone();
  let commitCount = 0;

  while (currentDate.isSameOrBefore(endDate)) {
    // Make 1-12 commits on the current day (randomly)
    const commitsPerDay = random.int(1, 10);

    for (let i = 0; i < commitsPerDay; i++) {
      const commitDate = currentDate.format();
      await markCommit(commitDate);
      commitCount++;
      console.log(`Commit ${commitCount}: ${commitDate}`);
    }

    // Skip 1-4 days randomly (more realistic activity)
    const gapDays = random.int(1, 3);
    currentDate.add(gapDays, "days");
    console.log(`Skipping ${gapDays} days...`);
  }

  console.log(`Total commits: ${commitCount}`);
  console.log("Done! (Not pushing yet)");
};

makeCommits().catch(console.error);
