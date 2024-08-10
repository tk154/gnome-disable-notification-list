import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import { MessageTray, NotificationDestroyedReason } from 'resource:///org/gnome/shell/ui/messageTray.js';


let _hideNotificationCompleted = null;

function hideNotificationCompleted() {
    if (!this._notificationRemoved)
        this._notification.destroy(NotificationDestroyedReason.EXPIRED);

    _hideNotificationCompleted.call(this);
}


export default class DisableNotificationListExtension extends Extension {
    enable() {
        _hideNotificationCompleted = MessageTray.prototype._hideNotificationCompleted;
        MessageTray.prototype._hideNotificationCompleted = hideNotificationCompleted;
    }

    disable() {
        MessageTray.prototype._hideNotificationCompleted = _hideNotificationCompleted;
        _hideNotificationCompleted = null;
    }
}
