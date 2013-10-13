
if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) {
	alert('We\'re Sorry, this visualization uses the SVG standard, most modern browsers support SVG. If you would like to see this visualization please view this page in another browser such as Google Chrome, Firefox, Safari, or Internet Explorer 9+');
}

var fileNames = ['Jackie_McLean.png', 'Coleman_Hawkins.png', 'Barney_Bigard.png', 'Woody_Herman.png', 'Ray_Drummond.png', 'Sy_Oliver.png', 'Billy_Taylor_(jazz_bassist).png', 'Stan_Kenton.png', 'Buddy_Rich.png', 'Lee_Young.png', 'Frank_Wess.png', 'Miles_Davis.png', 'Jimmie_Lunceford.png', 'Stevie_Wonder.png', 'Oscar_Peterson.png', 'Etta_Jones.png', 'Earl_Hines.png', 'Herbie_Hancock.png', 'Julius_Watkins.png', 'Jerome_Richardson.png', 'Art_Blakey.png', 'Buster_Williams.png', 'Wynton_Marsalis.png', 'Charlie_Johnson_(bandleader).png', 'Lucky_Millinder.png', 'John_Levy_(musician).png', 'Cab_Calloway.png', 'Chu_Berry.png', 'Freddie_Green.png', 'Artie_Shaw.png', 'Jimmy_Dorsey.png', 'Sammy_Davis,_Jr..png', 'Joe_King_Oliver.png', 'Philly_Joe_Jones.png', 'Slide_Hampton.png', 'Jo_Jones.png', 'Fats_Navarro.png', 'Tony_Williams.png', 'Danny_Barker.png', 'Bill_Johnson_(reed_player).png', 'Tadd_Dameron.png', 'Charlie_Parker.png', 'Thelonious_Monk.png', 'Marian_McPartland.png', 'Mel_Lewis.png', 'Sweets_Edison.png', 'Eric_Dolphy.png', 'Kid_Ory.png', 'John_Lewis_(pianist).png', 'Jimmy_Jones_(pianist).png', 'Helen_Humes.png', 'Ron_Carter.png', 'Erroll_Garner.png', 'James_Moody_(saxophonist).png', 'Teddy_Wilson.png', 'Sam_Rivers.png', 'Sarah_Vaughan.png', 'Red_Rodney.png', 'Tommy_Dorsey.png', 'Gigi_Gryce.png', 'Tony_Bennett.png', 'Billie_Holiday.png', 'Harold_Ousley.png', 'Gerald_Wiggins.png', 'Billy_Strayhorn.png', 'Tiny_Bradshaw.png', 'Jimmy_Scott.png', 'Max_Roach.png', 'Wayne_Shorter.png', 'Yusef_Lateef.png', 'Paul_Gonsalves.png', 'Harry_James.png', 'Shadow_Wilson.png', 'Tommy_Potter.png', 'Bill_Evans.png', 'Fats_Domino.png', 'George_Wein.png', 'Clark_Terry.png', 'Lionel_Hampton.png', 'Benny_Waters.png', 'Hank_Jones.png', 'Buddy_Tate_(musician).png', 'Illinois_Jacquet.png', 'Carmen_McRae.png', 'Eddie_Marshall.png', 'Lucky_Thompson.png', 'Phil_Woods.png', 'Phil_Wilson_(trombonist).png', 'Joe_Williams_(jazz_singer).png', 'Lena_Horne.png', 'Louie_Bellson.png', 'Lawrence_Brown_(musician).png', 'Billy_Higgins.png', 'Bob_Haggart.png', 'Jack_Teagarden.png', 'Gene_Krupa.png', 'Ornette_Coleman.png', 'Oscar_Pettiford.png', 'Count_Basie.png', 'Charlie_Shavers.png', 'John_Coltrane.png', 'Thad_Jones.png', 'Art_Farmer.png', 'Benny_Golson.png', 'Fletcher_Henderson.png', 'Erskine_Hawkins.png', 'Buddy_DeFranco.png', 'Roy_Eldridge.png', 'Milt_Hinton.png', 'Ray_Nance.png', 'Elvin_Jones.png', 'Budd_Johnson.png', 'Ben_Webster.png', 'Al_McKibbon.png', 'Frank_Foster_(musician).png', 'Ella_Fitzgerald.png', 'Gil_Evans.png', 'Andy_Kirk.png', 'Joe_Newman_(trumpeter).png', 'Fats_Waller.png', 'Milt_Jackson.png', 'Roy_Haynes.png', 'Sonny_Stitt.png', 'Bud_Powell.png', 'Benny_Powell.png', 'Oliver_Nelson.png', 'Mary_Lou_Williams.png', 'Quincy_Jones.png', 'Billy_Eckstine.png', 'Delfeayo_Marsalis.png', 'Don_Redman.png', 'Benny_Carter.png', 'Chet_Baker.png', 'Dave_Brubeck.png', 'Johnny_Griffin.png', 'Nat_Pierce.png', 'Dizzy_Gillespie.png', 'Dinah_Washington.png', 'Betty_Carter.png', 'Stan_Getz.png', 'J._J._Johnson.png', 'Gunther_Schuller.png', 'Percy_Heath.png', 'Tricky_Sam_Nanton.png', 'Cozy_Cole.png', 'Kenny_Clarke.png', 'Johnny_Hodges.png', 'Ed_Shaughnessy.png', 'Sid_Catlett.png', 'Jane_Jarvis.png', 'Neal_Hefti.png', 'Randy_Weston.png', 'Frank_Sinatra.png', 'Herb_Jeffries.png', 'McCoy_Tyner.png', 'Sidney_Bechet.png', 'Willie_The_Lion_Smith.png', 'Art_Tatum.png', 'Don_Byas.png', 'Joe_Morello.png', 'Sonny_Greer.png', 'Benny_Goodman.png', 'Charles_Mingus.png', 'Chico_Hamilton.png', 'Ray_Brown,_Jr..png', 'Norman_Granz.png', 'Babs_Gonzales.png', 'Doc_Cheatham.png', 'Kaiser_Marshall.png', 'Nat_King_Cole.png', 'Buck_Clayton.png', 'Jay_McShann.png', 'Bennie_Moten.png', 'Chick_Webb.png', 'Louis_Jordan.png', 'Nancy_Wilson_(jazz_singer).png', 'Duke_Ellington.png', 'Jelly_Roll_Morton.png', 'Charlie_Barnet.png', 'Lester_Young.png', 'David_Baker_(composer).png', 'Slam_Stewart.png', 'Kenny_Dorham.png', 'Gerald_Wilson.png', 'Dexter_Gordon.png', 'Snooky_Young.png', 'Charlie_Christian.png', 'Alan_Dawson.png', 'Kenny_Burrell.png', 'Abbey_Lincoln.png', 'Horace_Silver.png', 'Louis_Armstrong.png', 'Melba_Liston.png', 'Jimmy_Cleveland.png', 'Glenn_Miller.png', 'Bing_Crosby.png', 'Wynton_Kelly.png', 'Wardell_Gray.png', 'George_Shearing.png', 'Clifford_Brown.png', 'Ray_Brown_(musician).png', 'Hot_Lips_Page.png', 'Zutty_Singleton.png', 'James_P._Johnson.png', 'Claude_Thornhill.png']; var metaNames = ['Milt_Hinton.meta', 'Frank_Foster_(musician).meta', 'Buddy_Tate_(musician).meta', 'Mary_Lou_Williams.meta', 'Gunther_Schuller.meta', 'Billy_Taylor_(jazz_bassist).meta', 'Gerald_Wiggins.meta', 'Eddie_Marshall.meta', 'Dave_Brubeck.meta', 'J._J._Johnson.meta', 'Yusef_Lateef.meta', 'Melba_Liston.meta', 'Joe_Williams_(jazz_singer).meta', 'Cozy_Cole.meta', 'Charles_Mingus.meta', 'Louie_Bellson.meta', 'Lionel_Hampton.meta', 'Chico_Hamilton.meta', 'Abbey_Lincoln.meta', 'Clark_Terry.meta', 'Roy_Haynes.meta', 'Oscar_Peterson.meta', 'Ray_Drummond.meta', 'Benny_Golson.meta', 'Artie_Shaw.meta', 'Jimmy_Scott.meta', 'Danny_Barker.meta', 'Johnny_Griffin.meta', 'Buster_Williams.meta', 'Etta_Jones.meta', 'Slide_Hampton.meta', 'Roy_Eldridge.meta', 'Buddy_DeFranco.meta'];

