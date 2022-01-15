
window.scrollTo(0,0);

var scrollPx = 0;
var generativephotographyInstance;

d3.selectAll(".playaudioicon").each(function(d) {
    d3.xml("../images/playaudiolgbti2.svg")
        .then(data => {
            let icon = d3.select(this).node().append(data.documentElement);
        })
});

d3.selectAll(".playaudioiconsmall").each(function(d) {
    d3.xml("../images/playaudiolgbti2small.svg")
        .then(data => {
            let icon = d3.select(this).node().append(data.documentElement);
        })
});

d3.selectAll(".playvideoicon").each(function(d) {
    d3.xml("../images/playvideolgbti2.svg")
        .then(data => {
            let icon = d3.select(this).node().append(data.documentElement);
        })
});

d3.selectAll(".playvideoiconsmall").each(function(d) {
    d3.xml("../images/playvideolgbti2small.svg")
        .then(data => {
            let icon = d3.select(this).node().append(data.documentElement);
        })
});

/*d3.selectAll(".iconaudio").each(function(d) {
    d3.xml("../images/iconaudiosmall.svg")
        .then(data => {
            let icon = d3.select(this).node().append(data.documentElement);
        })
});*/

/*d3.selectAll(".iconvideo").each(function(d) {
    d3.xml("images/iconvideo.svg")
        .then(data => {
            let icon = d3.select(this).node().append(data.documentElement);
        })
});*/

var sectionMenu = {
    on: {
        "historias":"black",
        "elles":"black",
        "nosotres":"black"
    },
    off: {
        "historias":"white",
        "elles":"white",
        "nosotres":"black"
    }  
};

var mainmenuIsOpen = false;
function toggleMainMenu() {
    var menuele = document.getElementById("menufullscreen");
    var headerele = document.querySelectorAll(".borderb");
    var menuicon = document.getElementsByClassName("menuicon");
    if (!mainmenuIsOpen) {
        menuele.classList.add("menufullscreenopen");
        menuicon[0].style.color = sectionMenu.on[currentSection];
        for (let i = 0; i < headerele.length; i++) {
            headerele[i].classList.add("foregroundblack");
        }
        disableScroll();
    } else {
        menuele.classList.remove("menufullscreenopen");
        menuicon[0].style.color = sectionMenu.off[currentSection];
        for (let i = 0; i < headerele.length; i++) {
            headerele[i].classList.remove("foregroundblack");
        }
        enableScroll();
    }
    mainmenuIsOpen = !mainmenuIsOpen;
}
// vidafrente

var controller = new ScrollMagic.Controller();

/******************** portada *********************/
var indexTransPortada = 0;
var rangeTransPortada = 3;
var timerPortada;

function playAnimacionPortada() {
    timerPortada = setInterval(() => {
        indexTransPortada = (indexTransPortada+1)%rangeTransPortada;
        sketch.transitionToIndex( indexTransPortada );  
    },3500)    
}

function stopAnimacionPortada() {
    clearInterval(timerPortada);  
    sketch.stop();
}

playAnimacionPortada();

var tweens1 = TweenMax.to(".tituloprincipal", 1.8, {"opacity": "0", "y": window.innerHeight*0.65 });
	
	var scene = new ScrollMagic.Scene({triggerElement: "#portadapreguntas", duration: window.innerHeight*0.5, triggerHook:0.749 , offset:-window.innerHeight*0.25})
					.setTween(tweens1)
					//.addIndicators() // add indicators (requires plugin)
					.addTo(controller);

var tweens2 = TweenMax.to("#scrolldowniconwrapper,.tooltip", 1.8, {"opacity": "0"});
	
    var scene2 = new ScrollMagic.Scene({triggerElement: "#portadapreguntas", duration: window.innerHeight*0.5, triggerHook:0.749 , offset:-window.innerHeight*0.25})
                    .setTween(tweens2)
                    //.addIndicators() // add indicators (requires plugin)
                    .addTo(controller);

/**************************************************/

