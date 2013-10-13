/// <reference path="d3.js" />
if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) {
	alert('We\'re Sorry, this visualization uses the SVG standard, most modern browsers support SVG. If you would like to see this visualization please view this page in another browser such as Google Chrome, Firefox, Safari, or Internet Explorer 9+');
}

//var visMode = 'dynamic';			//the type of network to render, each has it own settings

//var tripleStore = null;			//holds the triple data bank created by te rdfquery plugin
//var tripleObject = null;		//holds the javascript seralized object of the triple store
//var descStore = null;			//holds the triple data bank created by te rdfquery plugin for the description
//var descObject = null;			//holds the javascript seralized object of the triple store for the description
//var largestNodes = [];			//holds a list of the N largest nodes/people (most connections) in order to place/lock them properly on render
//var hidePopupTimer = null;		//holds the timer to close the popup
//var showPopupTimer = null;
//var currentNode = null;			//the current node we are highligting
//var usePerson = null;			//the person in person mode
//var usePersonIndex = 0;			//the index pos of the usePerson in the nodes array, so we dont have to loop through the whole thing everytime
//var edgesAvg = 0;
//var edgesInterval = 0			//the steps between the avg and largest # edges
//var trans = [0, 0];
//var scale = 1;
//var dynamicPeople = [];			//holds who is added in the dynamic mode

//var zoom = null;				//the d3.js zoom object
//var baseNodes = [];				//stores the base (all) of the nodes and
//var baseLinks = [];				// links
//var force = null;				//the d3 force object
//var vis = null					//the visualization
//var visWidth = 0;			//width and height of the network canvas, in px
//var visHeight = 0;

//var connectionCounter = {};		//holds each  id as a property name w/ the value = # of connections they have

//var connectionIndex = {};		//a object with properties as id names, with values an array of strings of ids that person has connections to.
//var largestConnection = 0;		//


//var simlarityIndex = {}			//properties are id names, with the value being an array of objects with other ids and their # of matching connections
//var largestSimilarity = 0;		//holds the max number of similar connections any two nodes share in the network

//var strokeWidth = 0.1;			//the defult width to make the stroke

////the settings that vary for each diff type of network 
//var networkGravity = 1;
//var netwokrLinkLength = 35;
//var networkLargeNodeLimit = 20;	//the number of top nodes to fix/lock to a patterend spot on the network
//var netwokrCharge = -800;
//var networkStopTick = true;		//when the alpha value drops to display the graph, do we stop the nodes from animating?
//var networkNodeDrag = true;	//can you drag the nodes about?

//var networkMinEdges = 4;		//the min number of edges to have a node be rendered

//var cssSafe = new RegExp(/%|\(|\)|\.|\,/g);	//the regex to remove non css viable chars

//var youTubeObject = '<object style="height=130px; width=200px; position: absolute; bottom: 0px;"> <param name="movie" value="https://www.youtube.com/v/<id>?version=3&feature=player_embedded&controls=1&enablejsapi=1&modestbranding=1&rel=0&showinfo=1&autoplay=1"><param name="allowFullScreen" value="true"><param name="wmode" value="transparent"><param name="allowScriptAccess" value="always"><embed src="https://www.youtube.com/v/<id>?version=3&feature=player_embedded&controls=1&enablejsapi=1&modestbranding=1&rel=0&showinfo=1&autoplay=1" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="200" height="130" wmode="transparent"></object>';
//var zoomWidgetObj = null;			//the zoom widget draghandeler object
//var zoomWidgetObjDoZoom = true;

//var oldzoom = 0;
//var fill = d3.scale.category10();
//var lineColor = d3.scale.category20c();