var visMode = 'dynamic';			//the type of network to render, each has it own settings

var largestNodes = [];			//holds a list of the N largest nodes/people (most connections) in order to place/lock them properly on render
var hidePopupTimer = null;		//holds the timer to close the popup
var showPopupTimer = null;
var currentNode = null;			//the current node we are highligting
var usePersonIndex = 0;			//the index pos of the usePerson in the nodes array, so we dont have to loop through the whole thing everytime
var edgesAvg = 0;
var edgesInterval = 0			//the steps between the avg and largest # edges
var trans = [0, 0];
var scale = 1;

var tripleStore = null;			//holds the triple data bank created by te rdfquery plugin
var tripleObject = null;		//holds the javascript seralized object of the triple store
var descStore = null;			//holds the triple data bank created by te rdfquery plugin for the description
var descObject = null;			//holds the javascript seralized object of the triple store for the description
var usePerson = null;			//the person in person mode
var dynamicPeople = [];			//holds who is added in the dynamic mode
var baseNodes = [];             //stores the base (all) of the nodes and


var baseLinks = [];				// links
var connectionCounter = {};		//holds each  id as a property name w/ the value = # of connections they have

var connectionIndex = {};		//a object with properties as id names, with values an array of strings of ids that person has connections to.
var largestConnection = 0;		//
var simlarityIndex = {}			//properties are id names, with the value being an array of objects with other ids and their # of matching connections
var largestSimilarity = 0;		//holds the max number of similar connections any two nodes share in the network
var cssSafe = new RegExp(/%|\(|\)|\.|\,/g);	//the regex to remove non css viable chars
var vis = null					//the visualization
var zoom = null;				//the d3.js zoom object
var force = null;				//the d3 force object

