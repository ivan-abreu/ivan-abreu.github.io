var isMobile = false;
var defaultlanguage = '';
var changingLanguageURL = false;

var dbidquestionnaire = "33ff13f0-b445-11eb-bed0-67f1e9864943";
var dbidcandidate = "";
var dbidCompetencie = "";

var activepage = "";
var targetpage = "unboarding"; // "radialdiagram"; //"unboarding";
var pages = ['questionnaires', 'recommendedcontent'];

var competenciaactiva = -1;
var estado = 0;
var idCompetencie = "";
var fullnameCompetencie = "";
var anchorCompetencie = "";
var indexCompetencie;
var currentCompetencie;

var questionnaireJson;
var currentQuestionJson;

var pathTotalLengthOptionsIndicator = 0;
var pathTotalLengthFracOptionsIndicator = 0; 

var scrolling = false;
var allCompetenciesCompleted = false;
var numCompetenciesCompleted = 0;
var totalCompetencies = 0;

var inTransition = false;


// var iconsSvgs = [
// 	{file:'informacionymanejodedatos.svg',idonradial:'#A1', id: "33d6a460-b445-11eb-bed0-67f1e9864943", idc:"c1" },
// 	{file:'comunicacionycolaboracion.svg',idonradial:'#A2', id: "33df56f8-b445-11eb-bed0-67f1e9864943", idc:"c2"},
// 	{file:'creaciondecontenidodigital.svg',idonradial:'#A3',id: "33e01a47-b445-11eb-bed0-67f1e9864943", idc:"c3" },
// 	{file:'gestiondeseguridad.svg',idonradial:'#A4', id: "33e2d967-b445-11eb-bed0-67f1e9864943", idc:"c4"},
// 	{file:'resoluciondeproblemas.svg',idonradial:'#A5', id: "33e5e6a8-b445-11eb-bed0-67f1e9864943", idc:"c5"},
// 	{file:'innovacion.svg',idonradial:'#A6', id: "33e857aa-b445-11eb-bed0-67f1e9864943", idc:"c6"},
// 	{file:'tecnologia.svg',idonradial:'#A7', id: "33ec4f45-b445-11eb-bed0-67f1e9864943", idc:"c7"},
// 	{file:'formasdetrabajo.svg',idonradial:'#A8', id: "33f32d18-b445-11eb-bed0-67f1e9864943", idc:"c8"},
// 	{file:'madurezyresponsabilidad.svg',idonradial:'#A9', id: "33fc2dc6-b445-11eb-bed0-67f1e9864943", idc:"c9"}
// ]

var iconsSvgs = [
	{file:'informacionymanejodedatos.svg',idonradial:'#A1', id: "33d6a460-b445-11eb-bed0-67f1e9864943", idc:"c1" },
	{file:'comunicacionycolaboracion.svg',idonradial:'#A2', id: "33df56f8-b445-11eb-bed0-67f1e9864943", idc:"c2"},
	{file:'gestiondeseguridad.svg',idonradial:'#A3', id: "33e2d967-b445-11eb-bed0-67f1e9864943", idc:"c3"},
	{file:'resoluciondeproblemas.svg',idonradial:'#A4', id: "33e5e6a8-b445-11eb-bed0-67f1e9864943", idc:"c4"},
	{file:'innovacion.svg',idonradial:'#A5', id: "33e857aa-b445-11eb-bed0-67f1e9864943", idc:"c5"},
	{file:'tecnologia.svg',idonradial:'#A6', id: "33ec4f45-b445-11eb-bed0-67f1e9864943", idc:"c6"},
	{file:'formasdetrabajo.svg',idonradial:'#A7', id: "33f32d18-b445-11eb-bed0-67f1e9864943", idc:"c7"},
	{file:'madurezyresponsabilidad.svg',idonradial:'#A8', id: "33fc2dc6-b445-11eb-bed0-67f1e9864943", idc:"c8"},
	{file:'creaciondecontenidodigital.svg',idonradial:'#A9',id: "33e01a47-b445-11eb-bed0-67f1e9864943", idc:"c9" }
]


var submitquestion = {
						"answer": {
							"userId": "",
							"competenceId": "",
							"questionId": "",
							"answerableType": "", //  "RatingScale" "MultipleOption"
							"options": [],
							"ratingScales":[]
						}
					}

var pathsTotalLengthOptionsIndicator = [];
pathsTotalLengthOptionsIndicator[0] = 0;
pathsTotalLengthOptionsIndicator[1] = 1.548763632774353;
pathsTotalLengthOptionsIndicator[2] = 3.0975279808044434;

pathsTotalLengthOptionsIndicator[3] = 4.646606922149658;
pathsTotalLengthOptionsIndicator[4] = 6.19547700881958;
pathsTotalLengthOptionsIndicator[5] = 7.74434757232666;
pathsTotalLengthOptionsIndicator[6] = 9.293217658996582;

pathsTotalLengthOptionsIndicator[7] = 10.841344833374023;
pathsTotalLengthOptionsIndicator[8] = 12.390109062194824;
pathsTotalLengthOptionsIndicator[9] = 13.938871383666992;
pathsTotalLengthOptionsIndicator[10] = 15.48763370513916;
pathsTotalLengthOptionsIndicator[11] = 17.03639793395996;


var veces = 0;

function removeScrollMagicUnboarding() {
	$(document).off("scroll");
	sceneHeader.removeClassToggle()
	sceneFor.removeClassToggle();
}



function parseURL() {
	
	var newUrl = new URL(location);
	var search_params = newUrl.searchParams;

	const urlSearch = window.location.search;
	const urlParams = new URLSearchParams(urlSearch);

	// remove hash char
	let regex = /^#/;
	const urlHash =  window.location.hash;
	const urlHashClean = urlHash.replace(regex, '')

	// chack uid candidate
	if (  urlParams.get('uid') != null ) {

		// identify candidate
		dbidcandidate = urlParams.get('uid');

		// identify language
		if (  urlParams.get('defaultlanguage') != null && (urlParams.get('defaultlanguage') == 'es' || urlParams.get('defaultlanguage') == 'en' ) ) {
			defaultlanguage = urlParams.get('defaultlanguage');
		} else if ( defaultlanguage == 'es' || defaultlanguage == 'en' ) {	
			search_params.set('defaultlanguage', defaultlanguage);
			newUrl.search = search_params.toString();		
		} else {
			defaultlanguage = 'es';
			search_params.set('defaultlanguage', defaultlanguage);
			newUrl.search = search_params.toString();
		}

		// identidify competencie, BUT, only for questionnaires or recommendedcontent sections
		if (  urlParams.get('cid') != null && ( urlHashClean == 'questionnaires' || urlHashClean == 'recommendedcontent' )  ) {
			dbidCompetencie = urlParams.get('cid');
		} 

		// identify section
		if ( urlHash == '' || ! pages.includes(  urlHashClean ) ) {
			newUrl.hash =  'unboarding';
		} 


		// check that the URL contain everthing tha we need
		if ( urlParams.get('defaultlanguage') == null 
			 || urlParams.get('defaultlanguage') == null
			 || urlHash == '') {
			// ativate popState Event (History)
			window.location = newUrl;
		} else {

			targetpageName = urlHashClean;
			targetpage = `${urlHashClean}.html`;

			// modify menu
			$("#menu-mobile li:not(.inactivesection)").removeClass('currentpage');
			$(`#menu-mobile li[data-page="${targetpageName}"]`).addClass('currentpage');
			if ( estado == 1) $("#hamburger").trigger( "click" );	

			let pageURL = `pages/${targetpage}`;

			switch(activepage) {
			  case "unboarding.html":
			    $(document).off("scroll");
				sceneHeader.removeClassToggle()
				sceneFor.removeClassToggle();
			    break;
			  case "otra":
			    // code block
			    break;
			  default:
			    // code block
			}
			// switch(targetpage) {
			//   case "unboarding.html":
			//   	//$("body").css("background-color", `hsl(175,0%,100%)` );
			// 	//gsap.to(".mainheaderwrapper", {top:"-60px", duration: 2});
			//     break;
			//   case "otra":
			//     // code block
			//     break;
			//   default:
			//     // code block
			// }

			// finally load the section!!!!
			$("#mainwrapper").fadeOut( function() {
				$(window).scrollTop(0);
				$("#mainwrapper").load(pageURL, function() {
					activepage = targetpageName;
				  	$("#mainwrapper").fadeIn();
				})
			})

			setupLanguage();
		}
	
	} else {
		// warning NO candidate
		location.replace("wc/")
	}

}