jQuery(document).ready(function ($) {

	if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) {

		jQuery("#network").html(
			'Sorry, this visualization uses the <a href="http://en.wikipedia.org/wiki/Scalable_Vector_Graphics">SVG standard</a>, most modern browsers support SVG.<br>If you would like to see this visualization please view this page in another browser such as <a href="https://www.google.com/chrome">Chrome</a>, <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, <a href="http://www.apple.com/safari/download/">Safari</a>, or <a href="http://windows.microsoft.com/en-US/internet-explorer/downloads/ie">Internet Explorer 9+</a>'
		);

		return false;
	}

	/* Binds */
	$(window).resize(function () { windowResize(); });
	jQuery("#popUp").mouseenter(function () { clearTimeout(hidePopupTimer) });
	jQuery("#popUp").mouseleave(function () { hidePopup() });

	jQuery("#logo").click(function () { changeVisMode("clique"); });

	jQuery("#menu_fixed").mouseenter(function () { $(this).css("opacity", 1); }).mouseleave(function () { $(this).css("opacity", 0.15); }).click(function () { changeVisMode("wave"); });
	jQuery("#menu_similar").mouseenter(function () { $(this).css("opacity", 1); }).mouseleave(function () { $(this).css("opacity", 0.15); }).click(function () { changeVisMode("clique"); });
	jQuery("#menu_free").mouseenter(function () { $(this).css("opacity", 1); }).mouseleave(function () { $(this).css("opacity", 0.15); }).click(function () { changeVisMode("free"); });
	jQuery("#menu_dynamic").mouseenter(function () { $(this).css("opacity", 1); }).mouseleave(function () { $(this).css("opacity", 0.15); }).click(function () { changeVisMode("dynamic"); });

	$("#dynamicSearchInput").keyup(function () { dynamicFilterList(); });
	$("#dynamicSearchClear").click(function () { $("#dynamicSearchInput").val(''); dynamicFilterList(); });
	$("#dynamicClear").click(function () { dynamicPeople = []; filter(); });

	$("#network").fadeOut();

	windowResize();

	showSpinner("Loading<br>Triples");

	initalizeNetwork();

	//give the UI some breathing room, a chance to render
	setTimeout(function () {

		//grab the descripons of the artists
		$.get('data/abstracts.txt', function (data) {
			buildDescriptionStore(data);
		});


		$.get('data/triples.txt', function (data) {

			//buildTripleStore(data);
			dataAnalysis();

			//buildBase();
			buildDynamicList();
			showSpinner("Rendering<br>Network");
			filter();
		})
		.error(function () { alert("There was an error in accessing the data file. Please try again."); });

	}, 200, []);

	//add the zoom widget
	jQuery("#network").append(
		jQuery("<div>")
			.attr("id", "zoomWidget")
			.addClass("dragdealer")
			.append(
				jQuery("<div>")
					.addClass("handle")
					.append(
						jQuery("<div>")
							.text("-")
					)
			)
			.append(
				jQuery("<div>")
					.addClass("zoomWidgetRail")
			)
			.append(
				jQuery("<div>")
					.addClass("zoomWidgetEndcaps")
					.attr("id", "woomWidgetZoomOut")
					.css("top", "-17px")
					.append(
						jQuery("<div>")
							.text("-")
					)
			)
			.append(
				jQuery("<div>")
					.addClass("zoomWidgetEndcaps")
					.attr("id", "woomWidgetZoomIn")
					.css("top", "145px")
					.append(
						jQuery("<div>")
							.text("+")
					)
			)
	);

	jQuery("#zoomWidget").mouseenter(function () { console.log('whhyyy'); zoomWidgetObjDoZoom = true; });

	zoomWidgetObj = new Dragdealer('zoomWidget',
	{
		//horizontal: false,
		//vertical: true,
		//y: 0.255555555,

		//animationCallback: function (x, y) {
		//	//if the value is the same as the intial value exit, to prevent a zoom even being called onload
		//	if (y == 0.255555555) {
		//		return false;
		//	}
		//	//prevent too muuch zooooom
		//	if (y < 0.05) {
		//		return false;
		//	}

		//	//are we  zooming based on a call from interaction with the slider, or is this callback being triggerd by the mouse event updating the slider position.
		//	if (zoomWidgetObjDoZoom == true) {

		//		y = y * 4;

		//		//this is how it works now until i figure out how to handle this better.
		//		//translate to the middle of the vis and apply the zoom level
		//		vis.attr("transform", "translate(" + [(visWidth / 2) - (visWidth * y / 2), (visHeight / 2) - (visHeight * y / 2)] + ")" + " scale(" + y + ")");
		//		//store the new data into the zoom object so it is ready for mouse events
		//		zoom.translate([(visWidth / 2) - (visWidth * y / 2), (visHeight / 2) - (visHeight * y / 2)]).scale(y);
		//	}
		//}
	});
})



