var app = app || {};

(function() {
    
    document.addEventListener("deviceready", function() {
    	app.servicesBaseUrl = "http://linkedjazz.org/api/";
    	app.serviceLocalPath = "data/";
        
        var kendoApp = new kendo.mobile.Application(document.body);
        app.kendo = kendoApp;
    });    
}());