var visWidth = 0;			//width and height of the network canvas, in px
var visHeight = 0;
var strokeWidth = 0.1;			//the defult width to make the stroke

//the settings that vary for each diff type of network 
var networkGravity = 1;
var netwokrLinkLength = 35;
var networkLargeNodeLimit = 20;	//the number of top nodes to fix/lock to a patterend spot on the network
var netwokrCharge = -800;
var networkStopTick = true;		//when the alpha value drops to display the graph, do we stop the nodes from animating?
var networkNodeDrag = true;	//can you drag the nodes about?
var networkMinEdges = 4;		//the min number of edges to have a node be rendered

var youTubeObject = '<object style="height=130px; width=200px; position: absolute; bottom: 0px;"> <param name="movie" value="https://www.youtube.com/v/<id>?version=3&feature=player_embedded&controls=1&enablejsapi=1&modestbranding=1&rel=0&showinfo=1&autoplay=1"><param name="allowFullScreen" value="true"><param name="wmode" value="transparent"><param name="allowScriptAccess" value="always"><embed src="https://www.youtube.com/v/<id>?version=3&feature=player_embedded&controls=1&enablejsapi=1&modestbranding=1&rel=0&showinfo=1&autoplay=1" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="200" height="130" wmode="transparent"></object>';
var zoomWidgetObj = null;			//the zoom widget draghandeler object
var zoomWidgetObjDoZoom = true;

var oldzoom = 0;
var fill = d3.scale.category10();
var lineColor = d3.scale.category20c();


jQuery(document).ready(function ($) {

	//give the UI some breathing room, a chance to render
	setTimeout(function () {

		//grab the descripons of the artists
		$.get('data/abstracts.txt', function (data) {
			buildDescriptionStore(data);
		});

		$.get('data/triples.txt', function (data) {
			buildTripleStore(data);

			buildBase();
			//buildDynamicList();
		})
		.error(function () { alert("There was an error in accessing the data file. Please try again."); });

	}, 200, []);
});