function initalizeNetwork() {

	$("#dynamicListHolder, #dynamicSearchHolder, #dynamicClear").css("display", "none")
	$("#video").css("left", "0px");

	if (visMode == "wave") {
		networkGravity = 0;
		netwokrLinkLength = 35;
		networkLargeNodeLimit = 20;
		netwokrCharge = -1200;
		networkMinEdges = 4;
		networkStopTick = true;
		networkNodeDrag = true;

	}

	if (visMode == "free") {
		networkGravity = 0.1;
		netwokrLinkLength = 25;
		networkLargeNodeLimit = 20;
		netwokrCharge = -45;
		networkMinEdges = 2;
		networkStopTick = true;
		networkNodeDrag = true;
		//scale=0.6;
		//trans=[visWidth/6,visHeight/6];
	}

	if (visMode == "person") {
		networkGravity = 0.1;
		netwokrLinkLength = 55;
		networkLargeNodeLimit = 20;
		netwokrCharge = -1600;
		networkStopTick = false;
		networkNodeDrag = true;
	}

	if (visMode == "clique") {
		networkGravity = 0.1;
		netwokrLinkLength = 125;
		networkLargeNodeLimit = 20;
		netwokrCharge = -1500;
		networkMinEdges = 4;
		networkStopTick = true;
		networkNodeDrag = true;
	}

	if (visMode == "dynamic") {
		networkGravity =  0.05;
		netwokrLinkLength = 500;
		networkLargeNodeLimit = 20;
		netwokrCharge = -400;
		networkStopTick = true;
		networkNodeDrag = true;

		//if we have not yet built the dynamic list
		if ($("#dynamicListHolder").length < 2) {
			//get dynamic list ready
			buildDynamicList();
		}

		$("#video").css("left", "225px");
		$("#dynamicListHolder, #dynamicSearchHolder").css("display", "block")

		//show a hint 
		if (dynamicPeople.length == 0) {

			$("#dynamicHelp").fadeIn(10, function () {

				$("#dynamicHelp").fadeOut(5000);

			})

		} else {

			$("#dynamicClear").fadeIn(5000);
		}
	}

	//if it has already been defined
	if (force == null) {
		force = d3.layout.force()
		.size([$("#network").width() - 5, $("#network").height() - 5]);
	}

	force.gravity(networkGravity);
	force.linkStrength(function (d) { return linkStrength(d); });
	force.distance(netwokrLinkLength);
	force.charge(netwokrCharge);
	

	if (vis == null) {

		zoom = d3.behavior.zoom()
			.translate([0, 0])
			.scale(1)
			.scaleExtent([0.25, 6])
			.on("zoom", redraw);

		vis = d3.select("#network").append("svg:svg")
			.attr("width", $("#network").width() - 10)
			.attr("height", $("#network").height() - 10)
			.append('svg:g')
			.call(zoom)//.call(d3.behavior.zoom().scaleExtent([0.25, 6]).on("zoom", redraw)) //.call(d3.behavior.zoom().on("zoom", redraw))			
			.append('svg:g');

		vis.append('svg:rect')
			.attr('width', $("#network").width() + 1000)
			.attr('height', $("#network").height() + 1000)
			.attr('fill', 'white')
			.attr('id', 'zoomCanvas')
			.style("cursor", "url(menu/openhand.png)")
			.on("mousedown", function () {

				//the grabbing css rules do not work with web-kit, so specifiy the cursor hand and use the css for firefox.
				d3.select("#zoomCanvas").style("cursor", "url(menu/closedhand.png)");
				d3.select("#zoomCanvas").attr("class", "grabbing");
			})
			.on("mouseup", function () {

				d3.select("#zoomCanvas").style("cursor", "url(menu/openhand.png)");
				d3.select("#zoomCanvas").attr("class", "");
			});
	}

	vis.attr("transform",
	  "translate(" + trans + ")"
	  + " scale(" + scale + ")");

}

