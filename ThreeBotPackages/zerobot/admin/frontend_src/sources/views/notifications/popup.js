import { JetView } from "webix-jet";
import { notifications } from "../../services/notifications";

const THREESDK_INSTALLATION_URL = 'https://sdk.threefold.io/#/3sdk_install'

// TODO: Get updates for new notification
// TODO: Use notification model
var notificationsList = []

export default class NotificationPopup extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view: "popup",
			body: {
				view: "list",
				localId: "list",
				borderless: true,
				css: "notifications",
				width: 350,
				template: obj => {
					return "<span class='m_title'>" + _(obj.title) + "</span>" +
						`<span class='message'>${_(obj.message)}</span>`;
				},
				type: {
					height: "auto"
				}
			},
			on: {
				onHide: () => {
					this.app.callEvent("read:notifications");
				}
			}
		};
	}
	init() {
		const self = this;
		self.list = self.$$("list");
		self.list.parse(self.getNotifications())

		webix.extend(self.list, webix.OverlayBox);

		self.on(self.app, "new:notification", (data) => {
			self.list.hideOverlay();
			self.list.clearAll();
			self.list.parse(notificationsList);
			self.list.refresh();
		});

		notifications.checkNewRelease().then((data) => {
			if (self.app && !data.json()['up_to_date']) {
				self.newReleaseNotification(data.json())
				// TODO: add check for notification status [ read, notRead ]
				self.app.callEvent("update:badge", [1]);
			}
		});
	}

	getNotifications() {
		if (notificationsList.length == 0)
			return {
				'title': "No new notifications",
				'message': ''
			}
		else
			return notificationsList

	}

	// New notification type inform new update
	newReleaseNotification(data) {
		let notification = {
			'title': "New release available",
			'message': `Version ${data.last_release} is now available.
						<a href='${data.last_release_url}' target="_blank">Get it</a><br>
						You can view installation guide <a href='${THREESDK_INSTALLATION_URL}' target="_blank">here</a>`
		}
		notificationsList.push(notification)
		this.app.callEvent("new:notification", [notification]);
	}

	showWindow(pos) {
		this.getRoot().show(pos);
	}
}
