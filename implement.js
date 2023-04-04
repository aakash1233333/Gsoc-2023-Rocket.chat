import { IHttp, IMessageBuilder, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { ILivechatRoom } from '@rocket.chat/apps-engine/definition/livechat';

export class PullRequestReminderApp extends App {
  constructor(info: IAppInfo, logger: any) {
    super(info, logger);
  }

  async initialize() {
    // Register a webhook endpoint to receive pull request events
    this.registerWebhook({
      event: 'pull_request',
      label: 'Pull request reminders',
      secret: 'your-webhook-secret',
      execute: this.handlePullRequestEvent.bind(this),
    });
  }

  async handlePullRequestEvent(
    request: any,
    http: IHttp,
    persistence: IPersistence,
    read: IRead,
  ) {
    const { action, pull_request } = request.content;
    if (action === 'opened') {
      // Fetch the livechat room associated with the pull request author
      const room = await read.getRoomReader().getLivechatRoom(pull_request.user.login);
      if (room) {
        // Send a reminder message to the livechat room
        const message = await this.createReminderMessage(pull_request);
        await this.sendMessage(room, message, http);
      }
    }
  }

  async createReminderMessage(pullRequest: any): Promise<IMessageBuilder> {
    const { title, html_url } = pullRequest;
    const message = this.getMessageBuilder();
    message.setRoom({ id: 'general' });
    message.setText(`Reminder: Please review pull request "${title}".`);
    message.addAttachment({
      title: 'Pull request details',
      title_link: html_url,
      text: `Repository: ${pullRequest.base.repo.full_name}\nAuthor: ${pullRequest.user.login}\nCreated at: ${pullRequest.created_at}`,
    });
    return message;
  }

  async sendMessage(room: ILivechatRoom, message: IMessageBuilder, http: IHttp) {
    const authToken = await this.getLivechatAuthToken(room, http);
    const response = await http.post('https://your-server.com/api/v1/chat.postMessage', {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': authToken,
        'X-User-Id': room.servedBy._id,
      },
      data: message.getMessage(),
    });
    if (!response || response.statusCode !== 200) {
      this.getLogger().error(`Failed to send reminder message: ${response}`);
    }
  }

  async getLivechatAuthToken(room: ILivechatRoom, http: IHttp): Promise<string> {
    const response = await http.post