//build the intial list used for dynamic mode
function buildDynamicList() {

	var listNodes = baseNodes;

	listNodes.sort(function (a, b) {

		var nameA = a.labelLast.toLowerCase(), nameB = b.labelLast.toLowerCase()

		if (nameA < nameB) {//sort string ascending
			return -1
		}
		if (nameA > nameB) {
			return 1
		}
		return 0 //default return value (no sorting)
	});

	for (x in listNodes) {

		var id_css = listNodes[x].id.split("/")[listNodes[x].id.split("/").length - 1].replace(cssSafe, '');
		var id_img = $.trim(decodeURI(listNodes[x].id).split("\/")[decodeURI(listNodes[x].id).split("\/").length - 1]);

		var descText = listNodes[x].descText;

		$("#dynamicListHolder").append
        (
            $("<div>")
                .attr("id", "dynamic_" + id_css)
                .addClass("dynamicListItem")
                .data("label", listNodes[x].labelLast)
                .data("id", listNodes[x].id)
                .click(function () { if (dynamicPeople.indexOf($(this).data("id")) == -1) { $("#dynamicClear").fadeIn(5000); $("#dynamicHelp").css("display", "none"); usePerson = $(this).data("id"); dynamicPeople.push(usePerson); filter(); } })
                .append
                (
                    $("<img>")
                        .attr("src", function () {

                        	if (fileNames.indexOf(id_img + '.png') != -1) {
                        		return "img/" + id_img + '.png';
                        	} else {
                        		return "";
                        	}
                        })
                        .css("visibility", function () {
                        	if (fileNames.indexOf(id_img + '.png') != -1) {
                        		return "visible"
                        	} else {
                        		return "hidden"
                        	}
                        })
                )
                .append
                (
                    $("<div>")
                        .text(listNodes[x].labelLast)
                        .attr("title", descText)
                )
        )
	}
}




function dataAnalysis() {

	//we need to know some stats about the people before we start to render the network
	//find out the largest nodes
	var totalConnections = 0;
	for (x in tripleObject) {	//each x here is a person

		var size = 0;

		for (y in tripleObject[x]) {		//this level is the types of relations, mentions, knows, etc. each y here is a realtion bundle
			size = size + tripleObject[x][y].length;
		}

		var sizeObj = {};
		sizeObj.node = x;
		sizeObj.size = size;
		sizeObj.random = Math.floor((Math.random() * 100) + 1);
		largestNodes.push(sizeObj);
		totalConnections = totalConnections + size;
	}

	//now an array of objects of with the .node property being the index to the tripleObect
	largestNodes.sort(function (a, b) {
		return b.size - a.size;
	});

	//find out the range of number of connections to color our edges
	edgesAvg = Math.floor(totalConnections / largestNodes.length);
	edgesInterval = (largestNodes[0].size - edgesAvg) / 3;
	console.log(edgesInterval);

	var flipFlop = 0;
	//for (largeNode in largestNodes){
	//	largestNodes[largeNode].flipFlop =  (flipFlop % 2 == 1) ?  (flipFlop*-1) : (flipFlop);
	for (var i = largestNodes.length - 1; i >= 0; i--) {
		largestNodes[i].flipFlop = (flipFlop % 2 == 1) ? (flipFlop * -1) : (flipFlop);
		flipFlop++;
	}

	largestNodes.splice(networkLargeNodeLimit, largestNodes.length - networkLargeNodeLimit);
	largestNodes.sort(function (a, b) {
		return b.flipFlop - a.flipFlop;
	});

	if (visMode == "wave") {

		//we want to pin some of the larger nodes to the outside in order to keep things readable, so figure our where to put them and store it in this obj array
		for (n in largestNodes) {

			var nudge = 0;
			var r = visHeight / 2.5;
			var a = (186 / largestNodes.length) * n;

			if (n == 0) {
				nudge = 50;
			}

			if (n == 1) {
				nudge = -50;
			}

			largestNodes[n].x = (visWidth / 2) + (r + visWidth / 4) * Math.cos(a);
			largestNodes[n].y = (visHeight / 2) + nudge - 10 + r * Math.sin(a);

			/*	
			 
				vis.append("circle")
						.attr("class", "node")
						.attr("cx", largestNodes[n].x)
						.attr("cy", largestNodes[n].y)
						.attr("r", 8)
						.style("fill", function(d, i) { return fill(i & 3); })
						.style("stroke", function(d, i) { return d3.rgb(fill(i & 3)).darker(2); })
						.style("stroke-width", 1.5);
			
				*/
		}
	}
}


