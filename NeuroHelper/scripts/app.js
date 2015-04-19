var app;
var notification;

(function (global, $) {
    
    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {
    
   var dataSource = new kendo.data.DataSource({
                        type: "everlive",
                        autoSync: true,
                        filter: { field: "DeviceID", operator: "eq", value: device.uuid },
                        transport: {
                            // binding to the Order type in Everlive
                            typeName: "BreakPoint"
                        },
                        schema: {
                            model: {
                                id: "Id",
                                fields: {
                                    // default Everlive fields
                                    CreatedBy:  { type: "string" },
                                    CreatedAt:  { type: "date" },
                                    ModifiedAt: { type: "date" },

                                    // type fields
                                    Energi:    { type: "number" },
                                    Pause:  { type: "bool" },
                                    Note: {type: "string"}
                                }
                            }
                        }});
        
        var everlive = new Everlive({
                    apiKey: "gdirbSCcn4SGeytt",
                    scheme: "http"
                });
        
         if (window.plugin) {
              notification = window.plugin.notification;
         }
            // store a reference to the application object that will be created
        // later on so that we can use it if need be
        
    
         // create an object to store the models for each view
        window.APP = kendo.observable({
            models: {
                home: {
                    title: 'Registrér',
                    energi: 3,
                    pause: false,
                    note: '',
                    notifications: false,
                    notification_interval: 1,
                     intervals: [{'IntName': '1. time', 'value':'1'},
                        {'IntName': '2. timer', 'value':'2'},
                                   {'IntName': '3. timer', 'value':'3'},
                                   {'IntName': '4. timer', 'value':'4'}],
                    register : function(e)
                    {
                        e.preventDefault();
                        dataSource.add({ 'Pause' : this.get("pause"), 'Energi' : this.get("energi"), 'DeviceID' : device.uuid, 'Note' : this.get("note")});
                        console.log("breakpoint registered");
                        console.log(device.uuid);
                    },
                    setNotifications: function(e)
                    {
                        if(this.get('notifications'))
                        {
                            //cancel existing notifications if there are any
                            app.cancelnotifications();
                            app.setupnotificationinterval(this.get('notification_interval'));
                            console.log("notification set");
                        }
                        else
                        {
                             app.cancelnotifications();
                            console.log("notification cancelled");
                        }
                    }/*,
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
                    selectedCategory: 'days',
                    intervals: [{'CatName': 'måned', 'value':'months'},
                        {'CatName': 'uge', 'value':'weeks'},
                                   {'CatName': 'dag', 'value':'days'},
                                   {'CatName': 'timer', 'value':'hours'}],
                    selectedPeriod: '',
                    periods: [{'PName': 'Altid', 'value':''},
                        {'PName': 'Måneder', 'value':'week'},
                                   {'PName': 'Uge', 'value':'day'},
                                   {'PName': 'Dag', 'value':'hour'}],
                    axisChange : function(){
                        //set date from period
                        var filterDate = new Date();
                        
                        switch(this.get('selectedPeriod'))
                            {
                               case 'week':
                                   filterDate.setMonth(filterDate.getMonth()-1);
                               break;
                               case 'day':
                                   filterDate.setDate(filterDate.getDate()-7);
                               break;
                               case 'hour':
                                   filterDate.setDate(filterDate.getDate()-1);
                               break;
                            }
                        console.log(dataSource);
                    /*var chart = jQuery("#chart").data("kendoChart");
                        chart.setOptions({ categoryAxis: { baseUnit: this.get('selectedCategory') }});*/
                        
                        /*dataSource.filter({
                            "field": "CreatedAt",
                            "operator": "eq",
                            "value": kendo.toString(filterDate, "g")
                        });*/
                        /*dataSource.filter({
                            "field": "Note",
                            "operator": "contains",
                            "value": 'e'
                        });*/
                        console.log(this.get('selectedCategory'));
                        console.log(dataSource);
                        console.log(filterDate);                    
                    },
                    ds : dataSource,
                    onSeriesHover : function(e){
                        $("#chartnote").html(e.note)
                        console.log(e);
                    }
                },
            }
        });
        
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