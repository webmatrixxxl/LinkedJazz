var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
       
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        
    	dataRequest.getDataLocal(app.serviceLocalPath + "triples.txt")
        .then(function (artistsNodes) {
			dataNodes = artistsNodes
			console.log("bb");

        	//viewModel.set("artistsNodes", artistsNodes);
        });

    	dataRequest.getDataLocal(app.serviceLocalPath + "abstracts.txt")
        .then(function (artistsDescriptions) {
        	dataDescriptions = artistsDescriptions;
        	console.log("aa");
        	//viewModel.set("artistsDescriptions", artistsDescriptions);
        });
    }

    
    a.artists = {
    	init: init
    };

}(app));