function displayLabel(d) {

	if (visMode == "person" || visMode == "dynamic") {
		return "block";
	} else {
		return (d.connections >= edgesInterval / 1.5) ? "block" : "none";
	}
}

function returnNodeStrokeWidth(d) {

	if (visMode == "person" || visMode == "dynamic") {

		if (dynamicPeople.indexOf(d.id) != -1 || usePerson == d.id) {

			return 5;
		}
	}

	return 1.5
}

function returnNodeColor(d) {

	if (visMode == "person" || visMode == "dynamic") {

		if (dynamicPeople.indexOf(d.id) != -1 || usePerson == d.id) {

			return "#FC0";
		}
	}

	return "#666"
}

function returnNodeSize(d) {

	if (visMode == "person") {

		if (d.id == usePerson) {
			return 50;
		} else {
			return 15 + Math.round(d.connections / 15);
		}
	} else if (visMode == "dynamic") {

		if (dynamicPeople.indexOf(d.id) == -1) {
			return 20;
		} else {
			return 35;
		}

	} else {
		return Math.round(Math.sqrt(d.connections) + (d.connections / 6));
	}
}

//wooo!, from https://groups.google.com/forum/?fromgroups#!topic/d3-js/ndyvibO7wDA
function pointsBetween(circle1, circle2, standOff1, standOff2) {

	var x1 = circle1.x, y1 = circle1.y,
        x2 = circle2.x, y2 = circle2.y,
        dx = x2 - x1, dy = y2 - y1,
        r1 = returnNodeSize(circle1) + (standOff1 || 0),
        r2 = returnNodeSize(circle2) + (standOff2 || 0);

	if ((r1 + r2) * (r1 + r2) >= dx * dx + dy * dy) {
		return [[0, 0], [0, 0]];
	}

	var a = Math.atan2(dy, dx), c = Math.cos(a), s = Math.sin(a);

	return [
      [x1 + c * r1, y1 + s * r1],
      [x2 - c * r2, y2 - s * r2]
	];
}

function hidePopup() {

	//hidePopupTimer
	jQuery("#popUp").css("display", "none");

	var customClass = "link_" + currentNode.id.split("/")[currentNode.id.split("/").length - 1].replace(/%|\(|\)|\.|\,/g, '');

	d3.selectAll(".marker").attr("stroke-opacity", 1).attr("fill-opacity", 1)
	d3.selectAll(".link").attr("stroke-opacity", 1).style("fill-opacity", 1).style("stroke-width", function (d) { return edgeStrokeWidth(d) });
	d3.selectAll(".backgroundCircle").attr("fill-opacity", 1).attr("stroke-opacity", 1);
	d3.selectAll(".imageCircle").attr("display", "block");
	d3.selectAll(".circleText").attr("fill-opacity", 1).attr("stroke-opacity", 1);
}