/******************preguntas portada **************/
var scenePreguntas = new ScrollMagic.Scene({triggerElement: "#preguntasportada", triggerHook:0.5,  offset:-window.innerHeight*0.25 } )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
					/*.on("update", function (e) {
						//console.log("update")
                        // siempre que mueves el scroll, aunque solo cuando lo mueves, de manera que funciona tambien fuera del rango de afectación
                        //console.log( e.target.controller().info("scrollDirection") );
					})*/
					/*.on("enter", function (e) {
						//console.log("enter")
                        //console.log( e.type == "enter" ? "inside" : "outside")
					})*/
                    .on("enter leave", function (e) {
						//console.log("arriba")
                        console.log( "enter leave: ", e.target.controller().info("scrollDirection"), e.type, e.type == "enter" ? "inside" : "outside" )
                        if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            stopAnimacionPortada();
                            sketch.duration = 0.6;
                            sketch.transitionToIndex( 3 );
                            sketch.play();
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.stop();
                            sketch.transitionToIndex( 0 );
                            sketch.duration = 1.0;
                            playAnimacionPortada();
                            sketch.play();
                        }
                        //FORWARD enter
					})
                    /*.on("leave", function (e) {
						console.log("leave")
					})
					.on("start", function (e) {
                        stopAnimacionPortada()
                        console.log( "start");
					})*//*
                    .on("start end", function (e) {
						//playAnimacionPortada()
                        //console.log( "end");
                        //console.log( "start end", e.type,  e.type == "start" ? "top" : "bottom" )                        
					})
					.on("progress", function (e) {
						//console.log("progress")
                        // cuando mueves el scroll dentro del rango de afectación
                        //console.log( e.progress.toFixed(3) )
					});*/
/**************************************************/

var sceneElles = new ScrollMagic.Scene({triggerElement: "#elles",triggerHook:0.4} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.duration = 1;
                            sketch.transitionToIndex( 4 );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.duration = 0.6;
                            sketch.transitionToIndex( 3 );
                        }
					})
                    

var sceneIntroelles = new ScrollMagic.Scene({triggerElement: "#introelles", triggerHook:0.33} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( 5 );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( 4 );
                        }
					})

var scenecdmx = new ScrollMagic.Scene({triggerElement: "#ciudaddemexico", triggerHook:0.33} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( 6 );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( 5 );
                        }
					})

var scenecentroamerica = new ScrollMagic.Scene({triggerElement: "#centroamerica", triggerHook:0.33} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( 7 );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( 6 );
                        }
					})

var scenepotenciallgbt = new ScrollMagic.Scene({triggerElement: "#potenciallgbt", triggerHook:0.33} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( 8 );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( 7 );
                        }
					})

var scenevidefrente = new ScrollMagic.Scene({triggerElement: "#vidafrente", triggerHook:0.33} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( 9 );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( 8 );
                        }
					})

//alert( document.getElementById("metrobalderas").dataset.indexfoto )

var scenebalderas = new ScrollMagic.Scene({triggerElement: "#metrobalderas", triggerHook:0.33} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( document.getElementById("metrobalderas").dataset.indexfoto );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( 9 );
                        }
					})

var scenevidefrente2 = new ScrollMagic.Scene({triggerElement: "#vidafrente2", triggerHook:0.33} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( document.getElementById("vidafrente2").dataset.indexfoto );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( document.getElementById("metrobalderas").dataset.indexfoto );
                        }
					})

var scenesobrevivirportada = new ScrollMagic.Scene({triggerElement: "#sobrevivirfotoportada", triggerHook:0.33} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( document.getElementById("sobrevivirfotoportada").dataset.indexfoto );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( document.getElementById("vidafrente2").dataset.indexfoto );
                        }
					})

var scenesobrevivirportada = new ScrollMagic.Scene({triggerElement: "#sobrevivir", triggerHook:0.33} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( document.getElementById("sobrevivir").dataset.indexfoto );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( document.getElementById("sobrevivirfotoportada").dataset.indexfoto );
                        }
					})

var sceneausenciaestadoportada = new ScrollMagic.Scene({triggerElement: "#ausenciaestadofotoportada", triggerHook:0.33} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( document.getElementById("ausenciaestadofotoportada").dataset.indexfoto );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( document.getElementById("sobrevivir").dataset.indexfoto );
                        }
					})

var sceneausenciaestado = new ScrollMagic.Scene({triggerElement: "#ausenciaestado", triggerHook:0.33} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( document.getElementById("ausenciaestado").dataset.indexfoto );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( document.getElementById("ausenciaestadofotoportada").dataset.indexfoto );
                        }
					})

