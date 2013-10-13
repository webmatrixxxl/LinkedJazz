window.dataRequest = (function () {
	function getJSON(url) {
		var promise = new RSVP.Promise(function (resolve, reject) {
			$.ajax({
				url: url,
				type: "GET",
				dataType: "json",
				contentType: "application/json",
				timeout: 5000,
				success: function (data) {
					resolve(data);
				},
				error: function (err) {
					reject(err);
				}
			});
		});

		return promise;
	}

	return {
		getJSON: getJSON,
		getDataLocal: getDataLocal
	};

	function getDataLocal(path) {

		var promise = new RSVP.Promise(function (resolve, reject) {
			$.ajax({
				url: path,
				context: document.body,
				timeout: 5000,
				success: function (data) {
					resolve(data);
				},
				error: function (err) {
					reject(err);
				}
			});
		});
		return promise;
	}
}());

//$.get('data/abstracts.txt', function (data) {

//});

//$.get('data/triples.txt', function (data) {

//})

//$.ajax({
//	url: "test.html",
//	context: document.body,
//	success: function () {
//		$(this).addClass("done");
//	}
//})