function showPopup(d, cords) {

	//d3 stuff
	clearTimeout(hidePopupTimer);
	d3.selectAll(".link").attr("stroke-opacity", 0.1).attr("fill-opacity", 0.1);
	d3.selectAll(".backgroundCircle").attr("fill-opacity", 0.1).attr("stroke-opacity", 0.1);
	d3.selectAll(".circleText").attr("fill-opacity", 0.1).attr("stroke-opacity", 0.1);
	d3.selectAll(".imageCircle").attr("display", "none");

	d3.selectAll(".marker").attr("stroke-opacity", 0.1).attr("fill-opacity", 0.1)

	var customClass = d.id.split("/")[d.id.split("/").length - 1].replace(cssSafe, '');
	//d3.selectAll("." + "link_" + customClass).style("stroke","#fd8d3c").style("stroke-opacity",1).style("fill-opacity",1);//.attr("display","block");//.style("opacity",1);
	d3.selectAll("." + "link_" + customClass).attr("stroke-opacity", 1).style("fill-opacity", 1).style("stroke-width", 2);//.style("opacity",1);			

	d3.selectAll("#backgroundCircle_" + customClass).attr("fill-opacity", 1).attr("stroke-opacity", 1);
	d3.selectAll("#imageCircle_" + customClass).attr("display", "block");
	d3.selectAll("#circleText_" + customClass).attr("fill-opacity", 1).attr("stroke-opacity", 1);

	for (x in connectionIndex[d.id]) {
		var id = connectionIndex[d.id][x].split("/")[connectionIndex[d.id][x].split("/").length - 1].replace(cssSafe, '');

		d3.selectAll("#backgroundCircle_" + id).attr("fill-opacity", 1).attr("stroke-opacity", 1);
		d3.selectAll("#imageCircle_" + id).attr("display", "block");
		d3.selectAll("#circleText_" + id).attr("fill-opacity", 1).attr("stroke-opacity", 1);

	}

	var useX, useY;

	if (typeof cords != 'undefined') {
		useX = cords[0];
		useY = cords[1];
	} else {

		if (scale == 1 && trans[0] == 0 && trans[1] == 0) {

			useX = d.x;
			useY = d.y;

		} else {
			useX = d3.event.pageX;
			useY = d3.event.pageY;
		}
	}

	var descText = '';

	if (descObject.hasOwnProperty(d.id)) {
		var desc = descObject[d.id]['http://www.w3.org/2000/01/rdf-schema#comment'][0].value;
		var r = /\\u([\d\w]{4})/gi;

		desc = desc.replace(r, function (match, grp) {
			return String.fromCharCode(parseInt(grp, 16));
		});

		desc = unescape(desc);
		descText = decodeURIComponent(desc);
		descText = descText.replace(/&ndash;/gi, '-');
		descText = descText.replace(/&amp;/gi, '&');
	}

	//if (jQuery("#toolTip .content").html()=="<span>Sorry could not figure out this relationship.</span>"){
	//	return false;	
	//}

	var useId = $.trim(decodeURI(d.id).split("\/")[decodeURI(d.id).split("\/").length - 1]);

	jQuery("#popUp").empty();

	if (fileNames.indexOf(useId + '.png') == -1) {
		var useImage = 'img/menu/no_image.png';
	} else {
		var useImage = 'img/' + useId + '.png'
	}

	jQuery("#popUp").append(

		$("<img>")
			.attr("src", function () { return useImage; })
			.css("height", "75px")
			.css("width", "75px")
			.css("min-height", "75px")
			.css("min-width", "75px")
			.css("position", "absolute")
			.css("left", "0px")
			.css("top", "0px")
			.error(function () {
				$(this).css("visibility", "hidden")
			})
	).append(
		$("<span>")
			.css("color", "#fff")
			.text(d.label)
			.css("position", "absolute")
			.css("left", "80px")
			.css("top", "0px")

	).append(
		$("<div>")
			.css("font-size", "10px")
			.css("width", "138px")
			.css("margin-left", "80px")
			.css("margin-top", "22px")
			.css("text-align", "left")
			.attr("id", "popupDesc")
			.text(descText)

	).append(
		$("<div>")

			.css("position", "absolute")
			.css("border", "solid 1px white")
			.css("border-radius", "5px")
			.css("left", "20px")
			.css("cursor", "pointer")
			.css("top", "85px")
			.css("visibility", function () {

				if (metaNames.indexOf(useId + '.meta') == -1) {
					return "hidden";
				} else {
					return 'visible';
				}

			})
			.attr("title", "Click to play music by " + d.label + ".")
 			.append(
				$("<div>")
					.attr("id", "playButton")
					.data("useId", useId)
					.click(function () {

						loadYouTube($(this).data("useId"));
					})
			)
	);

	//we need to define where to place the box in relation of the node on the vis
	if (useX < visWidth / 2) {

		//is there room to go to the left of the node anyway?
		if (useX - jQuery("#popUp").width() > 0) {

			useX = useX - jQuery("#popUp").width() - 15;

		} else {

			useX = useX + 25;
		}

	} else {

		if (useX + jQuery("#popUp").width() + 25 <= visWidth) {
			useX = useX + 25;
		} else {
			useX = useX - jQuery("#popUp").width() - 15;
		}
	}

	if (useY + jQuery("#popUp").height() > visHeight) {
		useY = useY - jQuery("#popUp").height();
	}

	//the 
	if ($("#video object").length > 0) {


	}

	jQuery("#popUp")
		.css("left", useX + "px")
		.css("top", useY + "px");

	jQuery("#popUp").fadeIn(300);
}