$(document).ready( function() {

	$( '.selectpage' ).each(function( index ) {
	  pages.push( $( this ).data('page') );
	});

	console.log( pages );

	window.onpopstate = function(event) {
		// if ( changingLanguageURL ) {
		//   	event.preventDefault();
		//   	history.go(1);
		//   	changingLanguageURL = false;
		//  } else {
		 	parseURL();
		 // }
		//
	};

	parseURL();


	setupLanguage();
	

	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
	  isMobile = true;
	}else{
	  isMobile = false;
	}

	// loadPage("unboarding");

	$( "body" ).delegate( "#menu-mobile .selectpage:not(.inactivesection)", "click", function() {
		// if ($( "#mydiv" ).hasClass( "bar" ) )
		if ( $(this).data("competenciaid") ) anchorCompetencie = '#'+$(this).data("competenciaid");
		// $(this).addClass('currentpage');

		// setTimeout( function(){ 
		// 	$("#hamburger").trigger( "click" ); 
		// }, 500);

		// $("#hamburger").trigger( "click" );
		loadPage($(this).data("page"))	
	})

	$(".selectlang").click( function() {
		changingLanguageURL = true;
		$(".selectlang").removeClass("selectedlang");
		$(this).addClass("selectedlang");
		defaultlanguage = $(this).data("lang");
		if ( defaultlanguage == "es") {
			gsap.to("#langindicator #flecha", {rotation:0, transformOrigin:"80% 50%", duration: 1});
		} else {
			gsap.to("#langindicator #flecha", {rotation:180, transformOrigin:"80% 50%", duration: 1});
		}
		// changeLanguage( defaultlanguage );

		var newUrl = new URL(location);
		var search_params = newUrl.searchParams;
		search_params.set('defaultlanguage', defaultlanguage);
		newUrl.search = search_params.toString();
		window.location = newUrl;


		setTimeout( function(){ 
			$("#hamburger").trigger( "click" ); 
			// var newUrl = new URL(location);

			// var search_params = newUrl.searchParams;
			// if ( defaultlanguage != "" ) search_params.set('defaultlanguage', defaultlanguage);
			// newUrl.search = search_params.toString();

			// newUrl.hash =  targetpage;

			// window.location = newUrl;
		}, 800);
	})

	
	$("#hamburger").click(function() {
	  var delay_time = 0;

	  if (estado === 0) {
	  	$("#menu-mobile ul").css("pointer-events", "initial");
	    TweenMax.to($("#bg-menu-mobile"), 1, {
	      x:'-100%',
	      ease: Expo.easeInOut
	    });
	    
	    $("li").each(function() {
	      TweenMax.to($(this), 1.2, {
	        x:'-100%',
	        delay: delay_time,
	        ease: Expo.easeInOut
	      });
	      delay_time += .04;
	    });
	    estado = 1;
	  } else {
	  	$("#menu-mobile ul").css("pointer-events", "none");
	    estado = 0;
	    TweenMax.to($("#bg-menu-mobile"), 1.2, {
	      x:0,
	      ease: Expo.easeInOut
	    });
	    $("li").each(function() {
	      TweenMax.to($(this), 1, {
	        x:0,
	        delay: delay_time,
	        ease: Expo.easeInOut
	      });
	      delay_time += .02;
	    });
	  }
	});
})


function loadPage(targetpage) {
	var newUrl = new URL(location);

	var search_params = newUrl.searchParams;
	if ( search_params.has('cid') ) search_params.delete('cid')
	newUrl.hash =  targetpage;

	window.location = newUrl;
}

function loadPageCompetencie(targetpage, targetcompetencie) {
	var newUrl = new URL(location);

	var search_params = newUrl.searchParams;
	search_params.set('cid', targetcompetencie);

	newUrl.search = search_params.toString();

	newUrl.hash =  targetpage;

	window.location = newUrl;
}

function setupLanguage() {
	$(".selectlang").removeClass("selectedlang");
	$(`.selectlang[data-lang="${defaultlanguage}"]`).addClass("selectedlang");
	//defaultlanguage = defaultlanguage;
	if ( defaultlanguage == "es") {
		gsap.to("#langindicator #flecha", {rotation:0, transformOrigin:"80% 50%", duration: 0});
	} else {
		gsap.to("#langindicator #flecha", {rotation:180, transformOrigin:"80% 50%", duration: 0});
	}

	

	//changeLanguage( defaultlanguage );
}

function changeLanguage( lang ) {
	$( "*[data-es]").each(function( index ) {
	  $( this ).html( $( this ).data(lang) ) ;
	});
}


function drawPieChart(element, percent, width, height, cx, cy, duration,delayP, textsvgpercent) {
	width = typeof width !== 'undefined' ? width : 290;
	height = typeof height !== 'undefined' ? height : 290;
	text_y = typeof text_y !== 'undefined' ? text_y : "-.10em";

	var dataset = {
	    lower: calcPercent(100),
	    upper: calcPercent(percent)
	  },
	  radius = Math.min(width, height) / 2,
	  pie = d3.layout.pie().sort(null),
	  format = d3.format(".0%");

	var arc = d3.svg.arc()
	    .innerRadius(0)
	    .outerRadius(radius);

	var svg = d3.select(element)
	     .append("g")
	     .attr("class","pie" )
	     .attr("transform", "translate(" + cx + "," + cy + ") rotate(0 0 0)");

	var path = svg.selectAll("path")
	    .data(pie(dataset.lower))
	    .enter().append("path")
	    .attr("class", function(d, i) { return `color${i} rebanada` })
	    .attr("d", arc)
	    //.attr("transform", "translate(" + cx + "," + cy + ") rotate(0 0 0)");
	    .each(function(d) { this._current = d; }); 

	var progress = 0;
	let timeout = setTimeout(function () {
	  clearTimeout(timeout);
	  path = path.data(pie(dataset.upper)); 
	  path.transition().duration(duration).attrTween("d", function (a) {
	    var i  = d3.interpolate(this._current, a);
	    var i2 = d3.interpolate(progress, percent)
	    this._current = i(0);
	    return function(t) {
	      d3.select(textsvgpercent).text( format(i2(t) / 100) );
	      return arc(i(t));
	    };
	  }); 
	}, delayP);
};


function updatePieChart(element, percent, textsvgpercent) {

	let updatedProgress = calcPercent(percent),
	    pie = d3.layout.pie().sort(null),
	    format = d3.format(".0%"),
	    radius = 67/2;


	piedata = pie(updatedProgress)
	d3.select(element).selectAll(".rebanada").remove();
	d3.select(textsvgpercent).text( format(percent/100) );

	let arc = d3.svg.arc()
	    .innerRadius(0)
	    .outerRadius(radius);

	d3.select(element).select(".pie").selectAll("path")
        .data(piedata)
        .enter()
        .append("path")
		.attr("class", function(d, i) { return `color${i} rebanada` } )
		.attr("d", arc)
};


function calcPercent(percent) {

	return [percent, 100-percent];
};

function removeUniqueValueInArray(array, value) {
	console.log( array )
	let index = array.findIndex( (v) => v == value );
	array.splice(index, 1);
	console.log( array )
	if  ( index != -1 ) {
		return true;
	} else {
		return false;
	}
}


function firstWordAndRestMatrixLang(es, en) {
	let matrix = { "es":[] ,"en":[] };
	let esList = es.split(" ")
	let enList = en.split(" ")
	matrix.es[0] = esList[0]+" ";
	matrix.en[0] = enList[0]+" ";
	esList.shift();
	enList.shift();
	matrix.es[1] = esList.join(" ");
	matrix.en[1] = enList.join(" ");
	return matrix;
}

function getLerpColor(num, min, max, color1, color2) {
  let normValue = map(num, min, max, 0, 1);
  return d3.interpolateRgb(color1, color2)(normValue) ;
}

