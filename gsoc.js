const { createAppAuth } = require('@octokit/auth-app');//these are the libraries that are used to retrive the 
//Github API's and private key's.
const { Octokit } = require('@octokit/rest');//these is the libraries that is used to fetch the details of
//all the pull request's that are made by the user or developer.
const { Webhook } = require('@octokit/webhooks');//  library to listen to pull request events 
//and send reminders to reviewers on Rocket.Chat. 

const privateKey = process.env.PRIVATE_KEY;//These lines retrieve the private key, app ID, 
//and installation ID from environment variables. 
//These values are used to authenticate with the GitHub API.
const appId = process.env.APP_ID;
const installationId = process.env.INSTALLATION_ID;

const appAuth = createAppAuth({
  appId,
  privateKey,
});
//These lines use the createAppAuth function to authenticate with the GitHub API using the private key and app ID. 
//The /*  */resulting appAuth object is used to create an instance of the Octokit class, 
//which is used to make API requests.

const octokit = new Octokit({
  auth: await appAuth({ type: 'installation', installationId }),
});

const webhook = new Webhook({
  secret: process.env.WEBHOOK_SECRET,
});

webhook.on('pull_request', async ({ payload }) => {
  const pullRequest = payload.pull_request;
  const created = new Date(pullRequest.created_at);
  const now = new Date();
  const diffInDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));

  if (pullRequest.state === 'open' && pullRequest.requested_reviewers.length > 0 && diffInDays > 3) {
    const reviewers = pullRequest.requested_reviewers.map((reviewer) => '@' + reviewer.login).join(', ');

    const message = `Reminder: Pull request ${pullRequest.title} is pending review for ${diffInDays} days. Reviewers: ${reviewers}`;

    // Send message to Rocket.Chat
    // TODO: Implement Rocket.Chat integration
  }
});

webhook.listen(process.env.PORT || 3000);