var sceneresilienciafotoportada = new ScrollMagic.Scene({triggerElement: "#resilienciafotoportada", triggerHook:0.6} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( document.getElementById("resilienciafotoportada").dataset.indexfoto );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( document.getElementById("ausenciaestado").dataset.indexfoto );
                        }
					})

var sceneresiliencia = new ScrollMagic.Scene({triggerElement: "#resiliencia", triggerHook:0.5} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( document.getElementById("resiliencia").dataset.indexfoto );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( document.getElementById("resilienciafotoportada").dataset.indexfoto );
                        }
					})

var scenefotobicicleta = new ScrollMagic.Scene({triggerElement: "#resilienciafotobicicleta", triggerHook:0.5} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( document.getElementById("resilienciafotobicicleta").dataset.indexfoto );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( document.getElementById("resiliencia").dataset.indexfoto );
                        }
					})

var scenebicicleta = new ScrollMagic.Scene({triggerElement: "#resilienciabicicleta", triggerHook:0.6} )
					.addTo(controller)
					.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( document.getElementById("resilienciabicicleta").dataset.indexfoto );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( document.getElementById("resilienciafotobicicleta").dataset.indexfoto );
                        }
					})

var scenefotowhatsapp = new ScrollMagic.Scene({triggerElement: "#resilienciafotowhatsapp", triggerHook:0.5} )
					.addTo(controller)
					//.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( document.getElementById("resilienciafotowhatsapp").dataset.indexfoto );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( document.getElementById("resilienciabicicleta").dataset.indexfoto );
                        }
					})

var scenewhatsapp = new ScrollMagic.Scene({triggerElement: "#resilienciawhatsapp", triggerHook:0.6} )
					.addTo(controller)
					.addIndicators() // add indicators (requires plugin)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToIndex( document.getElementById("resilienciawhatsapp").dataset.indexfoto );
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToIndex( document.getElementById("resilienciafotowhatsapp").dataset.indexfoto );
                        }
					})





                    
// build tween
//var tweens1 = TweenMax.from(".gradient", 1.2, {autoAlpha: 0, scale:0.1});
/*
var tweens1 = TweenMax.to(".gradient", 1.8, {"background-image": "linear-gradient(to right, rgba(18,44,68,1), rgba(18,44,68,1))"});
	
	var scene = new ScrollMagic.Scene({triggerElement: "#intro", duration: 250, triggerHook: "onEnter", offset:'300'})
					.setTween(tweens1)
					//.addIndicators() // add indicators (requires plugin)
					.addTo(controller);

var tweens2 = TweenMax.to(".gradient", 1.8, {"background-image": "linear-gradient(to right, rgba(155,255,0,0.5), rgba(155,0,0,100.8))"});
	
    var scene2 = new ScrollMagic.Scene({triggerElement: "#vidafrentevineta", duration: 250, triggerHook: "onEnter", offset:'300'})
                    .setTween(tweens2)
                    //.addIndicators() // add indicators (requires plugin)
                    .addTo(controller);
                    

var tweens3 = TweenMax.to(".gradient", 1.8, {"background-image": "linear-gradient(to right, rgba(18,44,68,1), rgba(18,44,68,1))"});
	
 var scene3 = new ScrollMagic.Scene({triggerElement: "#vidafrente", duration: 250, triggerHook: "onEnter", offset:'300'})
                 .setTween(tweens3)
                 //.addIndicators() // add indicators (requires plugin)
                 .addTo(controller);
*/

/* ------------- useful functions ------------------- */

// option by js
/*
function disableScroll() {
	// Get the current page scroll position
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

		// if any scroll is attempted, set this to the previous value
		window.onscroll = function() {
			window.scrollTo(scrollLeft, scrollTop);
		};
}

function enableScroll() {
	window.onscroll = function() {};
}
*/

// option by css
function disableScroll() {
	document.body.classList.add("stop-scrolling");
}

function enableScroll() {
	document.body.classList.remove("stop-scrolling");
}

function goOutToWebPage(url) {
    window.open(url, '_blank');
}

function loadSection(url) {
    //toggleMainMenu();
    window.open(url, '_self');
}

/* ---------------------------------------------------- */
//var audioplayerI;