function multipleOptionExclusive(currentQuestionJson) {

	console.log( "###########################")
	console.log( currentQuestionJson )
	console.log( "###########################")

	submitquestion.answer.questionId = currentQuestionJson.id;
	submitquestion.answer.answerableType = currentQuestionJson.questionable_type;
	//submitquestion.answer.userId = currentQuestionJson.candidate_id;
	// submitquestion.answer.options = []
	// submitquestion.answer.ratingScales = []


	d3.select('.skilltitle')
		.style('padding-left', '0.0rem');

	let alturaOptionSvg = 10;
	let y1 = 0.55, y2 = 0.7, y3 = 0.28;
	let q = "M0,0 "
	$(".questionindicator").empty();
	// $("#scrollpositionwrapper").empty();

	let indicatorE   = `<svg version="1.1" class="indicator" id="indicator" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48" style="enable-background:new 0 0 48 48;" xml:space="preserve" >`;
		indicatorE  += `	<g id="scrollpositionwrapper" transform="translate(24,5) scale(40)" ></g>`;
		indicatorE  += `</svg>`;

	$(".questionindicator").append( indicatorE );

	// APPEND OPTIONS
	currentQuestionJson.questionable.options.forEach( (o,i) => {

		//  OPTION FOR SELECTION 
		let optionE  = `<div class="option" data-rect="c${i+1}" data-palomita="p${i+1}" data-iddb="${o.id}" >`
			// optionE += `	<div class="optionnumber disable-select">${i+1}</div>`
			optionE += `	<div class="checkbox">`
			optionE += `		<svg version="1.1" id="checkboxsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="124.5px" height="124.5px" viewBox="0 0 124.5 124.5" style="enable-background:new 0 0 124.5 124.5;" xml:space="preserve" >`
			optionE += `			<circle id="rectrengro" cx="62.25" cy="62.25" r="62.25"/>`
			optionE += `			<circle id="rectamarillo" cx="62.25" cy="62.25" r="35.2" style="fill:#FFB419;" />`
			optionE += `			<polyline id="palomita" class="palomitaoption" style="fill:none;stroke:#FFB419;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" points="36.1,79.4 61.6,96.6 91.3,27 "/>`
			optionE += `		</svg>`
			optionE += `	</div>`
			optionE += `	<div class="optiontext disable-select" data-es="${o.content.es}" data-en="${o.content.en}" >${o.content[defaultlanguage]}</div>`
			optionE += `</div>`

		$(".options").append(optionE);

		if ( i%2 == 0)  {
			q += `C-0.25,${i+0} -0.5,${i+0.25} -0.5,${i+0.5} C-0.5,${i+0.75} -0.25,${i+1} 0,${i+1} ` // 1
		} else {
			q += `C0.25,${i+0} 0.5,${i+0.25} 0.5,${i+0.5} C0.5,${i+0.75} 0.25,${i+1} 0,${i+1} ` // 1
		}
		alturaOptionSvg +=40;
		
		d3.select("#scrollpositionwrapper")
			.append("circle")
			.attr("cx",0)
			.attr("cy", (0.5 + i) )
			.attr("r",0.20) 
			.attr("fill","#ffb419")
			.attr("id",`c${i+1}`)
			.attr("class", "noselected");


		d3.select("#scrollpositionwrapper")
			.append("polyline")
			.attr("points", `-0.2,${y1} -0.035,${y2} 0.2,${y3}`)
			.attr("fill","none")
			.attr("stroke","#000000")
			.attr("stroke-width", "0.1" )
			.attr("class", "selected")
			.attr("id", `p${i+1}`);

			y1 += 1;
			y2 += 1;
			y3 += 1; 

	})

	d3.select("svg.indicator")
		.attr("height", alturaOptionSvg)
		.attr("viewBox", `0 0 44 ${alturaOptionSvg}` )
		.attr("style",  `enable-background:new 0 0 48 ${alturaOptionSvg}`);
	d3.select("#scrollpositionwrapper")
		.append( "path")
		.attr( "id","avance")
		.attr( "fill","none")
		.attr( "stroke","#000000")
		.attr( "stroke-width", "0.12" )
		.attr("d", q);

	pathTotalLengthOptionsIndicator = pathsTotalLengthOptionsIndicator[currentQuestionJson.questionable.options.length]; // document.getElementById("avance").getTotalLength()

	pathTotalLengthFracOptionsIndicator = pathTotalLengthOptionsIndicator - (pathTotalLengthOptionsIndicator / (currentQuestionJson.questionable.options.length) );

	$(".questionindicator svg #avance").css("stroke-dasharray", `${pathTotalLengthOptionsIndicator}`);
	$(".questionindicator svg #avance").css("stroke-dashoffset", `${pathTotalLengthFracOptionsIndicator}`);


	pathTotalLengthPalomitaIndicator = 0.7042653560638428; 
	pathTotalLengthFracPalomitaIndicator = 0;


	$(".questionindicator svg .selected").css("stroke-dasharray", `${pathTotalLengthPalomitaIndicator} 1.0`);
	$(".questionindicator svg .selected").css("stroke-dashoffset", `${pathTotalLengthPalomitaIndicator}`);

	// ANIMATE UX CLICK OPTION
	d3.selectAll(".option").on("click", function() {
		if ( !inTransition ) {
			inTransition = true;
			setTimeout( () => inTransition = false , 900);
			var iddboption = d3.select(this).attr("data-iddb")
			
			// BIG OPTIONS
			d3.selectAll(".option").classed( "selectedoption", false);
			gsap.to( d3.selectAll(".palomitaoption")  , {"stroke-dashoffset": "100%", duration: 0.4, delay:0.0});
	        gsap.to( d3.selectAll("#rectamarillo")  , {opacity: 1.0, duration: 0.0, delay:0.0});

			// gsap.to( d3.select(".questionindicator svg").selectAll(".noselected")  , {opacity: 1.0, duration: 0.4, delay:0.0});
	  //       gsap.to( d3.select(".questionindicator svg").select( ".selected")  , {"stroke-dashoffset": "100%", duration: 0.4, delay:0.4});
	  		

	        gsap.to( d3.select(".questionindicator svg").selectAll( ".selected" )  , {"stroke-dashoffset": pathTotalLengthPalomitaIndicator, duration: 0.0, delay:0.0});
	        gsap.to( d3.select(".questionindicator svg").selectAll(".noselected")  , {opacity: 1.0, duration: 0.0, delay:0.0});
			

	        d3.select(this).classed( "selectedoption", !d3.select(this).classed("selectedoption") );

	        let rectindicator = `#${d3.select(this).attr("data-rect")}` 
	        let palomitaindicator = `#${d3.select(this).attr("data-palomita")}`  

	        if ( d3.select(this).classed("selectedoption")  ) {
	        	
	        	// window.navigator.vibrate(300); 

	        	gsap.to( d3.select(this).select("#rectamarillo")  , {opacity: 0.0, duration: 0.4, delay:0.0});
	        	gsap.to( d3.select(this).select(".palomitaoption")  , {"stroke-dashoffset": "0%", duration: 0.4, delay:0.4});

	        	 	
	        	gsap.to( d3.select(".questionindicator svg").select(rectindicator)  , {opacity: 0.0, duration: 0.4, delay:0.0});
	        	gsap.to( d3.select(".questionindicator svg").select( palomitaindicator)  , {"stroke-dashoffset": 0, duration: 0.4, delay:0.4});

	        	// enviar
	        	gsap.to( "#submitoption"  , {"top": "calc( 50% - 72px )", duration: 0.8, delay:0.1});

	        } else {
	        	
	        	// gsap.to( d3.select(".questionindicator svg").selectAll( ".selected" ).kill();


	        	gsap.to( d3.select(this).select(".palomitaoption")  , {"stroke-dashoffset": "100%", duration: 0.4, delay:0.0});
	        	gsap.to( d3.select(this).select("#rectamarillo")  , {opacity: 1.0, duration: 0.4, delay:0.4});

	        	gsap.to( d3.select(".questionindicator svg").select( palomitaindicator)  , {"stroke-dashoffset": pathTotalLengthPalomitaIndicator, duration: 0.4, delay:0.0});
	        	// gsap.to( d3.select(".questionindicator svg").select( palomitaindicator)  , {"stroke-dashoffset": pathTotalLengthPalomitaIndicator, duration: 0.4, delay:0.0});
	        	gsap.to( d3.select(".questionindicator svg").select(rectindicator)  , {opacity: 1.0, duration: 0.4, delay:0.4});
	        	
	        	if ( $(".selectedoption").length == 0 ) gsap.to( "#submitoption"  , {"top": "calc( 50% - 288px )", duration: 0.8, delay:0.1});

	        }
	    }
     });
}