function changeVisMode(changeTo) {

	visMode = changeTo;
	$("#network").fadeOut(function () {

		$("#network").css("visibility", "hidden");

		//if the popup has been shown make sure its hidden before the next view
		if (currentNode != null) {
			hidePopup();
		}

		showSpinner("Rendering<br>Network");
		initalizeNetwork();

		//we need to rest the zoom/pan
		zoom.translate([0, 0]).scale(1);
		vis.attr("transform", "translate(" + [0, 0] + ")" + " scale(" + 1 + ")");

		zoomWidgetObjDoZoom = false;
		zoomWidgetObj.setValue(0, 0.255555555);

		filter();
	});
}

//build the intial list used for dynamic mode
function buildDynamicList() {

	var listNodes = baseNodes;

	listNodes.sort(function (a, b) {
		var nameA = a.labelLast.toLowerCase(), nameB = b.labelLast.toLowerCase()

		if (nameA < nameB) { //sort string ascending
			return -1
		}

		if (nameA > nameB) {
			return 1
		}
		return 0 //default return value (no sorting)
	});

	for (x in listNodes) {

		var id_css = listNodes[x].id.split("/")[listNodes[x].id.split("/").length - 1].replace(cssSafe, '');
		var id_img = $.trim(decodeURI(listNodes[x].id).split("\/")[decodeURI(listNodes[x].id).split("\/").length - 1]);

		var descText = '';

		if (descObject.hasOwnProperty(listNodes[x].id)) {
			var desc = descObject[listNodes[x].id]['http://www.w3.org/2000/01/rdf-schema#comment'][0].value;
			var r = /\\u([\d\w]{4})/gi;

			desc = desc.replace(r, function (match, grp) {
				return String.fromCharCode(parseInt(grp, 16));
			});

			desc = unescape(desc);
			descText = decodeURIComponent(desc);
			descText = descText.replace(/&ndash;/gi, '-');
			descText = descText.replace(/&amp;/gi, '&');
		}

		$("#dynamicListHolder").append
		(
			$("<div>")
				.attr("id", "dynamic_" + id_css)
				.addClass("dynamicListItem")
				.data("label", listNodes[x].labelLast)
				.data("id", listNodes[x].id)
				.click(function () {
					if (dynamicPeople.indexOf($(this).data("id")) == -1) {
						$("#dynamicClear").fadeIn(5000);
						$("#dynamicHelp").css("display", "none");
						usePerson = $(this).data("id");
						dynamicPeople.push(usePerson);
						filter();
					}
				})
				.append
				(
					$("<img>")
						.attr("src", function () {

							if (fileNames.indexOf(id_img + '.png') != -1) {
								return "img/" + id_img + '.png';
							} else {
								return "";
							}
						})
						.css("visibility", function () {
							if (fileNames.indexOf(id_img + '.png') != -1) {
								return "visible"
							} else {
								return "hidden"
							}
						})

				)
				.append
				(
					$("<div>")
						.text(listNodes[x].labelLast)
						.attr("title", descText)
				)
		)
	}
}

