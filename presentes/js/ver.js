
	$(document).ready( function () {

		resetBrandtoBlack();


		showTrainingsOnTheCover();
		// to know is desktop o mobile
		
		//}

	})
	
	// no borrar, para publicar, comentar modo prueba y descomentar este bloque
	function showTrainingsOnTheCover() {
		trainings = [];
		db.collection("trainings").where("portada", "==", true).where("abierto", "==", true).orderBy("prioridad")
		.get()
		.then((querySnapshot) => {
		    querySnapshot.forEach((doc) => {
		    	trainings.push( doc.data() );
		    });
		    sortTrainingsByPriorityAndShow()
		    showGenerativeGraphics();
		});
	}

	// modo prueba
	// function showTrainingsOnTheCover() {
	// 	trainings = [];
	// 	db.collection("trainings").where("editando", "==", true).orderBy("prioridad")
	// 	.get()
	// 	.then((querySnapshot) => {
	// 	    querySnapshot.forEach((doc) => {
	// 	    	trainings.push( doc.data() );
	// 	    });
	// 	    // alert( trainings.length)
	// 	    sortTrainingsByPriorityAndShow()
	// 	    // showGenerativeGraphics();
	// 	});
	// }

	function sortTrainingsByPriorityAndShow() {
		// trainings.sort(function(a, b) {
		//     return a.prioridad > b.prioridad;
		// });
		// trainings.sort();
		console.log( trainings);
		var imgsPortada = [];
		imgsPortada[0] = 'portadav2_3.jpg';
		for( var i=0; i<trainings.length; i++) {
			var element = '';
		     	element += '<article class="slideV training col-lg-12 row paddingNoFirst" style="color:rgb(255,255,255);" >'
				element += '<div class="numberT col-lg-2 typolight d-none d-lg-block" >'+(i+1)+'</div>'
				element += '<div class="col-lg-6">'
				element += '	<div class="numberT typolight d-lg-none" >'+(i+1)+'</div>'
				element += trainings[i].nombreHTMLportada
				element += '	<hr>'
				// alert( doc.data().horarios != null);
				element += '	<div class="datesT separacioninfoT separacioninfobeforehrT">'+trainings[i].fechas[ trainings[i].fechas.length-1 ]+'</div>'
				element += '	<div class="scheduleT separacioninfoT">'+ trainings[i].horarios[ trainings[i].horarios.length-1 ] +'</div>'
				element += '	<div class="neighborhoodT separacioninfoT">ROMA SUR</div>'
				element += '	<div class="priceT separacioninfoT">'+ fNumber.go( trainings[i].precios[ trainings[i].precios.length-1 ] , "$ ") +' </div>'
				var entrenadores = trainings[i].entrenadores[0];
				for( var e=1; e<trainings[i].entrenadores.length; e++ ) {
					entrenadores += '<span class="typolight"> | </span>' + trainings[i].entrenadores[e]
				}
				element += '	<div class="coachT">IMPARTIDO POR <span class="typobold">'+entrenadores+'</span></div>'
				element += '	<hr style="margin-top:0.35rem;">'
				element += '	<div style="display: flex;align-items:center;" class="manita" data-content="case2" id="loadcaseportada">'
				element += '		<div  style="margin-bottom: 0.0rem;">'
				element += '			<svg id="iconocase" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"'
				element += '				 width="35px" height="35px" viewBox="0 0 80.7 80.7" style="enable-background:new 0 0 80.7 80.7;fill:rgb(81,81,81);" xml:space="preserve">'
				element += '			<g id="XMLID_1_">'
				element += '				<g id="XMLID_1046_">'
									
				element += '						<rect id="XMLID_1088_" x="37.1" y="8.2" transform="matrix(0.7073 0.707 -0.707 0.7073 40.808 -15.2296)" width="3.4" height="67"/>'
				element += '				<g id="XMLID_1085_">'
				element += '						<polygon id="XMLID_1086_" points="43.3,15.9 43.4,19.6 61.5,19 60.8,37.1 64.5,37.2 65.3,15.1"/>'
				element += '					</g>'
				element += '				</g>'
				element += '				<path id="XMLID_1048_" d="M80.7,80.7H0V0h80.7V80.7z M3.4,77.3h73.9V3.4H3.4V77.3z"/>'
				element += '			</g>'
				element += '			</svg>'
				element += '		</div>'
				element += '		<div  style="margin-left: 1rem;" id="textocaseportada"></div>'
				element += '	</div>'
				element += '	<div class="moreinfoT separacioninfobeforehrT manita loadhtmlcontent" data-content="training_'+trainings[i].idname+'">MAS INFO <i class="fas fa-angle-right"></i></div>'
				element += '</div>'
			    element += '</article>'
				// console.log(element);
		   	$('#wrapperopentrainings').append(element)

		   	imgsPortada.push( trainings[i].portadadoc[ trainings[i].portadadoc.length-1 ].file )
		   	console.log( imgsPortada )
		   	//alert( trainings[i].caseportada.texto );
		   	$('.slideV').last().find('#loadcaseportada').attr('data-content', trainings[i].caseportada.linkrecurso );
            $('.slideV').last().find('#loadcaseportada').addClass( trainings[i].caseportada.accion );
            $('.slideV').last().find('#textocaseportada').html( trainings[i].caseportada.texto + ' <i class="fas fa-angle-right">' );

            $('.slideV').last().css('color', trainings[i].portadadoc[ trainings[i].portadadoc.length-1].color );
            $('.slideV').last().find('#iconocase').css('fill', trainings[i].portadadoc[ trainings[i].portadadoc.length-1].color );
            $('.slideV').last().find('hr').css('background-color', trainings[i].portadadoc[ trainings[i].portadadoc.length-1].color );


		}

		userAgent = navigator.userAgent || navigator.vendor || window.opera;

		//function showGenerativeGraphics() {
		var slideVLenght = trainings.length+1;
			//var yval = 0;
		var displacementScroll = 1; 
		var displacementScrollA = 0;
		var distScrollTop = [];
		var img = [];
			// var dist9 = 0;
		var desplazamientoDeltas = 620;
			// var dist4 = 0;
			
		let aspectRateImage = 1388.0 / 768.0;
		let aspectRateWindow = window.innerWidth / window.innerHeight;
		let w = 0, h = 0;
	    if ( aspectRateWindow < aspectRateImage ) {
	       w = Math.round(window.innerHeight * aspectRateImage);
	       h = window.innerHeight;
	    } else {
	       w = window.innerWidth;
	       h = Math.round( window.innerWidth / aspectRateImage  );
	    };	    
		var resolutionApp = 1;
		    
		let renderer = new PIXI.Application({ 
				    width: w, 
				    height: h,                       
				    antialiasing: true, 
				    transparent: true, 
				    autoresize: true,
				    resolution: resolutionApp
				  }
				);
		
		document.getElementById("generativephotography").appendChild(renderer.view);

	    $("#generativephotography").css('width', w+'px');
	    $("#generativephotography").css('height', h+'px' );
	    $("#generativephotography").css('left', '50%');
	    $("#generativephotography").css('top' , '50%');
	    $("#generativephotography").css('transform', 'translate(-50%, -50%)');

		var container = new PIXI.Container();
		renderer.stage.addChild(container);

		// var video1 = document.createElement("video");
		// 	video1.preload = "auto";
		// 	video1.loop = true;              // enable looping
		// 	video1.autoplay = true; 
		// 	video1.volume = 0.2; 
		// 	video1.src = "video/01_Train_snow.mp4";

		// var videoTexture1 = PIXI.Texture.fromVideo(video1);
		// var videoSprite1 = new PIXI.Sprite(self.videoTexture1);
		// container.addChild(videoSprite1);
		// var imgsPortada = [];

		// render image
		for(var i=0; i<slideVLenght; i++ ) {
			img[i] = new PIXI.Sprite.fromImage('image/'+imgsPortada[i]);
			img[i].width = w;
			img[i].height = h;
			img[i].position.x = 0;
			img[i].position.y = 0;
			( i==0 ) ? img[i].alpha = 1.0 :  img[i].alpha = 0.0;
			( i==0 ) ? distScrollTop[i] = 1 :  distScrollTop[i] = 0;
			container.addChild(img[i]);
		}

		// add Filters
		var disSprite = PIXI.Sprite.fromImage('image/gct_logo_mask_blur_3.jpg');
		disSprite.width = w;
		disSprite.height = h;
		var displacementFilter = new PIXI.filters.DisplacementFilter(disSprite);
		displacementFilter.scale.set(0.0);
		container.addChild(disSprite);
		container.filters = [displacementFilter];

		if (!/android/i.test(userAgent) && !/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream ) {

   		} else {
   			// telefono movil
   			desplazamientoDeltas = 280;
   		}

		function draw(){
			renderer.render(renderer.stage);
			displacementFilter.scale.y = displacementScrollA;
			for(var i=0; i<slideVLenght; i++) {
				img[i].scale.y = displacementScroll;
			}
			window.requestAnimationFrame(draw);
		}
		draw();

		var scrollPx = 0;

		window.addEventListener("scroll", function (event) {
		    scrollPx = this.scrollY;
		    let cicloRad = map(scrollPx, 0, (window.innerHeight*slideVLenght), 0, (slideVLenght*Math.PI) );
		    let valNorm = Math.abs( Math.cos(cicloRad) );
		    valNorm = constrain(valNorm, 0, 1);
		    displacementScrollA = map(valNorm, 0, 1, desplazamientoDeltas, 0);
		    displacementScroll = map(valNorm, 0, 1, 2, 1);

		    // ojo con estas entidades que solon estan en un html!!	
		    for(var i=0; i<slideVLenght; i++) {
		    	distScrollTop[i] = map( dist(scrollPx,0,document.getElementsByClassName("slideV")[i].offsetTop,0), 0, window.innerHeight, 1, 0);
			    distScrollTop[i] = constrain(distScrollTop[i], 0, 1);
			    img[i].alpha = distScrollTop[i];
		    }
		    
		});

	}
	