function multipleOptionInclusive(currentQuestionJson) {

	console.log( "###########################")
	console.log( currentQuestionJson )
	console.log( "###########################")
	submitquestion.answer.questionId = currentQuestionJson.id;
	submitquestion.answer.answerableType = currentQuestionJson.questionable_type;
	//submitquestion.answer.userId = currentQuestionJson.candidate_id;
	// submitquestion.answer.options = []
	// submitquestion.answer.ratingScales = []


	d3.select('.skilltitle')
		.style('padding-left', '0.0rem');

	let alturaOptionSvg = 10;
	let y1 = 0.55, y2 = 0.7, y3 = 0.28;
	let q = "M0,0 ";
	$(".questionindicator").empty();
	// $("#scrollpositionwrapper").empty();

	let indicatorE   = `<svg version="1.1" class="indicator" id="indicator" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48" style="enable-background:new 0 0 48 48;" xml:space="preserve" >`;
		indicatorE  += `	<g id="scrollpositionwrapper" transform="translate(24,5) scale(40)" ></g>`;
		indicatorE  += `</svg>`;

	$(".questionindicator").append( indicatorE );
	// APPEND OPTIONS
	currentQuestionJson.questionable.options.forEach( (o,i) => {
		let optionE  = `<div class="option" data-rect="c${i+1}" data-palomita="p${i+1}" data-iddb="${o.id}"  >`
			// optionE += `	<div class="optionnumber disable-select">${i+1}</div>`
			optionE += `	<div class="checkbox">`
			optionE += `		<svg version="1.1" id="checkboxsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="124.5px" height="124.5px" viewBox="0 0 124.5 124.5" style="enable-background:new 0 0 124.5 124.5;" xml:space="preserve" >`
			optionE += `			<rect id="rectrengro" width="124.5" height="124.5"/>`
			optionE += `			<rect id="rectamarillo" x="27" y="27" style="fill:#FFB419;" width="70.4" height="70.4"/>`
			optionE += `			<polyline id="palomita" class="palomitaoption" style="fill:none;stroke:#FFB419;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" points="36.1,79.4 61.6,96.6 91.3,27 "/>`
			optionE += `		</svg>`
			optionE += `	</div>`
			optionE += `	<div class="optiontext disable-select" data-es="${o.content.es}" data-en="${o.content.en}" >${o.content[defaultlanguage]}</div>`
			optionE += `</div>`

		$(".options").append(optionE)


		if ( i%2 == 0)  {
			q += `C-0.25,${i+0} -0.5,${i+0.25} -0.5,${i+0.5} C-0.5,${i+0.75} -0.25,${i+1} 0,${i+1} ` // 1
		} else {
			q += `C0.25,${i+0} 0.5,${i+0.25} 0.5,${i+0.5} C0.5,${i+0.75} 0.25,${i+1} 0,${i+1} ` // 1
		}
		alturaOptionSvg +=40;

		d3.select("#scrollpositionwrapper")
			.append("rect")
			.attr("x", -0.2 )
			.attr("y", (0.3 + i) )
			.attr("width",0.4)
			.attr("height",0.4)
			.attr("fill","#ffb419")
			.attr("id",`c${i+1}`)
			.attr("class", "noselected");


		d3.select("#scrollpositionwrapper")
			.append("polyline")
			.attr("points", `-0.2,${y1} -0.035,${y2} 0.2,${y3}`)
			.attr( "fill","none")
			.attr( "stroke","#000000")
			.attr( "stroke-width", "0.1" )
			.attr("class", "selected")
			.attr("id", `p${i+1}`);


			y1 += 1;
			y2 += 1;
			y3 += 1; 
	})

	d3.select("svg.indicator")
		.attr("height", alturaOptionSvg)
		.attr("viewBox", `0 0 44 ${alturaOptionSvg}` );
	d3.select("#scrollpositionwrapper")
		.append( "path")
		.attr( "id","avance")
		.attr( "fill","none")
		.attr( "stroke","#000000")
		.attr( "stroke-width", "0.12" )
		.attr("d", q);


	pathTotalLengthOptionsIndicator = pathsTotalLengthOptionsIndicator[currentQuestionJson.questionable.options.length]; //document.getElementById("avance").getTotalLength()
	pathTotalLengthFracOptionsIndicator = pathTotalLengthOptionsIndicator - (pathTotalLengthOptionsIndicator / (currentQuestionJson.questionable.options.length) );

	$(".questionindicator svg #avance").css("stroke-dasharray", `${pathTotalLengthOptionsIndicator}`);
	$(".questionindicator svg #avance").css("stroke-dashoffset", `${pathTotalLengthFracOptionsIndicator}`);

	pathTotalLengthPalomitaIndicator = 0.6817406415939331; // document.getElementById("p1").getTotalLength()
	pathTotalLengthFracPalomitaIndicator = 0;

	$(".questionindicator svg .selected").css("stroke-dasharray", `${pathTotalLengthPalomitaIndicator} 1.0`);
	$(".questionindicator svg .selected").css("stroke-dashoffset", `${pathTotalLengthPalomitaIndicator}`);



	// ANIMATE UX CLICK OPTION
	d3.selectAll(".option").on("click", function() {

		var iddboption = d3.select(this).attr("data-iddb")
		console.log( iddboption)
        d3.select(this).classed( "selectedoption", !d3.select(this).classed("selectedoption") );

        let rectindicator = `#${d3.select(this).attr("data-rect")}` 
        let palomitaindicator = `#${d3.select(this).attr("data-palomita")}`  

        if ( d3.select(this).classed("selectedoption")  ) {  // selecciona ahora
        	
        	// window.navigator.vibrate(300); 

        	gsap.to( d3.select(this).select("#rectamarillo")  , {opacity: 0.0, duration: 0.4, delay:0.0});
        	gsap.to( d3.select(this).select(".palomitaoption")  , {"stroke-dashoffset": "0%", duration: 0.4, delay:0.4});

        	 	
        	gsap.to( d3.select(".questionindicator svg").select(rectindicator)  , {opacity: 0.0, duration: 0.4, delay:0.0});
        	gsap.to( d3.select(".questionindicator svg").select( palomitaindicator)  , {"stroke-dashoffset": 0, duration: 0.4, delay:0.4});

        	// enviar
        	gsap.to( "#submitoption"  , {"top": "calc( 50% - 72px )", duration: 0.8, delay:0.1});


        } else {
        	gsap.to( d3.select(this).select(".palomitaoption")  , {"stroke-dashoffset": "100%", duration: 0.4, delay:0.0});
        	gsap.to( d3.select(this).select("#rectamarillo")  , {opacity: 1.0, duration: 0.4, delay:0.4});

        	gsap.to( d3.select(".questionindicator svg").select( palomitaindicator)  , {"stroke-dashoffset": pathTotalLengthPalomitaIndicator, duration: 0.4, delay:0.0});
        	gsap.to( d3.select(".questionindicator svg").select(rectindicator)  , {opacity: 1.0, duration: 0.4, delay:0.4});
        	
        	// oculta enviar
        	if ( $(".selectedoption").length == 0 ) gsap.to( "#submitoption"  , {"top": "calc( 50% - 288px )", duration: 0.8, delay:0.1});

        }
    	
     });
}

