# GitHub Pull Request Reminders for Rocket.Chat
Introduction
This project is a part of the Google Summer of Code program and aims to develop a pull request reminder app for Rocket.Chat to help teams keep track of their pull request reviews. The app will send regular reminders and updates to ensure that pull requests are being reviewed and discussed in a timely manner.This project will be built on top of the existing GitHub App and will utilize the GitHub API to retrieve information about open pull requests.

# Project Scope
The app will be designed to work with GitHub repositories and will focus on providing regular reminders to keep the review process moving. One approach to solving the issue of pending pull requests is to create a separate Rocket.Chat channel for each pull request. This way, all relevant stakeholders can be added to the channel, including the author of the pull request, the reviewers, and any other team members who need to be informed about the status of the review.The Rocket.Chat channels can serve as a dedicated space for discussion and collaboration around each pull request. Users can receive notifications about updates to the pull request, such as new comments or changes to the code. This helps keep everyone informed and ensures the review process stays on track.

Development
# Prerequisites
To develop this app, you will need:

 1)Node.js version 12 or higher npm (included with Node.js)
2)A Rocket.Chat server instance
3) A GitHub account
4) A GitHub OAuth app





# Gsoc-2023-Rocket.chat
The GitHub Rocket.Chat App provides a seamless integration between GitHub and Rocket.Chat and improves collaboration between developers.Now a pull request reminder app can be added to this or can be deployed with it which can work like Axolo a basic pull request reminder app for Slack.
First, we will need to authenticate with the GitHub API using a private key. Then, we can use the API to retrieve the list of pull requests that are pending review. We can filter the list by the number of days since the pull request was created to send a reminder to the reviewers if the pull request has been pending for a long time. Finally, we can use a webhook to send the reminder to the reviewers on Rocket.Chat.
This code uses the GitHub API to retrieve open pull requests for a specified repository, and then posts a reminder message to a specified Rocket.Chat channel for each pull request. You will need to replace the placeholder values in the code with your own GitHub and Rocket.Chat API credentials and details, and customize the channel name and repository details to match your own use case.


# Python Second File.py :-
 1) Create a Rocket.Chat app and configure the necessary permissions and settings. You can use the Rocket.Chat app-engine framework to develop your app.

 2) Create a GitHub app and configure the necessary permissions and settings. You'll need to use the GitHub API to authenticate with the app and retrieve information about open pull requests.

 3) Use the GitHub API to retrieve information about open pull requests for a specified repository. You can use the GET /repos/:owner/:repo/pulls endpoint to retrieve pull requests.

4) For each open pull request, calculate how long it has been open and send a reminder message to the appropriate Rocket.Chat channel or user. You can use the Rocket.Chat API to post messages to channels or direct messages to users.

5) Set up a scheduler to run the app periodically (e.g., once per day) and check for new or updated pull requests.



 # Here are some basic code prompts to get you started on developing a GitHub pull request reminder app for Rocket.Chat:

Authentication: You will need to authenticate with both the GitHub API and the Rocket.Chat API in order to retrieve information about pull requests and send reminders to users. You can use OAuth or personal access tokens to authenticate with the APIs.

Retrieving pull requests: Use the GitHub API to retrieve a list of open pull requests for a given repository. You can filter the list by labels, assignees, or other parameters as needed.

Parsing pull request data: Parse the JSON response from the GitHub API to extract relevant information about each pull request, such as the title, URL, author, and reviewers.

Creating Rocket.Chat channels: Create a new channel in Rocket.Chat for each open pull request. Invite the author, reviewers, and any other relevant stakeholders to the channel.

Posting reminders to channels: Post reminder messages to the appropriate Rocket.Chat channels at regular intervals (e.g. once a day) to remind users to review their assigned pull requests. You can use the Rocket.Chat API to post messages and set up message scheduling.

Handling updates and notifications: Use webhooks or long polling to receive updates from the GitHub API when there are new comments or changes to a pull request. Use the Rocket.Chat API to send notifications to users about the updates.