//process the triple data through the RDF jquery plugin to create an object
function buildTripleStore(data) {

	tripleStore = $.rdf.databank([],
	  {
	  	base: 'http://www.dbpedia.org/',
	  	namespaces: {
	  		dc: 'http://purl.org/dc/elements/1.1/',
	  		foaf: 'http://xmlns.com/foaf/0.1/',
	  		lj: 'http://www.linkedjazz.org/lj/'
	  	}
	  });

	/***********
	* 	The file we are loading is expected to be a triple store in the format '<object> <predicate> <object> .\n'
	*   Note the space after the final object and the '.' and the \n only
	************/
	var triples = data.split("\n");
	for (x in triples) {
		if (triples[x].length > 0) {
			try {
				tripleStore.add(triples[x]);
			}
			catch (err) {
				//if it cannot load one of the triples it is not a total failure, keep going
				console.log('There was an error processing the data file:');
				console.log(err);
			}
		}
	}

	tripleObject = tripleStore.dump()
}

//process the triple data through the RDF jquery plugin to create an object
function buildDescriptionStore(data) {

	var descStore = $.rdf.databank([],
	  {
	  	base: 'http://www.dbpedia.org/',
	  	namespaces: {
	  		dc: 'http://purl.org/dc/elements/1.1/',
	  		wc: 'http://www.w3.org/2000/01/rdf-schema',
	  		lj: 'http://www.linkedjazz.org/lj/'
	  	}
	  });


	/***********
	* 	The file we are loading is expected to be a triple dump in the format '<object> <predicate> <object> .\n'
	*   Note the space after the final object and the '.' and the \n only
	************/
	var triples = data.split("\n");
	for (x in triples) {
		if (triples[x].length > 0) {
			try {
				descStore.add(triples[x]);
			}
			catch (err) {
				//if it cannot load one of the triples it is not a total failure, keep going
				console.log('There was an error processing the data file:');
				console.log(err);
			}
		}
	}

	descObject = descStore.dump()
}

