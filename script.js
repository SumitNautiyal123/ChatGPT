import { Configuration, OpenAIApi } from "openai";
import axios from "axios";
import readline from "readline";
import { config } from "dotenv";
config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const githubToken = process.env.GIT_API_TOKEN;
const githubUsername = process.env.GIT_USERNAME;

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.on("line", async (input) => {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  });

  if (input.toLowerCase().includes("pull")) {
    const pullRequestCount = await getTotalPullRequestCount(githubUsername);
    if (pullRequestCount !== null) {
      console.log(
        `Total pull request count for ${githubUsername}: ${pullRequestCount}`
      );
    }
  } else if (input.toLowerCase().includes("closed")) {
    const pullRequestCount = await getClosedRequestCount(githubUsername);
    if (pullRequestCount !== null) {
      console.log(
        `Total closed request count for ${githubUsername}: ${pullRequestCount}`
      );
    }
  } else if (input.toLowerCase().includes("issue")) {
    const pullRequestCount = await getIssueRequestCount(githubUsername);
    if (pullRequestCount !== null) {
      console.log(
        `Total issue request count for ${githubUsername}: ${pullRequestCount}`
      );
    }
  } else if (input.toLowerCase().includes("open")) {
    const pullRequestCount = await getOpenRequestCount(githubUsername);
    if (pullRequestCount !== null) {
      console.log(
        `Total open request count for ${githubUsername}: ${pullRequestCount}`
      );
    }
  } else {
    console.log(res.data.choices[0].message.content);
  }
  userInterface.prompt();
});

// async function main() {
//   console.log("ada");
//   const url = `https://api.openai.com/v1/completions`;
//   const headers = {
//     Authorization: `Bearer ${process.env.API_KEY}`,
//   };
//   console.log(headers);
//   try {
//     const response = await axios(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.API_KEY}`,
//       },
//       body: {
//         model: "text-davinci-003",
//         prompt:
//           "How many pull requests are there in the SumitNautiyal123 GitHub repository?",
//         max_tokens: 7,
//         temperature: 0,
//       },
//     });
//     console.log(response);
//     // if (response.status === 200) {
//     //   const totalPullRequest = response.data.total_count;
//     //   return totalPullRequest;
//     // } else {
//     //   console.error(`Error: ${response.status}`);
//     //   return null;
//     //}
//   } catch (error) {
//     console.error("Error:", error.message);
//     return null;
//   }
// }

// main();

async function getTotalPullRequestCount(username, query) {
  const url = `https://api.github.com/search/issues?q=author:${username}+is:pr`;
  const headers = {
    Authorization: `token ${githubToken}`,
  };

  try {
    const response = await axios(url, { headers });

    if (response.status === 200) {
      const totalPullRequest = response.data.total_count;
      return totalPullRequest;
    } else {
      console.error(`Error: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

async function getOpenRequestCount(username, query) {
  const url = `https://api.github.com/search/issues?q=author:${username}+is:pr+is:open`;
  const headers = {
    Authorization: `token ${githubToken}`,
  };

  try {
    const response = await axios(url, { headers });

    if (response.status === 200) {
      const totalPullRequest = response.data.total_count;
      return totalPullRequest;
    } else {
      console.error(`Error: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

async function getClosedRequestCount(username, query) {
  const url = `https://api.github.com/search/issues?q=author:${username}+is:pr+is:closed`;
  const headers = {
    Authorization: `token ${githubToken}`,
  };

  try {
    const response = await axios(url, { headers });

    if (response.status === 200) {
      const totalPullRequest = response.data.total_count;
      return totalPullRequest;
    } else {
      console.error(`Error: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

async function getIssueRequestCount(username, query) {
  const url = `https://api.github.com/search/issues?q=author:${username}+is:issue`;
  const headers = {
    Authorization: `token ${githubToken}`,
  };

  try {
    const response = await axios(url, { headers });

    if (response.status === 200) {
      const totalPullRequest = response.data.total_count;
      return totalPullRequest;
    } else {
      console.error(`Error: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

console.log(process.env.API_KEY);

// async function main() {
//   const generatedQuery = await generateGitQuery(githubUsername);
//   console.log(`Generated Query: ${generatedQuery}`);

//   const pullRequestCount = await getTotalPullRequestCount(githubUsername);
//   if (pullRequestCount !== null) {
//     console.log(
//       `Total pull request count for ${githubUsername}: ${pullRequestCount}`
//     );
//   }
// }

// main();

// using openai chat

// import { config } from "dotenv";
// config();

// import { Configuration, OpenAIApi } from "openai";
// import readline from "readline";
// const openai = new OpenAIApi(
//   new Configuration({
//     apiKey: process.env.API_KEY,
//   })
// );
// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// userInterface.prompt();
// userInterface.on("line", async (input) => {
//   const res = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: input }],
//   });
//   console.log(res.data.choices[0].message.content);
//   userInterface.prompt();
// });

// console.log(process.env.API_KEY);
