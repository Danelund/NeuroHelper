(function () {

        // store a reference to the application object that will be created
        // later on so that we can use it if need be
        var app;
        var dataSource = new kendo.data.DataSource({
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
                                    CreatedBy:  { type: "string" },
                                    CreatedAt:  { type: "date" },
                                    ModifiedAt: { type: "date" },

                                    // type fields
                                    Energi:    { type: "number" },
                                    Pause:  { type: "bool" }
                                }
                            }
                        }});
        var everlive = new Everlive({
                    apiKey: "gdirbSCcn4SGeytt",
                    scheme: "http"
                });
    

        // create an object to store the models for each view
        window.APP = {
            models: {
                home: {
                    title: 'Registrér',
                    energi: 3,
                    pause: false,
                    register : function(e)
                    {
                        e.preventDefault();
                        dataSource.add({ 'Pause' : this.get("pause"), 'Energi' : this.get("energi")});
                        dataSource.sync();
                    }
                },
                chart: {
                    title: 'Chart',
                    selectedCategory: 'dag',
                    intervals: [{'CatName': 'måned', 'value':'months'},
                        {'CatName': 'uge', 'value':'weeks'},
                                   {'CatName': 'dag', 'value':'days'},
                                   {'CatName': 'timer', 'value':'hours'}],
                    axisChange : function(){
                        var chart = $("#chart").data("kendoChart");
                        chart.setOptions({ categoryAxis: { baseUnit: this.get('selectedCategory') }});
                        //console.log(this.get('selectedCategory'));
                    },
                    ds : dataSource
                },
            }
        }

    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {

        // hide the splash screen as soon as the app is ready. otherwise
        // Cordova will wait 5 very long seconds to do it for you.
        navigator.splashscreen.hide();

        app = new kendo.mobile.Application(document.body, {

            // you can change the default transition (slide, zoom or fade)
            transition: 'slide',

            // comment out the following line to get a UI which matches the look
            // and feel of the operating system
            skin: 'flat',

            // the application needs to know which view to load first
            initial: 'views/home.html'
        });

        
    }, false);


}());