function playAudio(ele) {
    if (typeof audioplayerI == "object" ) {
        d3.selectAll(".playaudioicon,.playaudioiconsmall").select("#play").attr( "display", "initial" );
        d3.selectAll(".playaudioicon,.playaudioiconsmall").select("#pause").attr( "display", "none" );
        if ( audioplayerI.getFileRecording() != ele.dataset.file ) {
            audioplayerI.loadRecording( ele.dataset.file );
            audioplayerI.ele = ele;
            d3.select(ele).select("#play").attr( "display", "none" );
            d3.select(ele).select("#pause").attr( "display", "initial" );
        } else {
            if ( audioplayerI.togglePlaying() ) {
                d3.select(ele).select("#play").attr( "display", "initial" );
                d3.select(ele).select("#pause").attr( "display", "none" );
            } else {
                d3.select(ele).select("#play").attr( "display", "none" );
                d3.select(ele).select("#pause").attr( "display", "initial" );
            }
        }
    } 
}

function endAudioPlayer(ele) {
    console.log( "end end end")
    d3.select(ele).select("#play").attr( "display", "initial" );
    d3.select(ele).select("#pause").attr( "display", "none" );
    sketch.transitionToIndex( 9 );
    d3.selectAll('p,h1,h2,h3')
                    .transition()
                    .duration(300)
                    .ease(d3.easeLinear)
                    .style("opacity", "1.0");
}

function startAudioPlayer(ele) {
    console.log( "start")
    d3.select(ele).select("#play").attr( "display", "none" );
    d3.select(ele).select("#pause").attr( "display", "initial" );
    // 10
    sketch.transitionToIndex( ele.dataset.image );
    d3.selectAll('p,h1,h2,h3')
                    .transition()
                    .duration(300)
                    .ease(d3.easeLinear)
                    .style("opacity", "0.0");

    d3.select(ele)
                    .transition()
                    .delay(300)
                    .duration(300)
                    .ease(d3.easeLinear)
                    .style("opacity", "1.0");
    //alert( ele.dataset.image )
}

var vid;

/*
document.addEventListener("DOMContentLoaded", function(event) {
    vid = document.getElementById("videofullscreen");
    vid.onended = function() {
        alert("The video has ended");
    };

    function videoEnded(ele) {
        alert("The video has ended");
    }
});
*/

function playVideo(ele) {
    vid = document.getElementById("videofullscreen");
    vid.src = `../videos/${ele.dataset.file}`;
    vid.style.display = "initial";
    vid.onended = function() {   
        d3.selectAll('p,h1,h2,h3')
                    .transition()
                    .duration(300)
                    .ease(d3.easeLinear)
                    .style("opacity", "1.0")
                    .on("end", () => {
                        vid.style.display = "none";
                        /*sketch.transitionToIndex( 9 );*/
                    });
        
    };
    /*if (vid.hasOwnProperty("onended")) {
        vid.addEventListener("ended", function () {
            alert("Thanks for watching!");
        });
    }*/
    vid.play();
    d3.selectAll('p,h1,h2,h3')
                    .transition()
                    .duration(300)
                    .ease(d3.easeLinear)
                    .style("opacity", "0.0");

    d3.select(ele)
                    .transition()
                    .delay(300)
                    .duration(300)
                    .ease(d3.easeLinear)
                    .style("opacity", "1.0");
    /*if (typeof audioplayerI == "object" ) {
        d3.selectAll(".playvideoicon,.playvideoiconsmall").select("#play").attr( "display", "initial" );
        d3.selectAll(".playvideoicon,.playvideoiconsmall").select("#pause").attr( "display", "none" );
        if ( audioplayerI.getFileRecording() != ele.dataset.file ) {
            audioplayerI.loadRecording( ele.dataset.file );
            audioplayerI.ele = ele;
            d3.select(ele).select("#play").attr( "display", "none" );
            d3.select(ele).select("#pause").attr( "display", "initial" );
        } else {
            if ( audioplayerI.togglePlaying() ) {
                d3.select(ele).select("#play").attr( "display", "initial" );
                d3.select(ele).select("#pause").attr( "display", "none" );
            } else {
                d3.select(ele).select("#play").attr( "display", "none" );
                d3.select(ele).select("#pause").attr( "display", "initial" );
            }
        }
    } */
}

function openDataRef(ele) {
    window.open( ele.dataset.ref, "_blank")
}