function ratingScaleMobile(currentQuestionJson)  {

	let alturaOptionSvg = 10; // 10
	let y1 = 0.55, y2 = 0.7, y3 = 0.28;
	let q = "M0,0 "
	$(".questionindicator").empty();
	// $("#scrollpositionwrapper").empty();

	let indicatorE   = `<svg version="1.1" class="indicator" id="indicator" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="85px" height="48px" style="enable-background:new 0 0 85 48;" xml:space="preserve" viewBox="0 0 85 48" >`;
		indicatorE  += `	<g id="scrollpositionwrapper" transform="translate(43,5) scale(20)"></g>`;
		indicatorE  += `</svg>`;


	$(".questionindicator").append( indicatorE );

	// CALCULATE SCALE VISUALIZATION 
	var width_dv_rating = 600;
	var gap_module = 10;
	var width_module = (width_dv_rating / currentQuestionJson.questionable.scales.length) - gap_module;
	var distribution = (width_dv_rating+gap_module) / currentQuestionJson.questionable.scales.length;
	var divisionsObj = [];
	for (let i = 0; i < currentQuestionJson.questionable.scales.length; i++) {
		let division = Math.floor( map(i, 0, currentQuestionJson.questionable.scales.length-1, 1, 20) );
		let width_divisions = width_module / division;
		divisionsObj[i] = [];
		for (let j = 0; j < division; j++) {
			divisionsObj[i].push( width_divisions );
		}	
	}

	d3.select('.skilltitle')
		.style('padding-left', '0.6rem')
		.classed( 'disable-select', true)

	d3.select('.question')
		.text( currentQuestionJson.name[defaultlanguage] )
		.attr('data-iddb', currentQuestionJson.id )
		.style('padding-left', '0.6rem')
		.classed( 'disable-select', true)


	//////////////////////////////////


	currentQuestionJson.questionable.labels.forEach( (o,ilabel) => {

		let optionE  = `<div class="option label" data-iddb=${o.id} ) >`
				// optionE += `	<div class="labelnumber disable-select">${ilabel+1}</div>`
				optionE += `	<div class="wrappersliderscaleindicator">`
				optionE += `		<svg class="disable-select sliderscaleindicator disable-select" id="sliderscaleindicator${ilabel+1}" width="600" height="200" viewBox="0 0 600 200" style="enable-background:new 0 0 600 200;" xml:space="preserve">`
				optionE += `		</svg>`
				optionE += `	</div>`
				optionE += `	<div class="labeltext disable-select"  data-es="${ o.content.es }" data-en="${  o.content.en}" >${ o.content[defaultlanguage]}</div>`
				optionE += `</div>`

		$(".options").append(optionE);


		/////////////////////////////


		d3.select(`#sliderscaleindicator${ilabel+1}`)
		 	.on("touchstart", touchStatusStart)
    		.on("touchend", touchStatusEnd)
    		.attr('data-rectclass', (d,i) => `.rect_label${o.id}` )
			.attr('data-circleclass', (d,i) => `.circle_label${o.id}` )
        	.selectAll('g')
			.data(currentQuestionJson.questionable.scales)
			.enter()
			.append('g')
			.attr("id", (d,i) => `g${i}` )
			.attr('data-iddb', (d,i) => d.id )
			.attr('data-rect', (d,i) => `#rect_label${o.id}scale${d.id}` )
			.attr('data-circle', (d,i) => `#circle_label${o.id}scale${d.id}` )
			.attr('data-height', 100 )
			.attr('data-y', 100 )
			.classed('scale', true)
			.attr('data-fill', (d,i) => getLerpColor(i, 0, currentQuestionJson.questionable.scales.length-1, '#b73cff', '#001488') )
			.attr('transform', (d,i)=>{

				d3.select(`#sliderscaleindicator${ilabel+1} #g${i}`).selectAll('rect')
				 	.data(divisionsObj[i])
				 	.enter()
				 	.append('rect')
					.attr('width', d => d-2)
					.attr('height', 100)
					.attr('x', (d,j)=>{
						return j*(d+0.4);
					})
					.attr('y', 100)
					.attr('fill', (d,k) => getLerpColor(i, 0, currentQuestionJson.questionable.scales.length-1, '#b73cff', '#001488') )
					.attr('class', 'barras')
					

				d3.select(`#sliderscaleindicator${ilabel+1} #g${i}`)
					.append('rect')
					.attr('width', 122)
					.attr('height', 200)
					.attr('x', 0)
					.attr('y', 0)
					.attr('opacity', '0.0' )

				return `translate(${distribution*i},0)`;
			})



			var d;
			var touche_g = {}
			var prev_num_g = -1;
			var prev_num_g_i = -1;
			var touchTimeout;

			function touchStatusStart() {
				let id = d3.select(this).attr('id');
				d3.select(".scrollingobserver").text( "starting " + id );
				d = Math.round(d3.touches(this)[0][0]);
				touchTimeout = 	setTimeout( function() {				
									if (!scrolling) {
										
										
										var num_g = Math.floor(d / distribution);

										// d3.select(".scrollingobserver").text( "startinggggg " + d ); 

										d3.selectAll(".scaleindicator")
											.transition()
						            		.ease("cubic-out")
						            		.duration("400")
											.style("opacity", "1.0");

										if ( prev_num_g != num_g ) {
											for(let i=0; i<currentQuestionJson.questionable.scales.length; i++ ) {
												if ( num_g == i ) {
													d3.select(`#${id}`).select(`#g${i}`).selectAll('.barras')
														.transition()
														.ease("cubic-out")
														.duration("200")
														.attr({
																y: 0,
																height: 200
														});

													size_circle = map(i, 0, currentQuestionJson.questionable.scales.length-1, 0, 220);
													sizehalf_circle = Math.floor(size_circle/2);
													d3.select('.rankingcircle')
														.style('width',  `${size_circle}px`)
														.style('height',  `${size_circle}px`)
														.style('border-radius',  `${sizehalf_circle}px`)
														.style('left', `calc( 50% - ${sizehalf_circle}px )` )
														.style('top', `calc( 180px - ${sizehalf_circle}px )` );


													d3.select('.rankingname').text( currentQuestionJson.questionable.scales[i].content.es )

												} else {
													d3.select(`#${id}`).select(`#g${i}`).selectAll('.barras')
														.transition()
														.ease("cubic-out")
														.duration("200")
														.attr({
																y: 100,
																height: 100
														});

												}
											}
										}
										prev_num_g = num_g;

										d3.select(`#${id}`).on("touchmove", touchStatusMove)
									} 
								}, 500)
				
			}

			function touchStatusEnd() {
				let id = d3.select(this).attr('id');
				clearTimeout( touchTimeout );
				if ( !scrolling  ) {

					d3.event.preventDefault();
					d3.event.stopPropagation();

					num_g = Math.floor(d / distribution);

					d3.selectAll(".scaleindicator")
						.transition()
	            		.ease("cubic-out")
	            		.duration("200")
						.style("opacity", "1.0");

					if ( prev_num_g != num_g ) {
						for(let i=0; i<currentQuestionJson.questionable.scales.length; i++ ) {
							if ( num_g == i ) {
								d3.select(`#${id}`).select(`#g${i}`).selectAll('.barras')
									.transition()
									.ease("cubic-out")
									.duration("200")
									.attr({
											y: 0,
											height: 200
									});

								size_circle = map(i, 0, currentQuestionJson.questionable.scales.length-1, 0, 220);
								sizehalf_circle = Math.floor(size_circle/2);
								d3.select('.rankingcircle')
									.style('width',  `${size_circle}px`)
									.style('height',  `${size_circle}px`)
									.style('border-radius',  `${sizehalf_circle}px`)
									.style('left', `calc( 50% - ${sizehalf_circle}px )` )
									.style('top', `calc( 180px - ${sizehalf_circle}px )` );

								d3.select(`#${id} #g${i}`).classed('selectedscale', true);

								
								circleid = $( `#${id} #g${i}` ).data("circle") 
								gsap.to( circleid  , { attr:{r: 0.3225}, duration: 0.2 , delay: 0.0 } );

								if ( $(".selectedscale").length == $(".label").length ) {
									gsap.to( "#submitoption"  , {"top": "calc( 50% - 72px )", duration: 0.8, delay:0.1});	
								} else {
									gsap.to( "#submitoption"  , {"top": "calc( 50% - 288px )", duration: 0.8, delay:0.1});
								}
								
								// doing now

								d3.select('.rankingname').text( currentQuestionJson.questionable.scales[i].content.es )

							} else {
								d3.select(`#${id}`).select(`#g${i}`).selectAll('.barras')
									.transition()
									.ease("cubic-out")
									.duration("200")
									.attr({
											y: 100,
											height: 100
									});
								
								
								d3.select(`#${id} #g${i}`).classed('selectedscale', false);

								circleid = $( `#${id} #g${i}` ).data("circle") 
								gsap.to( circleid  , { attr:{r: 0.0}, duration: 0.2 , delay: 0.0 } );

								if ( $(".selectedscale").length == $(".label").length ) {
									gsap.to( "#submitoption"  , {"top": "calc( 50% - 72px )", duration: 0.8, delay:0.1});	
								} else {
									gsap.to( "#submitoption"  , {"top": "calc( 50% - 288px )", duration: 0.8, delay:0.1});
								}

							}
						}
					}
					prev_num_g = num_g;

				} 

				d3.select(this).on("touchmove", null)

				d3.selectAll(".scaleindicator")
					.transition()
            		.ease("cubic-out")
            		.duration("400")
            		.delay(800)
					.style("opacity", "0.0");
				
			}

			function touchStatusMove() {
				let id = d3.select(this).attr('id');
				d3.select(".scrollingobserver").text( scrolling );

				d3.event.preventDefault();
				d3.event.stopPropagation();

				d = Math.round(d3.touches(this)[0][0]);
				num_g = Math.floor(d / distribution);
				if ( prev_num_g != num_g ) {
					for(let i=0; i<currentQuestionJson.questionable.scales.length; i++ ) {
						if ( num_g == i ) {
							d3.select(`#${id}`).select(`#g${i}`).selectAll('.barras')
								.transition()
								.ease("cubic-out")
								.duration("200")
								.attr({
										y: 0,
										height: 200
								});

							size_circle = map(i, 0, currentQuestionJson.questionable.scales.length-1, 0, 220);
							sizehalf_circle = Math.floor(size_circle/2);
							d3.select('.rankingcircle')
								.style('width',  `${size_circle}px`)
								.style('height',  `${size_circle}px`)
								.style('border-radius',  `${sizehalf_circle}px`)
								.style('left', `calc( 50% - ${sizehalf_circle}px )` )
								.style('top', `calc( 180px - ${sizehalf_circle}px )` );

							d3.select(`#${id} #g${i}`).classed('selectedscale', true);

							d3.select(`#${id} #g${i}`).classed('selectedscale', true);

							circleid = $( `#${id} #g${i}` ).data("circle") 
							gsap.to( circleid  , { attr:{r: 0.3225}, duration: 0.2 , delay: 0.0 } );

							if ( $(".selectedscale").length == $(".label").length ) {
								gsap.to( "#submitoption"  , {"top": "calc( 50% - 72px )", duration: 0.8, delay:0.1});	
							} else {
								gsap.to( "#submitoption"  , {"top": "calc( 50% - 288px )", duration: 0.8, delay:0.1});
							}

							d3.select('.rankingname').text( currentQuestionJson.questionable.scales[i].content.es )

						} else {
							d3.select(`#${id}`).select(`#g${i}`).selectAll('.barras')
								.transition()
								.ease("cubic-out")
								.duration("200")
								.attr({
										y: 100,
										height: 100
								});

							d3.select(`#${id} #g${i}`).classed('selectedscale', false);

							d3.select(`#${id} #g${i}`).classed('selectedscale', false);

							circleid = $( `#${id} #g${i}` ).data("circle") 
							gsap.to( circleid  , { attr:{r: 0.0}, duration: 0.2 , delay: 0.0 } );

							if ( $(".selectedscale").length == $(".label").length ) {
								gsap.to( "#submitoption"  , {"top": "calc( 50% - 72px )", duration: 0.8, delay:0.1});	
							} else {
								gsap.to( "#submitoption"  , {"top": "calc( 50% - 288px )", duration: 0.8, delay:0.1});
							}
						}
					}
				}
				prev_num_g = num_g;
			}

		/////////////////////////////


		if ( ilabel%2 == 0)  {
			q += `C-0.25,${ilabel+0} -0.5,${ilabel+0.25} -0.5,${ilabel+0.5} C-0.5,${ilabel+0.75} -0.25,${ilabel+1} 0,${ilabel+1} ` // 1
		} else {
			q += `C0.25,${ilabel+0} 0.5,${ilabel+0.25} 0.5,${ilabel+0.5} C0.5,${ilabel+0.75} 0.25,${ilabel+1} 0,${ilabel+1} ` // 1
		}
		alturaOptionSvg += 20; //40;

		let rectOffsetX = 0.9;
		let rectStartX =  -2.0;
		let circleStartX =  rectStartX + 0.18; //(0.325 / 2);
		
		var rectI = ilabel;

		currentQuestionJson.questionable.scales.forEach( (oscale,iscale) => {

			d3.select("#scrollpositionwrapper")
				.append("rect")
				.attr("x", rectStartX + (iscale*rectOffsetX)   )
				.attr("y", 0.3 + rectI )
				// .attr("data-ver",  0.3 + rectI  )
				.attr("width",0.35)
				.attr("height",0.35)
				.attr("fill",  getLerpColor(iscale, 0, currentQuestionJson.questionable.scales.length-1, '#b73cff', '#001488') )
				.attr("id", `rect_label${o.id}scale${oscale.id}` )				
				.attr("data-iddb",  oscale.id  )
				.classed(`rect_label${o.id}` , true  )
				.classed("noselected", true);

			d3.select("#scrollpositionwrapper")
				.append("circle")
				.attr("cx", circleStartX + (iscale*rectOffsetX)   )
				.attr("cy", 0.5 + rectI )
				.attr("r",0.0) // 0.0 0.3225
				.attr("fill",  getLerpColor(iscale, 0, currentQuestionJson.questionable.scales.length-1, '#b73cff', '#001488') )
				.attr("id",  `circle_label${o.id}scale${oscale.id}`  )
				.attr("data-iddb",  oscale.id  )
				.classed(`circle_label${o.id}` , true  )
				.classed("noselected", true);

			})

		d3.select('.questionindicator').style('justify-content', 'start');

	})

	d3.select("svg.indicator")
		.attr("height", alturaOptionSvg)
		.attr("viewBox", `0 0 85 ${alturaOptionSvg}` );
	d3.select("#scrollpositionwrapper")
		.append( "path")
		.attr( "id","avance")
		.attr( "fill","none")
		.attr( "stroke","#000000")
		.attr( "stroke-width", "0.16" ) // 0.12
		.attr("d", q);


	pathTotalLengthOptionsIndicator = pathsTotalLengthOptionsIndicator[currentQuestionJson.questionable.labels.length]; //document.getElementById("avance").getTotalLength()
	pathTotalLengthFracOptionsIndicator = pathTotalLengthOptionsIndicator - (pathTotalLengthOptionsIndicator / (currentQuestionJson.questionable.labels.length) );

	$(".questionindicator svg #avance").css("stroke-dasharray", `${pathTotalLengthOptionsIndicator}`);
	$(".questionindicator svg #avance").css("stroke-dashoffset", `${pathTotalLengthFracOptionsIndicator}`);

	pathTotalLengthPalomitaIndicator = 0.6817406415939331; // document.getElementById("p1").getTotalLength()
	pathTotalLengthFracPalomitaIndicator = 0;

	$(".questionindicator svg .selected").css("stroke-dasharray", `${pathTotalLengthPalomitaIndicator}`);
	$(".questionindicator svg .selected").css("stroke-dashoffset", `${pathTotalLengthPalomitaIndicator}`);
}