//	Builds the base nodes and links arrays 
function buildBase() {

	var allObjects = [];
	var quickLookup = {};

	//we need to establish the nodes and links
	//we do it by making a string array and adding their ids to it, if it is unique in the string array then we can add the object to the node array

	for (x in tripleObject) {	//each x here is a person


		if (allObjects.indexOf(String(x)) == -1) {
			allObjects.push(String(x));
			baseNodes.push({ id: String(x) });
		}

		for (y in tripleObject[x]) {		//this level is the types of relations, mentions, knows, etc. each y here is a realtion bundle
			for (z in tripleObject[x][y]) {	//here each z is a relation					
				if (allObjects.indexOf(tripleObject[x][y][z].value) == -1) {

					baseNodes.push({ id: tripleObject[x][y][z].value });
					allObjects.push(tripleObject[x][y][z].value);

					//we are adding props to this object to store their # of connections, depending on the order they may have already been added if they
					//were added by the creatLink function, so in both places check for the propery and add it in if it is not yet set

					if (!connectionCounter.hasOwnProperty(tripleObject[x][y][z].value)) {
						connectionCounter[tripleObject[x][y][z].value] = 0;
					}

					if (!quickLookup.hasOwnProperty(tripleObject[x][y][z].value)) {
						quickLookup[tripleObject[x][y][z].value] = -1;
					}

				}

				createLink(String(x), tripleObject[x][y][z].value);
			}
		}
	}


	//asign the number of connections each node has  and add the label	
	for (aNode in baseNodes) {
		baseNodes[aNode].connections = connectionCounter[baseNodes[aNode].id];
		if (baseNodes[aNode].connections > largestConnection) { largestConnection = baseNodes[aNode].connections; }

		//build an human label
		var label = $.trim(decodeURIComponent(baseNodes[aNode].id.split("/")[baseNodes[aNode].id.split("/").length - 1]).replace(/\_/g, ' '));
		if (label.search(/\(/) != -1) {
			label = label.substring(0, label.indexOf("("));
		}
		label = $.trim(label);
		baseNodes[aNode].label = label;

		//build and latter field
		baseNodes[aNode].letter = label[0];

		//build and image field
		var id_img = $.trim(decodeURI(baseNodes[aNode].id).split("\/")[decodeURI(baseNodes[aNode].id).split("\/").length - 1]);

		if (fileNames.indexOf(id_img + '.png') == -1) {
			baseNodes[aNode].image = "img/menu/no_image.png";
		} else {
			baseNodes[aNode].image = "img/" + id_img + '.png';
		}


		//build description text
		var descText = '';

		if (descObject.hasOwnProperty(baseNodes[aNode].id)) {
			var desc = descObject[baseNodes[aNode].id]['http://www.w3.org/2000/01/rdf-schema#comment'][0].value;
			var r = /\\u([\d\w]{4})/gi;
			desc = desc.replace(r, function (match, grp) {
				return String.fromCharCode(parseInt(grp, 16));
			});
			desc = unescape(desc);
			descText = decodeURIComponent(desc);
			descText = descText.replace(/&ndash;/gi, '-');
			descText = descText.replace(/&amp;/gi, '&');

		}

		baseNodes[aNode].descText = descText;


		//build a label lastname first
		label = label.split(" ");
		var lastLabel = null;

		if (label[label.length - 1].toLowerCase() == 'jr.' || label[label.length - 1].toLowerCase() == 'jr' || label[label.length - 1].toLowerCase() == 'sr.' || label[label.length - 1].toLowerCase() == 'sr') {

			lastLabel = label[label.length - 2].replace(',', '') + ' ' + label[label.length - 1] + ',';

			for (var i = 0; i <= label.length - 2; i++) {

				lastLabel = lastLabel + ' ' + label[i].replace(',', '');
			}

		} else {

			var lastLabel = label[label.length - 1] + ',';

			for (var i = 0; i <= label.length - 2; i++) {

				lastLabel = lastLabel + ' ' + label[i].replace(',', '');
			}
		}

		baseNodes[aNode].labelLast = lastLabel;
	}

	//we are building the similarity index here, basiclly it loops through all of the people and compairs their connections with everyone else
	//people who have similar connections have larger  simlarityIndex = the # of connections	 
	for (var key in connectionIndex) {
		var tmpAry = [];
		if (connectionIndex[key].length > 1) {
			for (var key2 in connectionIndex) {
				if (key != key2) {
					if (connectionIndex[key2].length > 1) {
						var tmpCount = 0;
						tmpCount = connectionIndex[key].filter(function (i) { return !(connectionIndex[key2].indexOf(i) == -1); }).length;
						if (tmpCount > 1) {
							tmpAry.push({ name: key2, count: tmpCount })
							if (tmpCount > largestSimilarity) { largestSimilarity = tmpCount; }
						}
					}
				}
			}
		}
		tmpAry.sort(function (a, b) {
			return b.count - a.count;
		});

		simlarityIndex[key] = {};

		for (x in tmpAry) {
			simlarityIndex[key][tmpAry[x].name] = tmpAry[x].count;
		}




	}



	function createLink(id1, id2) {
		var obj1 = null, obj2 = null;

		//in an effor to speed this lookup a little is to see if we have indexed the pos of the requested ids already, if so do not loop		
		if (quickLookup[id1] > -1 && quickLookup[id2] > -1) {
			obj1 = quickLookup[id1];
			obj2 = quickLookup[id2];
		} else {
			//not yet in the quicklookup object, it will be added here	
			for (q in baseNodes) {
				if (baseNodes[q].id == id1) { obj1 = q; }
				if (baseNodes[q].id == id2) { obj2 = q; }
				if (obj1 != null && obj2 != null) {


					quickLookup[id1] = obj1;
					quickLookup[id2] = obj2;

					break;
				}
			}

		}

		var customClass = "link_" + id1.split("/")[id1.split("/").length - 1].replace(cssSafe, '');
		customClass = customClass + " link_" + id2.split("/")[id2.split("/").length - 1].replace(cssSafe, '');

		baseLinks.push({ source: baseNodes[obj1], target: baseNodes[obj2], distance: 5, customClass: customClass });

		//+1 the number of conenctions, of it is not yet in the object, add it at 1
		if (!connectionCounter.hasOwnProperty(id1)) {
			connectionCounter[id1] = 1;
		} else {
			connectionCounter[id1] = connectionCounter[id1] + 1;
		}
		if (!connectionCounter.hasOwnProperty(id2)) {
			connectionCounter[id2] = 1;
		} else {
			connectionCounter[id2] = connectionCounter[id2] + 1;
		}


		//add this relation ship to the connectionIndex object
		//has propery yet?
		if (!connectionIndex.hasOwnProperty(id1)) {
			connectionIndex[id1] = [];
		}
		if (!connectionIndex.hasOwnProperty(id2)) {
			connectionIndex[id2] = [];
		}

		//does it have this relationship already?
		if (connectionIndex[id1].indexOf(id2) == -1) {
			connectionIndex[id1].push(id2);
		}
		if (connectionIndex[id2].indexOf(id1) == -1) {
			connectionIndex[id2].push(id1);
		}
	}
}


function filter(clear) {

	if (typeof clear == 'undefined') { clear = true; }

	//are we wiping the nodes out or just adding?
	if (clear) {

		$("#network").css("visibility", "hidden");
		vis.selectAll("g.node").remove();
		vis.selectAll("line.link").remove();

		nodes = [];
		links = [];
		force.nodes([]);
		force.links([]);
		restart();
	}

	var workingNodes = [];
	var workingLinks = [];
	nodesRemove = {};

	if (visMode == 'person') {

		for (var key in connectionIndex) {
			if (connectionIndex[key].indexOf(usePerson) == -1 && key != usePerson) {
				nodesRemove[key] = true;
			}
		}

	} else if (visMode == 'dynamic') {

		var connected = [];
		var connetedCounteed = {};

		//we want to only add people if they are a selected person, or they have a connection that is shared by at least one person aready on the graph		

		for (x in dynamicPeople) {

			//add everyones connections
			for (y in connectionIndex[dynamicPeople[x]]) {
				connected.push(connectionIndex[dynamicPeople[x]][y]);
			}

		}

		for (x in connected) {

			if (connetedCounteed.hasOwnProperty(connected[x])) {
				connetedCounteed[connected[x]] = connetedCounteed[connected[x]] + 1;
			} else {
				connetedCounteed[connected[x]] = 1;
			}
		}

		console.log(connetedCounteed);

		for (x in baseNodes) {

			//is this node in the conenctions?
			if (connetedCounteed.hasOwnProperty(baseNodes[x].id)) {

				//yes, but do they have more than one entry, meaning that more than 1 person has them as a connection?
				if (connetedCounteed[baseNodes[x].id] < 2) {
					//no
					//but are they one of the dynamic people?
					if (dynamicPeople.indexOf(baseNodes[x].id) == -1) {
						//no
						nodesRemove[baseNodes[x].id] = true;
					}
				}
			} else {
				//no...but are they the person themselfs?
				if (dynamicPeople.indexOf(baseNodes[x].id) == -1) {
					//no, remove them
					nodesRemove[baseNodes[x].id] = true;
				}
			}
		}

	} else {

		//filter out people with too little number of conenctions. we use the connectionCounter from the buildBase function		
		for (var key in connectionCounter) {

			if (connectionCounter.hasOwnProperty(key)) {

				if (connectionCounter[key] < networkMinEdges) {
					nodesRemove[key] = true;
				}
			}
		}
	}

	//now build the working arrays of the things we want to keep, 
	for (aNode in baseNodes) {

		if (!nodesRemove.hasOwnProperty(baseNodes[aNode].id)) {
			workingNodes.push(baseNodes[aNode]);
		}
	}

	for (aLink in baseLinks) {

		if (nodesRemove.hasOwnProperty(baseLinks[aLink].source.id) == false && nodesRemove.hasOwnProperty(baseLinks[aLink].target.id) == false) {
			workingLinks.push(baseLinks[aLink]);
		}
	}

	if (visMode == 'dynamic') {
		//for the dynmaic mode, we don't want a whole mess of edges cofusing things, since we are just intrested in how the added people are connected
		var temp = [];

		for (aLink in workingLinks) {
			if (dynamicPeople.indexOf(workingLinks[aLink].source.id) != -1 || dynamicPeople.indexOf(workingLinks[aLink].target.id) != -1) {

				temp.push(workingLinks[aLink]);
			}
		}

		workingLinks = temp;
	}

	/*
	
	for (var i = nodesRemove.length - 1; i >= 0; i--) {	
		nodes.splice(nodesRemove[i],1);
	}
	for (var i = linksRemove.length - 1; i >= 0; i--) {	
		links.splice(linksRemove[i],1);
	}
	*/

	//lock the large nodes to the pattern 
	for (aNode in workingNodes) {

		workingNodes[aNode].lock = false;
		workingNodes[aNode].y = visHeight / 2;
		workingNodes[aNode].x = Math.floor((Math.random() * visWidth) + 1);

		if (visMode != "person") {
			for (large in largestNodes) {
				if (largestNodes[large].node == workingNodes[aNode].id) {
					workingNodes[aNode].lockX = largestNodes[large].x;
					workingNodes[aNode].lockY = largestNodes[large].y;
					workingNodes[aNode].lock = true;
				}
			}
		}

		if (visMode == "person" && workingNodes[aNode].id == usePerson) {
			usePersonIndex = aNode;
		}
	}

	//copy over our work into the d3 node/link array
	nodes = force.nodes();
	links = force.links();

	for (aNode in workingNodes) {
		nodes.push(workingNodes[aNode]);
	}

	for (aLink in workingLinks) {
		links.push(workingLinks[aLink]);
	}

	/*
	if(visMode == 'dynamic'){		
		//we also dont want to double add nodes, we needed to leave them in up to this point so the new links could be drawn, but, now take them out
		var temp = [];

		for (r in nodes){
			var add=true;
		
			//is it already in there?
			for (n in temp){
				if (nodes[r].id == temp[n].id){
					add=false;
				}
			}
		
			if (add){
				temp.push(nodes[r]);
			}		
		}		
		nodes = temp;
	} 	
	console.log(nodes);
	*/
	restart();
}

function restart() {

	vis.append("svg:defs").selectAll("marker")
   .data(["FOAFknows"])
  .enter().append("svg:marker")
   .attr("id", String)
   .attr("class", "marker")
   .attr("viewBox", "0 -5 10 10")
   .attr("refX", 10)
   .attr("refY", 0)
   .attr("markerWidth", 10)
   .attr("markerHeight", 10)
   .attr("orient", "auto")
   .append("svg:path")
   .attr("d", "M0,-5L10,0L0,5")
   .style("fill", "#666")
   .style("stroke-width", 0);

	vis.selectAll("line.link")
	  .data(links)
	.enter().insert("line", "circle.node")
	  .style("stroke", function (d) { return edgeColor(d); })
	  .style("stroke-width", function (d) { return edgeStrokeWidth(d); })
	  .attr("class", function (d) { return "link " + d.customClass })
	  .attr("marker-end", function (d) { return (visMode == "person" || visMode == "dynamic") ? "url(#FOAFknows)" : "none"; })
	  .attr("x1", function (d) { return d.source.x; })
	  .attr("y1", function (d) { return d.source.y; })
	  .attr("x2", function (d) { return d.target.x; })
	  .attr("y2", function (d) { return d.target.y; });

	var node = vis.selectAll("g.node")
	  .data(nodes);

	var nodeEnter = node.enter().append("svg:g")
	  .attr("class", "node")
	  .style("cursor", "pointer")
	  .attr("id", function (d) { return "node_" + d.id.split("/")[d.id.split("/").length - 1].replace(cssSafe, '') })
	  .on("mouseover", function (d) {

	  	//showPopupTimer = setTimeout(function(){
	  	//clearTimeout(showPopupTimer);

	  	currentNode = d;
	  	showPopup(d);

	  	//}, 200, [d]);	

	  }).on("mouseout", function (d) {

	  	currentNode = d;
	  	hidePopupTimer = setTimeout(hidePopup, 150);

	  }).on("click", function (d) {

	  	hidePopup();

	  	$("#network").fadeOut('fast',
			function () {

				usePerson = d.id;
				changeVisMode("person");
			}
		);
	  });

	if (networkNodeDrag) {
		nodeEnter.call(force.drag);
	}

	nodeEnter.append("circle")
		.attr("id", function (d) { return "backgroundCircle_" + d.id.split("/")[d.id.split("/").length - 1].replace(cssSafe, ''); })
		.attr("class", "backgroundCircle")
		.attr("cx", function (d) { return 0; })
		.attr("cy", function (d) { return 0; })
		.attr("r", function (d) { return returnNodeSize(d); })
		.style("fill", function (d, i) { return "#ccc"; }) //return fill(i & 3); })
		.style("stroke", function (d, i) { return returnNodeColor(d); })
		.style("stroke-width", function (d) { return returnNodeStrokeWidth(d); });

	nodeEnter.append("svg:image")
		  .attr("id", function (d) { return "imageCircle_" + d.id.split("/")[d.id.split("/").length - 1].replace(cssSafe, '') })
		  .attr("class", "imageCircle")
		  .attr("xlink:href", function (d) {

		  	var useId = $.trim(decodeURI(d.id).split("\/")[decodeURI(d.id).split("\/").length - 1]);

		  	if (fileNames.indexOf(useId + '.png') == -1) {
		  		return "img/menu/no_image.png";
		  	} else {
		  		return "img/" + useId + '.png';
		  	}
		  })
		  .attr("x", function (d) { return (returnNodeSize(d) * -1); })
		  .attr("y", function (d) { return (returnNodeSize(d) * -1); })
		  .attr("width", function (d) { return (returnNodeSize(d) * 2); })
		  .attr("height", function (d) { return (returnNodeSize(d) * 2); });

	nodeEnter.append("svg:text")
	  .attr("id", function (d) { return "circleText_" + d.id.split("/")[d.id.split("/").length - 1].replace(cssSafe, '') })
	  .attr("font-size", function (d) { return returnNodeSize(d) / 2 })
	  .attr("class", function (d) { return "circleText" })
	  .attr("font-family", "helvetica, sans-serif")
	  .attr("text-anchor", "middle")
	  .attr("display", function (d) { return displayLabel(d); })
	  .attr("x", function (d) { return (returnNodeSize(d) * -0.1); })
	  .attr("y", function (d) { return returnNodeSize(d) + returnNodeSize(d) / 1.8; })

	   .text(function (d) { return d.label; });

	force.start();

	//controls the movement of the nodes	
	force.on("tick", function (e) {

		if (visMode == "wave") {

			for (aNode in nodes) {

				if (nodes[aNode].lock) {

					nodes[aNode].x = nodes[aNode].lockX;
					nodes[aNode].y = nodes[aNode].lockY;

				} else {

					if (e.alpha <= .08) {

						if (nodes[aNode].y <= 0) {
							nodes[aNode].y = Math.floor((Math.random() * 20) + 8);
							nodes[aNode].lock = true;
							nodes[aNode].lockY = nodes[aNode].y;
							nodes[aNode].lockX = nodes[aNode].x;
						}

						if (nodes[aNode].y >= visHeight) {
							nodes[aNode].y = visHeight - Math.floor((Math.random() * 60) + 20);
							nodes[aNode].lock = true;
							nodes[aNode].lockY = nodes[aNode].y;
							nodes[aNode].lockX = nodes[aNode].x;
						}
					}
				}
			}
		}

		if (visMode == "person") {
			nodes[usePersonIndex].x = visWidth / 2;
			nodes[usePersonIndex].y = visHeight / 2;
		}

		if (networkStopTick) {

			if (e.alpha <= .02) {
				hideSpinner();

				vis.selectAll("line.link")
				  .attr("x1", function (d) { return d.source.x; })
				  .attr("y1", function (d) { return d.source.y; })
				  .attr("x2", function (d) { return d.target.x; })
				  .attr("y2", function (d) { return d.target.y; });

				vis.selectAll("g.node").attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });




				if ($("#network").css("visibility") != "visible") {
					$("#network").css("visibility", "visible");
					$("#network").fadeIn();
					$("#zoomWidget").css("visibility", "visible");
				}

				force.stop();

			}

		} else {

			hideSpinner();

			//in this mode (don't stop tick) is used by the person and dynamic mode, we ewant to illustrat the flow of relationships, so 
			//do the math needed to draw the markers on the outside of the nodes.
			//for the other modes, its not important	
			vis.selectAll("line.link")
			  .attr("x1", function (d) { return pointsBetween(d.source, d.target)[0][0]; })
			  .attr("y1", function (d) { return pointsBetween(d.source, d.target)[0][1]; })
			  .attr("x2", function (d) { return pointsBetween(d.source, d.target)[1][0]; })
			  .attr("y2", function (d) { return pointsBetween(d.source, d.target)[1][1]; });

			vis.selectAll("g.node").attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

			if ($("#network").css("visibility") != "visible") {
				$("#network").css("visibility", "visible");
				$("#network").fadeIn();
				$("#zoomWidget").css("visibility", "visible");
			}
		}

	});


}