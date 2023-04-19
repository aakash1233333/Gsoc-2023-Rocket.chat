# Gsoc-2023-Rocket.chat
The GitHub Rocket.Chat App provides a seamless integration between GitHub and Rocket.Chat and improves collaboration between developers.Now a pull request reminder app can be added to this or can be deployed with it which can work like Axolo a basic pull request reminder app for Slack.
First, we will need to authenticate with the GitHub API using a private key. Then, we can use the API to retrieve the list of pull requests that are pending review. We can filter the list by the number of days since the pull request was created to send a reminder to the reviewers if the pull request has been pending for a long time. Finally, we can use a webhook to send the reminder to the reviewers on Rocket.Chat.
This code uses the GitHub API to retrieve open pull requests for a specified repository, and then posts a reminder message to a specified Rocket.Chat channel for each pull request. You will need to replace the placeholder values in the code with your own GitHub and Rocket.Chat API credentials and details, and customize the channel name and repository details to match your own use case.

Example text message for Rocket.Chat channel:
"🔔 Attention reviewers! This pull request has been pending for [number] days now. Let's make sure to give it the attention it deserves and keep the review process moving forward 🚀"
In addition, the users can also opt-in to receive a direct message from the bot at the start of their workday, with a comprehensive list of all the reviews that need his/her attention.
Example DM text messages:
"👀 Time to give those pull requests some love! You've got [number] pending review(s) waiting for you. Don't keep your fellow developers waiting 😊"
"🔔 Don't let those pull requests get forgotten! You've got [number] waiting for your review. Let's get to work 💻"
"🚀 It's time to move those pull requests forward! You've got [number] waiting for your review. Give them the green light 💚"

# Python Second File.py :-
 1) Create a Rocket.Chat app and configure the necessary permissions and settings. You can use the Rocket.Chat app-engine framework to develop your app.

 2) Create a GitHub app and configure the necessary permissions and settings. You'll need to use the GitHub API to authenticate with the app and retrieve information about open pull requests.

 3) Use the GitHub API to retrieve information about open pull requests for a specified repository. You can use the GET /repos/:owner/:repo/pulls endpoint to retrieve pull requests.

4) For each open pull request, calculate how long it has been open and send a reminder message to the appropriate Rocket.Chat channel or user. You can use the Rocket.Chat API to post messages to channels or direct messages to users.

5) Set up a scheduler to run the app periodically (e.g., once per day) and check for new or updated pull requests.