function ratingScaleDesktop(currentQuestionJson) {

	let alturaOptionSvg = 10; // 10
	let y1 = 0.55, y2 = 0.7, y3 = 0.28;
	let q = "M0,0 "
	$(".questionindicator").empty();
	// $("#scrollpositionwrapper").empty();

	let indicatorE   = `<svg version="1.1" class="indicator" id="indicator" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="85px" height="48px" style="enable-background:new 0 0 85 48;" xml:space="preserve" viewBox="0 0 85 48" >`;
		indicatorE  += `	<g id="scrollpositionwrapper" transform="translate(43,5) scale(20)"></g>`;
		indicatorE  += `</svg>`;


	$(".questionindicator").append( indicatorE );

	// CALCULATE SCALE VISUALIZATION 
	var width_dv_rating = 600;
	var gap_module = 10;
	var width_module = (width_dv_rating / currentQuestionJson.questionable.scales.length) - gap_module;
	var distribution = (width_dv_rating+gap_module) / currentQuestionJson.questionable.scales.length;
	var divisionsObj = [];
	for (let i = 0; i < currentQuestionJson.questionable.scales.length; i++) {
		let division = Math.floor( map(i, 0, currentQuestionJson.questionable.scales.length-1, 1, 20) );
		let width_divisions = width_module / division;
		divisionsObj[i] = [];
		for (let j = 0; j < division; j++) {
			divisionsObj[i].push( width_divisions );
		}	
	}

	d3.select('.skilltitle')
		.style('padding-left', '0.6rem')

	d3.select('.question')
		.text( currentQuestionJson.name[defaultlanguage] )
		.attr('data-iddb', currentQuestionJson.id )
		.style('padding-left', '0.6rem')


	//////////////////////////////////


	currentQuestionJson.questionable.labels.forEach( (o,ilabel) => {

		let optionE  = `<div class="option label" data-iddb=${o.id} ) >`
				optionE += `	<div class="labelnumber disable-select">${ilabel+1}</div>`
				optionE += `	<div class="wrappersliderscaleindicator">`
				optionE += `		<svg class="sliderscaleindicator" id="sliderscaleindicator${ilabel+1}" width="600" height="200" viewBox="0 0 600 200" style="enable-background:new 0 0 600 200;" xml:space="preserve">`
				optionE += `		</svg>`
				optionE += `	</div>`
				optionE += `	<div class="labeltext disable-select"  data-es="${ o.content.es }" data-en="${  o.content.en}" >${ o.content[defaultlanguage]}</div>`
				optionE += `</div>`

		$(".options").append(optionE);


		/////////////////////////////


		d3.select(`#sliderscaleindicator${ilabel+1}`)
    		.attr('data-rectclass', (d,i) => `.rect_label${o.id}` )
			.attr('data-circleclass', (d,i) => `.circle_label${o.id}` )
			.on("mouseenter", function(){
				// $('.scaleindicator').css("opacity", 1.0)
				d3.selectAll(".scaleindicator")
					.transition()
            		.ease("cubic-out")
            		.duration("400")
					.style("opacity", "1.0");
			})
			.on("mouseleave", function(){
				// $('.scaleindicator').css("opacity", 0.0)
				d3.selectAll(".scaleindicator")
					.transition()
            		.ease("cubic-out")
            		.duration("400")
					.style("opacity", "0.0");
			})
        	.selectAll('g')
			.data(currentQuestionJson.questionable.scales)
			.enter()
			.append('g')
			.attr("id", (d,i) => `g${i}` )
			.attr('data-iddb', (d,i) => d.id )
			.attr('data-rect', (d,i) => `#rect_label${o.id}scale${d.id}` )
			.attr('data-circle', (d,i) => `#circle_label${o.id}scale${d.id}` )
			.attr('data-height', 100 )
			.attr('data-y', 100 )
			.classed('scale', true)
			.attr('data-fill', (d,i) => getLerpColor(i, 0, currentQuestionJson.questionable.scales.length-1, '#b73cff', '#001488') )
			.on("mouseover", function(d,i){
				d3.select(this).selectAll('.barras')
					.transition()
					.ease("cubic-out")
					.duration("200")
					.attr({
							y: 0,
							height: 200
					});

				size_circle = map(i, 0, currentQuestionJson.questionable.scales.length-1, 0, 220);
				sizehalf_circle = Math.floor(size_circle/2);
				d3.select('.rankingcircle')
					.style('width',  `${size_circle}px`)
					.style('height',  `${size_circle}px`)
					.style('border-radius',  `${sizehalf_circle}px`)
					.style('left', `calc( 50% - ${sizehalf_circle}px )` )
					.style('top', `calc( 180px - ${sizehalf_circle}px )` );

				d3.select('.rankingname').text( currentQuestionJson.questionable.scales[i].content.es )
			})
			.on("mouseout", function(d,i){
				let currentHeigt = d3.select(this).attr('data-height')
				let currentY = d3.select(this).attr('data-y')
				d3.select(this).selectAll('.barras')
					.transition()
					.ease("cubic-out")
					.duration("200")
					.attr({
							y:currentY,
							height: currentHeigt
					});

				d3.select('.rankingname').text( "" )
			})
			.on("click", function(d,i){
				d3.select(this.parentNode).selectAll('.scale').attr('data-height', 100);
				d3.select(this.parentNode).selectAll('.scale').attr('data-y', 100);
				d3.select(this.parentNode).select('.selectedscale').selectAll('.barras')
					.transition()
					.ease("cubic-out")
					.duration("200")
					.attr({
							y:100,
							height: 100
					});

				d3.select(this).attr('data-height', 100);
				d3.select(this).attr('data-y', 0);

				d3.select(this.parentNode).selectAll('.scale').classed('selectedscale', false);
				d3.select(this).classed('selectedscale', true);

				// let currentHeigt = d3.select(this).attr('data-height')
				// let currentY = d3.select(this).attr('data-y')
				// d3.select(this.parentNode).selectAll('.barras')
				// 	.transition()
				// 	.ease("cubic-out")
				// 	.duration("200")
				// 	.attr({
				// 			y:currentY,
				// 			height: currentHeigt
				// 	});

				let circleid = d3.select(this).attr("data-circle") 
				let circleclass = d3.select(this.parentNode).attr("data-circleclass") 
				gsap.to( circleclass  , { attr:{r: 0.0}, duration: 0.0 , delay: 0.0 } );
				gsap.to( circleid  , { attr:{r: 0.3225}, duration: 0.2 , delay: 0.0 } );

				if ( $(".selectedscale").length == $(".label").length ) {
					gsap.to( "#submitoption"  , {"top": "calc( 50% - 72px )", duration: 0.8, delay:0.1});	
				} else {
					gsap.to( "#submitoption"  , {"top": "calc( 50% - 288px )", duration: 0.8, delay:0.1});
				}		
			})
			.attr('transform', (d,i)=>{

				d3.select(`#sliderscaleindicator${ilabel+1} #g${i}`).selectAll('rect')
				 	.data(divisionsObj[i])
				 	.enter()
				 	.append('rect')
					.attr('width', d => d-2)
					.attr('height', 100)
					.attr('x', (d,j)=>{
						return j*(d+0.4);
					})
					.attr('y', 100)
					.attr('fill', (d,k) => getLerpColor(i, 0, currentQuestionJson.questionable.scales.length-1, '#b73cff', '#001488') )
					.attr('class', 'barras')
					

				d3.select(`#sliderscaleindicator${ilabel+1} #g${i}`)
					.append('rect')
					.attr('width', 122)
					.attr('height', 200)
					.attr('x', 0)
					.attr('y', 0)
					.attr('opacity', '0.0' )

				return `translate(${distribution*i},0)`;
			})


		/////////////////////////////


		if ( ilabel%2 == 0)  {
			q += `C-0.25,${ilabel+0} -0.5,${ilabel+0.25} -0.5,${ilabel+0.5} C-0.5,${ilabel+0.75} -0.25,${ilabel+1} 0,${ilabel+1} ` // 1
		} else {
			q += `C0.25,${ilabel+0} 0.5,${ilabel+0.25} 0.5,${ilabel+0.5} C0.5,${ilabel+0.75} 0.25,${ilabel+1} 0,${ilabel+1} ` // 1
		}
		alturaOptionSvg += 20; //40;

		let rectOffsetX = 0.9;
		let rectStartX =  -2.0;
		let circleStartX =  rectStartX + 0.18; //(0.325 / 2);
		
		var rectI = ilabel;

		currentQuestionJson.questionable.scales.forEach( (oscale,iscale) => {

			d3.select("#scrollpositionwrapper")
				.append("rect")
				.attr("x", rectStartX + (iscale*rectOffsetX)   )
				.attr("y", 0.3 + rectI )
				// .attr("data-ver",  0.3 + rectI  )
				.attr("width",0.35)
				.attr("height",0.35)
				.attr("fill",  getLerpColor(iscale, 0, currentQuestionJson.questionable.scales.length-1, '#b73cff', '#001488') )
				.attr("id", `rect_label${o.id}scale${oscale.id}` )				
				.attr("data-iddb",  oscale.id  )
				.classed(`rect_label${o.id}` , true  )
				.classed("noselected", true);

			d3.select("#scrollpositionwrapper")
				.append("circle")
				.attr("cx", circleStartX + (iscale*rectOffsetX)   )
				.attr("cy", 0.5 + rectI )
				.attr("r",0.0) // 0.0 0.3225
				.attr("fill",  getLerpColor(iscale, 0, currentQuestionJson.questionable.scales.length-1, '#b73cff', '#001488') )
				.attr("id",  `circle_label${o.id}scale${oscale.id}`  )
				.attr("data-iddb",  oscale.id  )
				.classed(`circle_label${o.id}` , true  )
				.classed("noselected", true);
				// .style('display', 'none');

			})

		d3.select('.questionindicator').style('justify-content', 'start');

	})

	d3.select("svg.indicator")
		.attr("height", alturaOptionSvg)
		.attr("viewBox", `0 0 85 ${alturaOptionSvg}` );
	d3.select("#scrollpositionwrapper")
		.append( "path")
		.attr( "id","avance")
		.attr( "fill","none")
		.attr( "stroke","#000000")
		.attr( "stroke-width", "0.16" ) // 0.12
		.attr("d", q);


	pathTotalLengthOptionsIndicator = pathsTotalLengthOptionsIndicator[currentQuestionJson.questionable.labels.length]; //document.getElementById("avance").getTotalLength()
	pathTotalLengthFracOptionsIndicator = pathTotalLengthOptionsIndicator - (pathTotalLengthOptionsIndicator / (currentQuestionJson.questionable.labels.length) );

	$(".questionindicator svg #avance").css("stroke-dasharray", `${pathTotalLengthOptionsIndicator}`);
	$(".questionindicator svg #avance").css("stroke-dashoffset", `${pathTotalLengthFracOptionsIndicator}`);

	pathTotalLengthPalomitaIndicator = 0.6817406415939331; // document.getElementById("p1").getTotalLength()
	pathTotalLengthFracPalomitaIndicator = 0;

	$(".questionindicator svg .selected").css("stroke-dasharray", `${pathTotalLengthPalomitaIndicator}`);
	$(".questionindicator svg .selected").css("stroke-dashoffset", `${pathTotalLengthPalomitaIndicator}`);
}

