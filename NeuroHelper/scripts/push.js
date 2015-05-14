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
    if(notification)
    {
    notification.local.setDefaults({
                                 autoCancel : true // removes the notification from notification centre when clicked
                             });
    }
    
    app.notify = function(payload, callback)
    {
        if(notification)
        {
            notification.local.add(payload, callback);
       }
    }
    
    
    app.testnotify = function()
    {
        notification.local.hasPermission(function (granted) {
        // console.log('Permission has been granted: ' + granted);
        });
            
        this.notify({
                     id : 5,
                  title : 'I will bother you every minute',
                message : '.. until you cancel all notifications',
                 repeat : 'hourly',
             autoCancel : false,
                   date : new Date(new Date().getTime() + 10*1000)
            });
    }
    
    app.cancelnotifications = function()
    {
        if(notification)
        {
        notification.local.cancelAll(function(){console.log("notifications cancelled");});
        }
    }
    
    app.setupnotificationinterval = function(interval)
    {
         //set hour to 10 for starting hour 
        var hour = 10;
        var endhour = 22;
        
        //set a notificationDate time.
        var notificationDate = new Date();
        //manipulate the dateobject to fit, 10:00:00
        notificationDate.setMinutes(0); notificationDate.setSeconds(0);
        //loop as long as the notification hour interval doesnt exceed 12 hours (from 10-22).
        while(hour < endhour)
        {
           notificationDate.setHours(hour);
             
           this.notify({
                 id : 'regular-'+hour,
              title : 'Husk at registrere energi',
            message : 'Det er tid til at du skal registrere din energi',
             repeat : 'daily',
         autoCancel : true,
               date : notificationDate.getDate()
        },function(){alert('alarm sat til kl. ' + notificationDate.getHours());});
            
        hour = hour + interval;
        console.log(hour);
        console.log(notificationDate)
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