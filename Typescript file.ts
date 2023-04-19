import * as Octokit from "@octokit/rest";

// Create an Octokit instance with a personal access token
const octokit = new Octokit({
  auth: "YOUR_PERSONAL_ACCESS_TOKEN"
});
//Authenticate with the GitHub API using a personal access token:
const owner = "OWNER_OF_THE_REPOSITORY";
const repo = "NAME_OF_THE_REPOSITORY";

const { data: pullRequests } = await octokit.pulls.list({
  owner,
  repo,
  state: "open"
});
// Get the list of open pull requests for a specific repository:
const channelName = `pull-request-${pullRequest.number}`;
const channelType = "p";
const userIds = [pullRequest.user.id, ...pullRequest.assignees.map((assignee) => assignee.id)];

// Create the new Rocket.Chat channel
const { channel } = await rocketChatClient.channels.create(channelName, channelType);

// Invite the relevant users to the channel
await Promise.all(
  userIds.map((userId) =>
    rocketChatClient.channels.invite(channel._id, userId)
  )
);

// For each pull request, create a new Rocket.Chat channel and invite the relevant users:
const reminderMessage = "Don't forget to review the pull request!";

setInterval(async () => {
  await rocketChatClient.chat.postMessage({
    roomId: channel._id,
    text: reminderMessage
  });
}, REMINDER_INTERVAL_MS);
// Send reminders to the channel at regular intervals:
