export default class NotificationAction{
    constructor(title, channel, text, importance){
      this.actionName = "NotificationAction";
      this.title = title;
      this.channel= channel;
      this.text= text;
      this.importance= importance;
    }
}