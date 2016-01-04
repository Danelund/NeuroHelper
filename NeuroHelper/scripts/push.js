//app must be defined outside of function scope in previous script file
/* insert these lines of code in the main app.js
 document.addEventListener('deviceready', function () {

         if (window.plugin) {
              notification = window.plugin.notification;
              }
},false);*/
(function (window, global, $) {

    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady() {
        if (notification) {
            notification.local.setDefaults({
                autoCancel: true // removes the notification from notification centre when clicked
            });
        }

        app.notify = function (payload, callback) {

            if (notification) {
                notification.local.hasPermission(function (granted) {
                    console.log("har tilladelse til at skrive");
                });

                notification.local.add(payload, callback);
                console.log("notifikation tilfojet");
            }
        }


        app.setnextnotification = function () {
            var notifications = (localStorage.getItem('notifications') == 'true');
            var interval = parseInt(localStorage.getItem('notification_interval'));
            console.log(notifications);
            console.log(interval);

            //set notification, if notifications are enabled
            if (notifications && interval != null) {
                console.log("trying to set notifiation");
                //set hour to 10 for starting hour 
                var starthour = 8;
                var endhour = 22;

                //set a notificationDate
                var notificationDate = new Date();
                //genuinely add hours to notificationDate
                notificationDate.setTime(notificationDate.getTime() + (interval * 60 * 60 * 1000));
                notificationDate.setSeconds(0);
                //if notificationDate time get's later than the endhour, change the date to next day, otherwise proceed as planned
                if (notificationDate.getHours() >= endhour) {
                    console.log("planned day exceeds time, switch to next day");
                    notificationDate.setDate(notificationDate.getDate() + 1);
                    notificationDate.setHours(starthour);
                    notificationDate.setMinutes(0);
                }
                //if notification date is set to earlier than starthour (i.e., user registers too early or very late at night), then set date to starthour.
                if (notificationDate.getHours() < starthour) {
                    notificationDate.setHours(starthour);
                }
                console.log("sætter til time: " + notificationDate.getHours());

                this.notify({
                    id: 'regular-' + notificationDate.getHours(),
                    title: 'Stop op',
                    message: 'Det er tid til at mærke efter',
                    autoCancel: true,
                    date: notificationDate
                }, function () {
                    console.log('påmindelse sat til kl. ' + notificationDate.getHours() + ":" + notificationDate.getMinutes());
                });
            }
        }

        app.testnotify = function () {
            notification.local.hasPermission(function (granted) {
                // console.log('Permission has been granted: ' + granted);
            });

            this.notify({
                id: 5,
                title: 'I will bother you every minute',
                message: '.. until you cancel all notifications',
                repeat: 'hourly',
                autoCancel: false,
                date: new Date(new Date().getTime() + 10 * 1000)
            });
        }

        app.cancelnotifications = function () {
            if (notification) {
                notification.local.cancelAll(function () {
                    console.log("notifications cancelled");
                });
            }
        }

        app.setupnotificationinterval = function (interval) {
                //set hour to 10 for starting hour 
                var hour = 10;
                var endhour = 22;

                //set a notificationDate time.
                var notificationDate = new Date();
                //manipulate the dateobject to fit, 10:00:00
                notificationDate.setMinutes(0);
                notificationDate.setSeconds(0);
                //loop as long as the notification hour interval doesnt exceed 12 hours (from 10-22).
                while (hour < endhour) {
                    notificationDate.setHours(hour);

                    this.notify({
                        id: 'regular-' + hour,
                        title: 'Husk at registrere energi',
                        message: 'Det er tid til at du skal registrere din energi',
                        repeat: 'daily',
                        autoCancel: true,
                        date: notificationDate
                    }, function () {
                        console.log('påmindelse sat til kl. ' + notificationDate.getHours());
                    });

                    hour += interval;
                    console.log(notificationDate);
                    console.log(hour);
                }

            }
            /*
	if (window.plugin) {
		// set some global defaults for all local notifications
		window.plugin.notification.local.setDefaults({
														 autoCancel : true // removes the notification from notification centre when clicked
													 });

		// triggered when a notification was clicked outside the app (background)
		window.plugin.notification.local.onclick = function (id, state, json) {
			var message = 'ID: ' + id + (json == '' ? '' : '\nData: ' + json);
		};

		// triggered when a notification is executed while using the app (foreground)
		// on Android this may be triggered even when the app started by clicking a notification
		window.plugin.notification.local.ontrigger = function (id, state, json) {
			var message = 'ID: ' + id + (json == '' ? '' : '\nData: ' + json);
			navigator.notification.alert(message, null, 'Notification received while the app was in the foreground', 'Close');
		};
		
		window.plugin.notification.local.add({
												 id         : 'myID',
												 title      : 'I will bother you every minute',
												 message    : '.. until you cancel all notifications',
												 sound      : null,
												 repeat     : 'minutely',
												 autoCancel : false,
												 date       : new Date(new Date().getTime() + 10 * 1000)
											 });
        window.plugin.notification.local.cancelAll(function(){alert("cancelled");});
	} else {
		alert("no window.plugin fired");
	}*/
    }
})(window, jQuery);