function ratingScale(currentQuestionJson) {

	submitquestion.answer.questionId = currentQuestionJson.id;
	submitquestion.answer.answerableType = currentQuestionJson.questionable_type;
	//submitquestion.answer.userId = currentQuestionJson.candidate_id;


	if ( isMobile ) {
		ratingScaleMobile(currentQuestionJson) 
	} else {
		ratingScaleDesktop(currentQuestionJson) 
	}


	let scaleNominalIndicator  = `<div class="scalenominalindicator scaleindicator" data-nominalscale="1" ></div>`
		scaleNominalIndicator += `	<div class="rankingcircle scaleindicator" ></div>`
		scaleNominalIndicator += `	<div class="rankingname scaleindicator"></div>`

	$(".layout").append( scaleNominalIndicator );	 

	
	scrolling = false;

	$(window).off("scroll");

	$(window).on("scroll", function(e){
		scrolling = true;
		let lastTimeStamp = e.timeStamp ;
		let windowScrollTop = $(this).scrollTop() ;
		//console.log( scrolling )
		setTimeout( function(eto) {
			if ( windowScrollTop == $(window).scrollTop() ) scrolling = false;
			//console.log( scrolling )
		},200)
	})
}


function nextQuestion() {
	gsap.to( "#submitoption"  , {"top": "calc( 50% - 288px )", duration: 0.8, delay:0.0});

	$(".questionwrapper").fadeOut(800, function() {
		$(this).fadeIn();
	});

	$(".options").fadeOut(800, function() {
		$(window).scrollTop(0);
		$(".options").empty();
		

		if ( currentCompetencie.questions.filter( q => q.answered == false ).length == 1 ) {
			// termino
			endCompetencieUX()
		} else {
			
			updatePieChart(
			 	  ".competenciesvg #competencieheadersvg",
			 	  currentCompetencie.progress,
			 	  `#competencieheadersvg text.porcientocompetencia`
			);	

			currentCompetencie.questions.find( q => {
				return q.answered == false 
			}).answered = true;

			// UPDATE SUBMIT JSON
			submitquestion.answer.options =  [];
			submitquestion.answer.ratingScales =  []
			submitquestion.answer.competenceId = currentCompetencie.id
			submitquestion.answer.questionId = currentQuestionJson.id
			submitquestion.answer.answerableType = currentQuestionJson.questionable_type

			// UPDATE PROGRESS
			let total = currentCompetencie.questions.length;
			let answeredNum = currentCompetencie.questions.filter( q => q.answered == false ).length;
			console.log( `total de preguntas: ${total}`, `pregntas respondidas: ${answeredNum}`)
			// CALCULO PROGRESSS
			currentCompetencie.progress = map( (total-answeredNum), 0, total, 0, 100);


			currentQuestionJson =  currentCompetencie.questions.find( q => {
				return q.answered == false 
			})


			let questionabletype = currentQuestionJson.questionable_type

			if ( currentQuestionJson.questionable.hasOwnProperty( "option_type" ) ) questionabletype += currentQuestionJson.questionable.option_type

			// RENDER: SKILL 
			d3.select('.skilltitle')
				.text( currentQuestionJson.skill.name[defaultlanguage] )
				.attr( "data-es", currentQuestionJson.skill.name.es )
			 	.attr( "data-en", currentQuestionJson.skill.name.en );

			// RENDER: QUESTION
			d3.select('.question')
				.text( currentQuestionJson.name[defaultlanguage] )
				.attr( "data-es", currentQuestionJson.name.es )
			 	.attr( "data-en", currentQuestionJson.name.en );

			switch(questionabletype) {
			  case "MultipleOptionexclusive":
			    multipleOptionExclusive(currentQuestionJson);
			    break;
			  case "MultipleOptioninclusive":
			    multipleOptionInclusive(currentQuestionJson);
			    break;
			  case "RatingScale":
			  	ratingScale(currentQuestionJson);
			  	break;
			  default:
			    // code block
			}
			
			$(this).fadeIn();

		}

		
	})
	setTimeout( function() {
		updatePieChart(
		 	  ".competenciesvg #competencieheadersvg",
		 	  currentCompetencie.progress,
		 	  `#competencieheadersvg text.porcientocompetencia`
		);	
	}, 900)

}

