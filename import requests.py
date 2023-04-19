import requests
import time

def check_pull_requests():
    # Enter your GitHub API credentials and repository details here
    username = 'YOUR_GITHUB_USERNAME'
    password = 'YOUR_GITHUB_PASSWORD_OR_TOKEN'
    repo_owner = 'REPOSITORY_OWNER'
    repo_name = 'REPOSITORY_NAME'
    
    # Make a GET request to the GitHub API to retrieve open pull requests for the repository
    headers = {'Accept': 'application/vnd.github.v3+json'}
    url = f'https://api.github.com/repos/{repo_owner}/{repo_name}/pulls?state=open'
    r = requests.get(url, auth=(username, password), headers=headers)
    
    # Parse the response to get the pull request titles and URLs
    if r.status_code == 200:
        pull_requests = r.json()
        if pull_requests:
            messages = []
            for pr in pull_requests:
                title = pr['title']
                url = pr['html_url']
                message = f"Reminder: There is an open pull request for '{title}' ({url})"
                messages.append(message)
            return messages
        else:
            return None
    else:
        print(f"Error retrieving pull requests: {r.status_code}")
        return None

def post_to_rocketchat(messages):
    # Enter your Rocket.Chat API details here
    server_url = 'https://your-rocket-chat-server.com'
    user_id = 'YOUR_ROCKET_CHAT_USER_ID'
    user_token = 'YOUR_ROCKET_CHAT_USER_TOKEN'
    channel_name = 'CHANNEL_NAME'
    
    # Make a POST request to the Rocket.Chat API to post the reminder messages to the channel
    headers = {'X-Auth-Token': user_token, 'X-User-Id': user_id, 'Content-Type': 'application/json'}
    for message in messages:
        data = {'channel': channel_name, 'text': message}
        url = f'{server_url}/api/v1/chat.postMessage'
        r = requests.post(url, headers=headers, json=data)
        if r.status_code != 200:
            print(f"Error posting to Rocket.Chat: {r.status_code}")

# Run the app every 24 hours
while True:
    messages = check_pull_requests()
    if messages:
        post_to_rocketchat(messages)
    time.sleep(86400)
