<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

        <title>Tests backbone</title>


        <script type="text/javascript">
            var plemi = window.plemi || (window.plemi = {});
            plemi.config = {};
            plemi.routers = {};
            plemi.models = {};
            plemi.collections = {};
            plemi.views = {};
            plemi.templates = {};
            plemi.utils = {};
            plemi.data = {
                title: 'lol',
                bands: [
                    { name: 'band name'},
                    { name: 'band name 2'}
                ]
            }
        </script>



        <!-- Loading Vendors -->
        <script type="text/javascript" src="vendors/jquery/1.7.2/jquery-1.7.2.js"></script>
        <script type="text/javascript" src="vendors/underscore/1.3.3/underscore.js"></script>
        <script type="text/javascript" src="vendors/backbone/0.9.2/backbone.js"></script>
        <script type="text/javascript" src="vendors/handlebars/1.0.0/handlebars-1.0.0.beta.6.js"></script>


        <script type="text/javascript" src="js/utils.js"></script>

        <!-- Loading models -->
        <script type="text/javascript" src="js/models/violation.js"></script>
        <script type="text/javascript" src="js/models/prebooking.js"></script>
        <script type="text/javascript" src="js/models/date.js"></script>
        <script type="text/javascript" src="js/models/lineup.js"></script>

        <!-- Loading collections -->
        <script type="text/javascript" src="js/collections/violation.js"></script>
        <script type="text/javascript" src="js/collections/lineup.js"></script>

        <!-- Loading views -->
        <script type="text/javascript" src="js/views/violation.js"></script>
        <script type="text/javascript" src="js/views/base-form.js"></script>
        <script type="text/javascript" src="js/views/step-date.js"></script>
        <script type="text/javascript" src="js/views/step-lineup.js"></script>

        <!-- Inline scripts -->
        <script type="text/javascript">
            $(document).ready( function() {

                var AppRouter = Backbone.Router.extend({
                    routes: {
                        "*actions": "homeRoute",
                    },
                    homeRoute: function(actions) {
                        try {
                            //  Date view
                            //  Define the html container tag view options
                            var stepDate = new plemi.views.StepDate({
                                // el: '#container',
                                // id: 'step-date',
                                model: new plemi.models.Date({
                                    // hours: 5,
                                    // minutes: 10,
                                    // date: '06/02/1985'
                                }),
                                violationCollection: new plemi.collections.Violation()
                                // attributes: {}
                            });

                            // stepDate.render().$el; //  Render when el property has been defined
                            $('#container').append(stepDate.render().$el); // Render when el property has not been defined

                        } catch(err) {
                            console.log('Error', err);
                            alert('An error occured : ' + err.message);
                        }
                    },
                });

                // Initiate the router
                var app_router = new AppRouter;

                // Start Backbone history a neccesary step for bookmarkable URL's
                Backbone.history.start({
                    pushState: true,
                    // root: "/app_dev.php/"
                });
            });
        </script>
    </head>
    <body>
        <div id="container"></div>
    </body>
</html>