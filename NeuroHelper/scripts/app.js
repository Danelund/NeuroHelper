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
    /*document.addEventListener('deviceready', function () {
        feedback.initialize('9e9996e0-f434-11e4-af76-2f36f3c79373');
    });*/

    //check for specific app settings
    function checkNeglect() {
        jQuery("body").toggleClass("neglect", (localStorage.getItem('chkNeglect') == 'true'));
    }

    //check for specific app settings
    function checkActivity() {
        return localStorage.getItem('chkActivity') == 'true';
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
            serverFiltering: false,
            filter: {
                field: "DeviceID",
                operator: "eq",
                value: device.uuid
            },
            transport: {
                // binding to the Order type in Everlive
                typeName: "BreakPoint"
            },
            /*group: {
              field: "DayTime"  
            },*/
            sort: {
                field: "CreatedAt",
                dir: "desc"
            },
            schema: {
                model: {
                    id: everlive.idField,
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
                        Note: {
                            type: "string"
                        },
                        activity_green: {
                            type: "bool"
                        },
                        activity_yellow: {
                            type: "bool"
                        },
                        activity_red: {
                            type: "bool"
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
        console.log(localStorage.getItem('chkActivity') == 'true');
        console.log(localStorage.getItem('notifications'));
        console.log(localStorage.getItem('notification_interval'));
        // create an object to store the models for each view
        window.APP = kendo.observable({
            models: {
                home: {
                    title: 'Registrér',
                    energi: 5,
                    activity_red: 0,
                    activity_yellow: 0,
                    activity_green: 0,
                    note: '',
                    exitapp : function (e) {
                        navigator.app.exitApp();
                    },
                    register: function (e) {
                        e.preventDefault();
                        var newDataPoint = {
                            'DeviceID': device.uuid,
                            'Energi': this.get("energi"),
                            'Note': this.get("note")
                        };
                        if (jQuery("#SleepForm").is(":visible")) {
                            console.log("Sleep is logged");
                            //add sleep parameters
                            newDataPoint.sleep = this.get('sleep');
                        }

                        if (jQuery("#ActivityForm").is(":visible")) {
                            console.log("Activity is logged");
                            newDataPoint.activity_red = this.get("activity_red");
                            newDataPoint.activity_yellow = this.get("activity_yellow");
                            newDataPoint.activity_green = this.get("activity_green");
                        }
                        console.log(newDataPoint);
                        dataSource.add(newDataPoint);
						jQuery("#ThankYou").data("kendoMobileModalView").open();

                        //set recent data to now for register
                        localStorage.setItem('lastregister', Date.now());
                        console.log("breakpoint registered");
                        console.log(device.uuid);

                        //and set next notification
                        app.setnextnotification();
                        this.show();
                        this.note = '';
                    },
                    show: function () {
                        
 /*                       // set kendoslider
                        var slider = jQuery("#slider").kendoSlider({
                        min: 0,
                        max: 10,
                        smallStep: 1
                    }).data("kendoSlider");*/

                        
                        checkNeglect();
                        var lastregister = new Date(parseInt(localStorage.getItem('lastregister')));
                        var nextregister = new Date((lastregister.getTime() + ((parseInt(localStorage.getItem('notification_interval')) * 0.5) * 60 * 60 * 1000)));
                        var current = new Date();

                        jQuery(".lastRegister").text(' (kl. ' + lastregister.getHours() + ':' + lastregister.getMinutes() + ')');
                        jQuery(".nextRegister").text(' (kl. ' + nextregister.getHours() + ':' + nextregister.getMinutes() + ')');
                        
                        //hide by default
						jQuery("#SleepForm").hide();
                        jQuery("#ActivityForm").hide();

                        console.log("activity checks for : ", checkActivity());
                        //if last register was yesterday, and it's over 6 o'clock, show sleep measurement
                        if (lastregister.getDay() != current.getDay() && current.getHours() > 6) {
                            jQuery("#SleepForm").show();
                        } else if (checkActivity()) {
                            jQuery("#ActivityForm").show();
                        }
                        /*//if notifications are enabled, and we are not currently past half the time until next notification, show a thank you screen
                        if ((localStorage.getItem('notifications') == 'true') && nextregister.getTime() > current.getTime()) {
                                console.log('notifications are screen should be set to thanks for notification');
                        		jQuery("#ThankYou").show();
                        		jQuery("#registerForm").hide();
                        }*/
                    }

                },
                settings: {
                    chkNeglect: (localStorage.getItem('chkNeglect') == 'true'),
                    chkActivity: (localStorage.getItem('chkActivity') == 'true'),
                    notifications: (localStorage.getItem('notifications') == 'true'),
                    notification_interval: (localStorage.getItem('notification_interval') ? localStorage.getItem('notification_interval') : 2),
                    intervals: [{
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
                        localStorage.setItem('chkActivity', this.get('chkActivity'));
                        localStorage.setItem('notifications', this.get('notifications'));
                        localStorage.setItem('notification_interval', this.get('notification_interval'));

                        if (this.get('notifications')) {
                            //cancel existing notifications if there are any
                            app.cancelnotifications();
                            app.setnextnotification();
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
                    selectedPeriod: 'all',
                    periods: [
                                {
                            'PName': 'Alt',
                            'value': 'all'
                                },
                        {
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
                            case 'all':
                                filterDate.setDate(-365);
                                this.selectedPeriod = 'days'
                                break;
                        }
                        console.log(this.get('selectedCategory'));
                        
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
                        
                        //console.log(dataSource.data);
                        console.log(filterDate);
                    },
                    ds: dataSource,
                    onSeriesHover: function (e) {
                        jQuery("#chartnote").html(e.dataItem.CreatedAt.getHours() + ":" + e.dataItem.CreatedAt.getMinutes() + " - " + e.dataItem.CreatedAt.toLocaleDateString() + "<br />" + e.dataItem.Note);
                        console.log(e.dataItem);
                    },
                    show: function(){
                        jQuery("#tabstrip").kendoTabStrip({
                            animation:  {
                                open: {
                                    effects: "fadeIn"
                                }
                            }
                        });

            
            var dataSource2 = new kendo.data.DataSource({
            type: "everlive",
            serverGrouping: false,
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
                type: "json",
                model: {
                    id: everlive.idField,
                    fields: {
                        // default Everlive fields
                        CreatedBy: { type: "string"},
                        CreatedAt: {type: "date"},
                        ModifiedAt: {type: "date"},

                        // type fields
                        Energi: {type: "number"},
                        Note: {type: "string"},
                        
                        /*activity_green: {
                            type: "bool"
                        },
                        activity_yellow: {
                            type: "bool"
                        },
                        activity_red: {
                            type: "bool"
                        }*/
                    }
                }
            },
                
        });
         
		jQuery("#listView").kendoListView({
                dataSource: dataSource2,
                template: kendo.template(jQuery("#template").html())
            });
                           var schedulerDataSource = new kendo.data.SchedulerDataSource({
            type: "everlive",
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
                        Note: {
                            type: "string"
                        },
                        activity_green: {
                            type: "bool"
                        },
                        activity_yellow: {
                            type: "bool"
                        },
                        activity_red: {
                            type: "bool"
                        },
                        // type fields, projected to the scheduler format
                        title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", from: "CreatedAt" },
                        end: { type: "date", from: "CreatedAt" },
                        description: { from: "Energi" },
        }}}});
        /*jQuery("#scheduler").kendoScheduler({
            date: Date.now(),
            //startTime: ,
            height: 500,
            views: [
                "day",
                { type: "workWeek"},
                "week",
                "month",
                 { type: "agenda", selected: true },
                "timeline"
            ],
            dataSource: schedulerDataSource,
            timezone: "Etc/UTC"
        });
                        
                        jQuery("#grid").kendoGrid({
                        dataSource: dataSource2,
                        height: 300,
                        sortable: false,
                        pageable: false,
                        columns: [
                            { field:'CreatedAt', title: 'Indtastet',  format: "{0:MM/dd/yyyy}" },
                            { field: "Note",title: "Note"}, 
                            { field: 'Energi', title: 'Energi'},
                            { field: 'activity_yellow', title: 'Gul Aktivitet', format:'{0:c}'},{ field: 'activity_red', title: 'Rød Aktivitet', format:'{0:c}'}
                        ]
                    });*/
                    },
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