function dynamicFilterList() {

	var searchTerm = $("#dynamicSearchInput").val().toLowerCase();

	$(".dynamicListItem").each(function () {

		if ($(this).data("label").toLowerCase().indexOf(searchTerm) == -1) {
			$(this).css("display", "none");
		} else {
			$(this).css("display", "block");
		}
	});
}

//zoom/pan function called by mouse event
function redraw(useScale) {

	//store the last event data
	trans = d3.event.translate;
	scale = d3.event.scale;

	//transform the vis
	vis.attr("transform",
       "translate(" + trans + ")"
       + " scale(" + scale + ")");

	//we need to update the zoom slider, set the boolean to false so the slider change does not trigger a zoom change in the vis (from the slider callback function)  
	zoomWidgetObjDoZoom = false;
	zoomWidgetObj.setValue(0, (scale / 4));
}

function loadYouTube(useId) {

	var filename = useId + '.meta';

	$.get('img/' + filename, function (data) {

		var objectCode = youTubeObject.replace(/\<id\>/ig, data);

		$("#video").empty();
		$("#video").append(
			$("<a>")
				.text("[x] Close")
				.attr("href", "#")
				.attr("id", "youTubeClose")
				.attr("title", "Close Video")
				.click(function (event) {
					$("#video").empty();
					event.stopPropagation();
					event.preventDefault();
				})
		);

		$("#video").append(objectCode);
	});
	//youTubeObject
}

function edgeStrokeWidth(d) {

	if (visMode == "person" || visMode == "dynamic") {

		if (nodes.length < 10) {
			return 2;
		}

		if (nodes.length < 30) {
			return 1;
		}

		if (nodes.length < 40) {
			return 0.5;
		}

		return .3;
	}

	return 0.3;
}

function edgeColor(d) {

	if (visMode == 'dynamic') {
		return "#666";
	}

	if (typeof d.connections == 'undefined') {
		d = d.source;
	}

	if (d.connections <= edgesAvg) {
		return "#bcbddc";
	}

	if ((d.connections - edgesAvg) / edgesInterval <= 1.5) {
		return "#9ecae1";
	}

	if ((d.connections - edgesAvg) / edgesInterval <= 2.5) {
		return "#74c476";
	}

	return "#fdae6b";
}

function linkStrength(d) {

	if (visMode == "free") {
		//return Math.sqrt(d.source.connections)/15;		
		//return 0;
		return (d.source.connections / largestConnection) / 500;
	}

	if (visMode == "wave") {
		return Math.sqrt(d.source.connections) / 9;
	}
	if (visMode == "person") {
		return 0.2;
	}

	if (visMode == "dynamic") {
		return 0.01;
	}

	if (visMode == "clique") {
		//return Math.sqrt(d.source.connections)/8;		

		//we want to find the combined simlarity between the two people
		var p1 = d.source.id;
		var p2 = d.target.id;
		var strength = 0;

		if (simlarityIndex[p1].hasOwnProperty(p2)) {
			strength = simlarityIndex[p1][p2];
		}

		if (simlarityIndex[p2].hasOwnProperty(p1)) {
			strength = strength + simlarityIndex[p2][p1];
		}

		return (strength / (largestSimilarity * 2));
	}
}

function showSpinner(text) {

	$("#spinner").css("left", ($("#network").width() / 2) - 65 + "px");
	$("#spinner").css("top", ($("#network").height() / 2) - 65 + "px");
	$("#spinner").css("display", "block");
	$("#spinner span").html(text);
}

function hideSpinner() {
	$("#spinner").css("display", "none");
}

function windowResize() {

	visWidth = $(window).width();
	visHeight = $(window).height();

	$("#network").css('width', visWidth + 'px');
	$("#network").css('height', visHeight + 'px');
	$("#dynamicListHolder").css('height', visHeight - 110 + 'px');
}