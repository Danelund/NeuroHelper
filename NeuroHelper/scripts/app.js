var app;
var notification;

(function (global, $) {
    function showPopup(message) {
        /*var popup = jQuery("#ntf").kendoNotification({
            appendTo: jQuery(".km-content"),
            position: {
                top: 0
            },
            button: true
        }).getKendoNotification();
        popup.success(message);*/
    }

    //allow app feedback
    document.addEventListener('deviceready', function () {
        feedback.initialize('9e9996e0-f434-11e4-af76-2f36f3c79373');
    });

    //check for specific app settings
    function checkNeglect() {
        jQuery("body").toggleClass("neglect", (localStorage.getItem('chkNeglect') == 'true'));
    }


    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {
        var everlive = new Everlive({
            apiKey: "gdirbSCcn4SGeytt",
            scheme: "http"
        });

        var dataSource = new kendo.data.DataSource({
            type: "everlive",
            autoSync: true,
            serverFiltering: true,
            filter: {
                field: "DeviceID",
                operator: "eq",
                value: device.uuid
            },
            transport: {
                // binding to the Order type in Everlive
                typeName: "BreakPoint"
            },
            schema: {
                model: {
                    id: "Id",
                    fields: {
                        // default Everlive fields
                        CreatedBy: {
                            type: "string"
                        },
                        CreatedAt: {
                            type: "date"
                        },
                        ModifiedAt: {
                            type: "date"
                        },

                        // type fields
                        Energi: {
                            type: "number"
                        },
                        Pause: {
                            type: "bool"
                        },
                        Note: {
                            type: "string"
                        }
                    }
                }
            }
        });



        if (window.plugin) {
            notification = window.plugin.notification;
        }
        // store a reference to the application object that will be created
        // later on so that we can use it if need be

        console.log((localStorage.getItem('chkEnergy') == 'true'));
        console.log(localStorage.getItem('chkSleep'));
        console.log(localStorage.getItem('chkActivity'));
        console.log(localStorage.getItem('notifications'));
        console.log(localStorage.getItem('notification_interval'));
        // create an object to store the models for each view
        window.APP = kendo.observable({
            models: {
                home: {
                    title: 'Registrér',
                    energi: 3,
                    activity_red: 0,
                    activity_yellow: 0,
                    activity_green: 0,
                    note: '',
                    register: function (e) {
                        e.preventDefault();
                        var newDataPoint = {
                            'DeviceID': device.uuid,
                            'Energi': this.get("energi"),
                            'Note': this.get("note")
                        };
                        if (jQuery("SleepForm").is(":visible")) {
                            //add sleep parameters
                            newDataPoint.sleep = this.get('sleep');
                        }
                        if (jQuery("ActivityForm").is(":visible")) {
                            newDataPoint.activity_red = this.get("activity_red");
                            newDataPoint.activity_yellow = this.get("activity_yellow");
                            newDataPoint.activity_green = this.get("activity_green");

                        }
                        if (localStorage.getItem('chkActivity') == 'true') {

                        }
                        dataSource.add(newDataPoint);
                        showPopup("Tak for din indtastning!");
                        this.resetInput();

                        //set recent data to now for register
                        localStorage.setItem('lastregister', Date.now());
                        console.log("breakpoint registered");
                        console.log(device.uuid);
                        this.show();
                    },
                    resetInput: function () {
                        this.set("note", '');
                        this.set("energi", 5);
                        this.set("sleep", 5);
                        this.set("activity_green", false);
                        this.set("activity_yellow", false);
                        this.set("activity_red", false);
                    },
                    show: function () {
                        checkNeglect();
                        var lastregister = new Date(parseInt(localStorage.getItem('lastregister')));
                        var current = new Date();
                        jQuery("#lastRegister").text(' (kl. ' + lastregister.getHours() + ':' + lastregister.getMinutes() + ')');
                        console.log(dataSource);
                        console.log(lastregister);
                        
                        //if last register was yesterday, and it's over 6 o'clock, show sleep measurement
                        if (lastregister.getDay() != current.getDay() && current.getHours() > 6) {
                            jQuery("#ActivityForm").hide();
                            jQuery("#SleepForm").show();
                        } else {
                            jQuery("#SleepForm").hide();
                            jQuery("#ActivityForm").show()
                        }
                    }
                },
                settings: {
                    chkNeglect: (localStorage.getItem('chkNeglect') == 'true'),
                    notifications: (localStorage.getItem('notifications') == 'true'),
                    notification_interval: localStorage.getItem('notification_interval'),
                    intervals: [{
                            'IntName': 'Vælg interval',
                            'value': undefined
                                    },{
                            'IntName': '1. time',
                            'value': '1'
                                    },
                        {
                            'IntName': '2. timer',
                            'value': '2'
                                    },
                        {
                            'IntName': '3. timer',
                            'value': '3'
                                    },
                        {
                            'IntName': '4. timer',
                            'value': '4'
                                    }],
                    saveSettings: function (e) {
                        console.log("writing settings");
                        localStorage.setItem('chkNeglect', this.get('chkNeglect'));
                        localStorage.setItem('notifications', this.get('notifications'));
                        localStorage.setItem('notification_interval', this.get('notification_interval'));

                        if (this.get('notifications')) {
                            //cancel existing notifications if there are any
                            app.cancelnotifications();
                            app.setupnotificationinterval(parseInt(this.get('notification_interval')));
                            //showPopup("påmindelser slået til");
                            console.log("notification set");
                        } else {
                            app.cancelnotifications();
                            showPopup("påmindelser slået fra");
                        }
                        checkNeglect();
                    },

                    /*,
                                        notify : function(e)
                                        {
                                            e.preventDefault();
                                            app.testnotify();
                                            console.log("testnotified");
                                        },
                                        cancelnotify : function(e)
                                        {
                                            e.preventDefault();
                                            app.cancelnotifications();
                                        }*/

                },
                chart: {
                    title: 'Chart',
                    selectedPeriod: 'days',
                    periods: [{
                            'PName': 'Måned',
                            'value': 'weeks'
                                },
                        {
                            'PName': 'Uge',
                            'value': 'days'
                                },
                        {
                            'PName': 'Dag',
                            'value': 'hours'
                                }],
                    axisChange: function () {
                        //set date from period
                        var filterDate = new Date();

                        switch (this.get('selectedPeriod')) {
                            case 'weeks':
                                filterDate.setMonth(filterDate.getMonth() - 1);
                                break;
                            case 'days':
                                filterDate.setDate(filterDate.getDate() - 7);
                                break;
                            case 'hours':
                                filterDate.setDate(filterDate.getDate() - 1);
                                break;
                        }
                        console.log(dataSource);
                        var chart = jQuery("#chart").data("kendoChart");
                        chart.setOptions({
                            categoryAxis: {
                                baseUnit: this.get('selectedPeriod')
                            }
                        });

                        dataSource.filter({
                            "field": "CreatedAt",
                            "operator": "gte",
                            "value": filterDate
                        });
                        console.log(this.get('selectedCategory'));
                        console.log(dataSource);
                        console.log(filterDate);
                    },
                    ds: dataSource,
                    onSeriesHover: function (e) {
                        jQuery("#chartnote").html(e.dataItem.CreatedAt.getHours() + ":" + e.dataItem.CreatedAt.getMinutes() + " - " + e.dataItem.CreatedAt.toLocaleDateString() + "<br />" + e.dataItem.Note);
                        console.log(e.dataItem);
                    }
                },
            }
        });
        window.APP.models.settings.bind("change", window.APP.models.settings.saveSettings);
        // hide the splash screen as soon as the app is ready. otherwise
        // Cordova will wait 5 very long seconds to do it for you.
        navigator.splashscreen.hide();

        app = new kendo.mobile.Application(document.body, {

            // you can change the default transition (slide, zoom or fade)
            transition: 'slide',

            // comment out the following line to get a UI which matches the look
            // and feel of the operating system
            skin: 'silver',

            // the application needs to know which view to load first
            initial: 'views/home.html'
        });


    }, false);

}());

(function (g) {

    var productId = "fa479a5871804e8e82daea887c459323"; // App unique product key

    // Make analytics available via the window.analytics variable
    // Start analytics by calling window.analytics.Start()
    var analytics = g.analytics = g.analytics || {};
    analytics.Start = function () {
        // Handy shortcuts to the analytics api
        var factory = window.plugins.EqatecAnalytics.Factory;
        var monitor = window.plugins.EqatecAnalytics.Monitor;
        // Create the monitor instance using the unique product key for Analytics
        var settings = factory.CreateSettings(productId);
        settings.LoggingInterface = factory.CreateTraceLogger();
        factory.CreateMonitorWithSettings(settings,
            function () {
                console.log("Monitor created");
                // Start the monitor inside the success-callback
                monitor.Start(function () {
                    console.log("Monitor started");
                });
            },
            function (msg) {
                console.log("Error creating monitor: " + msg);
            }
        );
    };
    analytics.Stop = function () {
        var monitor = window.plugins.EqatecAnalytics.Monitor;
        monitor.Stop();
    };
    analytics.Monitor = function () {
        return window.plugins.EqatecAnalytics.Monitor;
    };
})(window);