$( "body" ).delegate( "#submitoption", "click", function() {
	
	console.log( "previo envio" )
	switch(submitquestion.answer.answerableType) {
	  case "MultipleOption":
	  	$( ".selectedoption" ).each(function( index ) {
	  		submitquestion.answer.options.push( $( this ).data('iddb') )		    
		});
		console.log( submitquestion.answer.options );
	    break;
	  case "RatingScale":
	  	$( ".label" ).each(function( index ) {
	  		let labelid = $( this ).data('iddb')
	  		let scaleid = $( this ).find('.selectedscale').data('iddb')
	  		submitquestion.answer.ratingScales.push( { "scaleId": scaleid  , "ratingScaleLabelId": labelid } )		    
		});
		console.log( submitquestion.answer.ratingScales );
	  	break;
	  default:
	    
	}
	
	
	

	d3.json("https://gapp-kthh.supter.ai/api/question/answer",function(error, data) {
			   console.log("respuesta Kevin");
               console.log(data);
               console.log("fin respuesta Kevin");
               //console.log(error);
               nextQuestion();
            })
           .header("Content-Type","application/json")
           .send("POST", JSON.stringify( submitquestion ) );
	
})


$( "body" ).delegate( ".ongoingcompetencie", "click", function() {
	fullnameCompetencie = $(this).data("fullname");
	idCompetencie = $(this).data("competenciaid");
	indexCompetencie = parseInt( $(this).data("index") );
	dbidCompetencie = $(this).data("dbid");
	anchorCompetencie = '#'+$(this).data("competenciaid");

	loadPageCompetencie("questionnaires", dbidCompetencie )
})

$( "body" ).delegate( ".finishedcompetencie", "click", function() {
	idCompetencie = $(this).data("competenciaid");
	indexCompetencie = parseInt( $(this).data("index") );
	dbidCompetencie = $(this).data("dbid");
	anchorCompetencie = '#'+$(this).data("competenciaid");

	loadPageCompetencie("recommendedcontent", dbidCompetencie)
})


$( "body" ).undelegate( ".toggledescription", "click").delegate( ".toggledescription", "click", function() {
	if ( $(this).data("togglestatus") == '1' ) {
		$(this).html( $(this).data("description") )
		$(this).data("togglestatus", '0');
	} else {
		$(this).html( $(this).data("limiteddescription") )
		$(this).data("togglestatus", '1');
	}

})


$( "body" ).delegate( ".brecommendedcontent:not(.unfinishedopacity)", "click", function() {
	dbidCompetencie = $(this).data("dbid");
	loadPageCompetencie("recommendedcontent", dbidCompetencie)
});


$( "body" ).delegate( ".titulocompetencia.unfinished", "click", function() {
	dbidCompetencie = $(this).data("dbid");
	loadPageCompetencie("questionnaires", dbidCompetencie )
});





function endCompetencieUX() {

	// 	¡FELICIDADES HAS TERMINADO! 

	// 	DESCUBRE MÁS CONTENIDOS DE APRENDIZAJE Y SUBE DE NIVEL

	// 	CONGRATULATIONS YOU'VE FINISHED!

	// GO FOR MORE IN YOUR LEARNING PATH
	// LEVEL UP!




	if ( numCompetenciesCompleted == totalCompetencies  ) {
		let line1 = { es: '¡FELICIDADES HAS TERMINADO!', en: "CONGRATULATIONS<br>YOU'VE FINISHED!"};
		let line2 = { es: 'DESCUBRE MÁS CONTENIDOS DE APRENDIZAJE<br>Y SUBE DE NIVEL', en: 'GO FOR MORE IN YOUR LEARNING PATH<br>LEVEL UP!'};

		let entidad  = `<div class="endcompetenciewrapper">`
			entidad += `	<div class="endcompetenciemessagefinal" style="margin-top:-2rem;" >`
			entidad += `		<img src="images/closeiconw.svg" />`
			entidad += `		<div class="light" style="font-weight: 300;">${line1[defaultlanguage]}</div>`
			entidad += `		<div class="bold" style="margin-top: 0.8rem;">${line2[defaultlanguage]}</div>`
			entidad += `	</div>`
			entidad += `</div>`
		$(".layout").after( entidad );
		gsap.to(".endcompetenciewrapper", {"background-color": "#00268088", duration: 0.3, delay:0, ease: Power1.easeOut });

		gsap.to(".endcompetenciemessagefinal", {
			"width": ($(".layout").width()*0.85)+"px",
			"height": ($(".layout").width()*0.85)+"px",
			"border-radius": ($(".layout").width()*0.24)+"px",
			"background-color": "#002680ff",
			 duration: 0.8, 
			 delay:0.35,
			 ease: Elastic.easeOut.config(0.4 , 0.3) }
			 );
		gsap.to(".endcompetenciemessagefinal div", {"color": "#ffffffff", duration: 0.3, delay:0.95, ease: Power1.easeOut});
		gsap.to(".endcompetenciemessagefinal img", {"opacity": 1.0, duration: 0.3, delay:0.95, ease: Power1.easeOut});

		questionnaireJson.competencies[indexCompetencie].progress = 100;
		questionnaireJson.competencies[indexCompetencie].completed = true;

		$( ".endcompetenciewrapper" ).on( "click", function() {
			$(this).off("click")
		  	loadPage("competenciesmenu")
		});

		setTimeout( finalCelebration, 2000);
	} else {
		let line1 = { es: 'COMPLETASTE<br>ESTA SECCIÓN', en: 'SECTION<br>COMPLETED'};
		let line2 = { es: '¡CONTINÚA!', en: 'KEEP GOING!'};

		let entidad  = `<div class="endcompetenciewrapper">`
			entidad += `	<div class="endcompetenciemessage" style="margin-top:-2rem;" >`
			entidad += `		<img src="images/closeiconw.svg" />`
			entidad += `		<div class="light" style="font-weight: 300;">${line1[defaultlanguage]}</div>`
			entidad += `		<div class="bold" style="margin-top: 0.8rem;">${line2[defaultlanguage]}</div>`
			entidad += `	</div>`
			entidad += `</div>`
		$(".layout").after( entidad );
		gsap.to(".endcompetenciewrapper", {"background-color": "#00268088", duration: 0.3, delay:0, ease: Power1.easeOut });

		gsap.to(".endcompetenciemessage", {
			"width": ($(".layout").width()*0.8)+"px",
			"height": ($(".layout").width()*0.8)+"px",
			"border-radius": ($(".layout").width()*0.8)+"px",
			"background-color": "#002680ff",
			 duration: 0.8, 
			 delay:0.35,
			 ease: Elastic.easeOut.config(0.4 , 0.3) }
			 );
		gsap.to(".endcompetenciemessage div", {"color": "#ffffffff", duration: 0.3, delay:0.95, ease: Power1.easeOut});
		gsap.to(".endcompetenciemessage img", {"opacity": 1.0, duration: 0.3, delay:0.95, ease: Power1.easeOut});

		questionnaireJson.competencies[indexCompetencie].progress = 100;
		questionnaireJson.competencies[indexCompetencie].completed = true;

		$( ".endcompetenciewrapper" ).on( "click", function() {
			$(this).off("click")
		  	loadPage("competenciesmenu")
		});

		setTimeout( competenceCelebration, 2000);
	}

	

}

function competenceCelebration() {
	confetti({
	  particleCount: 400,
	  spread: 360,
	  origin: { y: 0.5, x:0.5 },
	  zIndex: 1008
	});
}

function finalCelebration() {
	let end = Date.now() + (5 * 1000);

	// go Buckeyes!
	//let colors = ['#bbbb00', '#ffffff', '#00ffbb',];

	(function frame() {
	  confetti({
	    particleCount: 3,
	    angle: 60,
	    spread: 55,
	    origin: { x: 0 },
	    // colors: colors
	    zIndex: 1008
	  });
	  confetti({
	    particleCount: 3,
	    angle: 120,
	    spread: 55,
	    origin: { x: 1 },
	    // colors: colors
	    zIndex: 1008
	  });

	  if (Date.now() < end) {
	    requestAnimationFrame(frame);
	  }
	}());
}


function pathPrepare ($el) {
	var lineLength = $el[0].getTotalLength();
	//console.log(lineLength);
	$el.css("stroke-dasharray", lineLength);
	$el.css("stroke-dashoffset", lineLength);
}
		