
window.scrollTo(0,0);

var scrollPx = 0;
var generativephotographyInstance;

var ismobile = false;
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    ismobile = true;
    //alert("mobile device");
  }
  //else{
    // false for not mobile device
    //alert("not mobile device");
  //}

/********* add icons | botomesaudio y video  *********/

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

d3.selectAll(".playvideoiconsmall").each(function(d) {
    d3.xml("../images/playvideolgbti2small.svg")
        .then(data => {
            let icon = d3.select(this).node().append(data.documentElement);
        })
});

// players audio y video

d3.xml("../images/playeraudio_color.svg")
  .then(data => {
    d3.select("#wrapperaudioplayer #wrapperplayer").node().append(data.documentElement)
  });

d3.selectAll(".wrappervideo .wrapperplayer").each(function(d) {
    d3.xml("../images/playeraudio_color.svg") 
        .then(data => {
            let icon = d3.select(this).node().append(data.documentElement);
        })
});

d3.xml("../images/playerclose_color.svg")
  .then(data => {
    d3.select("#wrapperaudioplayer #wrapperclose").node().append(data.documentElement);
  })

d3.selectAll(".wrappervideo .wrapperclose").each(function(d) {
    d3.xml("../images/playerclose_colorvideo.svg") 
        .then(data => {
            let icon = d3.select(this).node().append(data.documentElement);
        })
});


/***********data visualizations **********/



d3.xml("../images/dv_ciudad_mexico_envejecimiento.svg")
  .then(data => {
    d3.select("#ciudadmexicoenvejecimiento").node().append(data.documentElement);
  })

d3.xml("../images/dv_cuatro_de_diez_pobreza.svg")
  .then(data => {
    d3.select("#cuatrodediezadultos").node().append(data.documentElement);
  })

d3.xml("../images/dv_trans_perdirdas_ingresos.svg")
  .then(data => {
    d3.select("#perdidasingresostrans").node().append(data.documentElement);

    d3.select("#perdidasingresostrans").select("#hombrespie").attr("transform", "rotate(-90 , 367.1 , 81.9)" );
    d3.select("#perdidasingresostrans").select("#hombrespie").style( "stroke-dasharray",  "108 180"); // 180
      
    d3.select("#perdidasingresostrans").select("#mujerespie").attr("transform", "rotate(-90 , 183.2 , 81.9)" )
    d3.select("#perdidasingresostrans").select("#mujerespie").style( "stroke-dasharray",  "126 180");
  })

d3.xml("../images/dv_violencia_seno_familiar.svg")
  .then(data => {
    d3.select("#violenciacenofamiliar").node().append(data.documentElement);
  })

d3.xml("../images/dv_vih_medicacion.svg")
  .then(data => {
    d3.select("#vihmedicacion").node().append(data.documentElement);
  })

d3.xml("../images/dv_violencia1.svg")
  .then(data => {
    d3.select("#violencia1").node().append(data.documentElement);
  })

d3.xml("../images/dv_acceso_salud.svg")
  .then(data => {
    d3.select("#accesosalud").node().append(data.documentElement);
  })

d3.xml("../images/dv_violencia2.svg")
  .then(data => {
    d3.select("#violencia2").node().append(data.documentElement);
  })

d3.xml("../images/dv_uno_de_dos_oculta.svg")
  .then(data => {
    d3.select("#unodedosoculta").node().append(data.documentElement);
  })


d3.xml("../images/dv_92_oculto_orientacion_identidad.svg")
  .then(data => {
    d3.select("#noventaydosoculto").node().append(data.documentElement);
  })





/******* menu sections  **********/
var sectionMenu = {
    on: {
        "historias":"#6E3589",
        "elles":"#6E3589",
        "nosotres":"#6E3589"
    },
    off: {
        "historias": {
            "inicio":"white",
            "portadapreguntas": "white",
            "preguntasportada": "white",
            "elles":"white",
            "introelles":"#6E3589",
            "ciudaddemexico":"#6E3589",
            "centroamerica":"#6E3589",
            "potenciallgbt":"white",
            "vidafrente":"#6E3589",
            "metrobalderas":"white",
            "vidafrente2":"#6E3589",
            "sobrevivirfotoportada":"white",
            "sobrevivir":"#6E3589",
            "ausenciaestadofotoportada":"white",
            "ausenciaestado":"#6E3589",
            "cadenasdeviolenciafoto":"white",
            "cadenasdeviolencia":"#6E3589",
            "resilienciafotoportada":"white",
            "resiliencia":"#6E3589",
            "resilienciafotobicicleta":"white",
            "resilienciabicicleta":"#6E3589",
            "resilienciafotowhatsapp":"white",
            "resilienciawhatsapp":"#6E3589"
        },
        "elles":{
            "inicio":"#6E3589"
        },
        "nosotres": {
            "inicio":"#6E3589"
        }
    }  
};

var currentTriggerElement = "inicio"

var mainmenuIsOpen = false;
var menuicon = document.getElementsByClassName("menuicon");
var headerele = document.querySelectorAll(".borderb");
var footerele = document.getElementById("footercreditos");

function toggleMainMenu() {
    var menuele = document.getElementById("menufullscreen");
 
    if (!mainmenuIsOpen) {
        menuele.classList.add("menufullscreenopen");
        menuicon[0].style.color = sectionMenu.on[currentSection];
        headerele.forEach( (ele) => {
            ele.style["border-color"] = sectionMenu.on[currentSection]
        })
        disableScroll();
    } else {
        menuele.classList.remove("menufullscreenopen");
        menuicon[0].style.color = sectionMenu.off[currentSection][currentTriggerElement];
        headerele.forEach( (ele) => {
            ele.style["border-color"] = sectionMenu.off[currentSection][currentTriggerElement]
        })
        enableScroll();
    }
    mainmenuIsOpen = !mainmenuIsOpen;
}



var controller = new ScrollMagic.Controller();

/******************** portada *********************/
var indexTransPortada = 0;
var rangeTransPortada = 3;
var timerPortada;

var imagesAnimPortada = ["portada01","portada02","portada03"]

function playAnimacionPortada() {
    timerPortada = setInterval(() => {
        indexTransPortada = (indexTransPortada+1)%rangeTransPortada;
        console.log( imagesAnimPortada[indexTransPortada]);
        sketch.transitionToImagename( imagesAnimPortada[indexTransPortada] ) 
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
					.addTo(controller)
                    .on("enter", () => {
                        adjustMainMenu("portadapreguntas");
                    });

var tweens2 = TweenMax.to("#scrolldowniconwrapper,.tooltip", 1.8, {"opacity": "0"});
	
    var scene2 = new ScrollMagic.Scene({triggerElement: "#portadapreguntas", duration: window.innerHeight*0.5, triggerHook:0.749 , offset:-window.innerHeight*0.25})
                    .setTween(tweens2)
                    .addTo(controller);

/**************************************************/

/******************preguntas portada **************/
var scenePreguntas = new ScrollMagic.Scene({triggerElement: "#preguntasportada", triggerHook:0.5,  offset:-window.innerHeight*0.25 } )
					.addTo(controller)
                    .on("enter leave", function (e) {
                        console.log( "enter leave: ", e.target.controller().info("scrollDirection"), e.type, e.type == "enter" ? "inside" : "outside" )
                        if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            stopAnimacionPortada();
                            sketch.duration = 0.6;
                            sketch.transitionToImagename( document.getElementById("preguntasportada").dataset.image  )  // "gradacion1"
                            sketch.play();
                            adjustMainMenu("preguntasportada");
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.stop();
                            sketch.transitionToImagename( imagesAnimPortada[indexTransPortada] ) 
   
                            sketch.duration = 1.0;
                            playAnimacionPortada();
                            sketch.play();
                        }
					})

/**************************************************/


var sceneElles = new ScrollMagic.Scene({triggerElement: "#elles",triggerHook:0.4} )
					.addTo(controller)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.duration = 1;
                            sketch.transitionToImagename( document.getElementById("elles").dataset.image  )
                            adjustMainMenu("elles");
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.duration = 0.6;
                            sketch.transitionToImagename( document.getElementById("preguntasportada").dataset.image  )
                            adjustMainMenu("preguntasportada");
                        }
					})
                    

                    
var sceneIntroelles = new ScrollMagic.Scene({triggerElement: "#introelles", triggerHook:0.33} )
					.addTo(controller)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("introelles").dataset.image  )
                            adjustMainMenu("introelles");
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("elles").dataset.image  )
                            adjustMainMenu("elles");
                        }
					})



var scenecdmx = new ScrollMagic.Scene({triggerElement: "#ciudaddemexico", triggerHook:0.33} )
					.addTo(controller)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("ciudaddemexico").dataset.image  )
                            adjustMainMenu("ciudaddemexico");
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("introelles").dataset.image  )
                            adjustMainMenu("introelles");
                        }
					})


var scenecentroamerica = new ScrollMagic.Scene({triggerElement: "#centroamerica", triggerHook:0.33} )
					.addTo(controller)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("centroamerica").dataset.image  )
                            adjustMainMenu("centroamerica");
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("ciudaddemexico").dataset.image  )
                            adjustMainMenu("ciudaddemexico");
                        }
					})


var scenepotenciallgbt = new ScrollMagic.Scene({triggerElement: "#potenciallgbt", triggerHook:0.33} )
					.addTo(controller)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("potenciallgbt").dataset.image  )
                            adjustMainMenu("potenciallgbt");
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("centroamerica").dataset.image  )
                            adjustMainMenu("centroamerica");
                        }
					})

var scenevidefrente = new ScrollMagic.Scene({triggerElement: "#vidafrente", triggerHook:0.33} )
					.addTo(controller)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("vidafrente").dataset.image  )
                            adjustMainMenu("vidafrente");
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("potenciallgbt").dataset.image  )
                            adjustMainMenu("potenciallgbt");
                        }
					})


var scenebalderas = new ScrollMagic.Scene({triggerElement: "#metrobalderas", triggerHook:0.33} )
					.addTo(controller)
                    .on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("metrobalderas").dataset.image  )
                            adjustMainMenu("metrobalderas");
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("vidafrente").dataset.image  )
                            adjustMainMenu("vidafrente");
                        }
					})

var scenevidefrente2 = new ScrollMagic.Scene({triggerElement: "#vidafrente2", triggerHook:0.33} )
					.addTo(controller)
					.on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("vidafrente2").dataset.image  )
                            adjustMainMenu("vidafrente2");
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("metrobalderas").dataset.image  )
                            adjustMainMenu("metrobalderas");
                        }
					})

var scenesobrevivirportada = new ScrollMagic.Scene({triggerElement: "#sobrevivirfotoportada", triggerHook:0.6} )
					.addTo(controller)
					.on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("sobrevivirfotoportada").dataset.image  )
                            adjustMainMenu("sobrevivirfotoportada")
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("vidafrente2").dataset.image  )
                            adjustMainMenu("vidafrente2")
                        }
					})

var scenesobrevivirportada = new ScrollMagic.Scene({triggerElement: "#sobrevivir", triggerHook:0.7} )
					.addTo(controller)
					.on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("sobrevivir").dataset.image  )
                            adjustMainMenu("sobrevivir")
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("sobrevivirfotoportada").dataset.image  )
                            adjustMainMenu("sobrevivirfotoportada")
                        }
					})

var sceneausenciaestadoportada = new ScrollMagic.Scene({triggerElement: "#ausenciaestadofotoportada", triggerHook:0.45} )
					.addTo(controller)
					.on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("ausenciaestadofotoportada").dataset.image  )
                            adjustMainMenu("ausenciaestadofotoportada")
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("sobrevivir").dataset.image  )
                            adjustMainMenu("sobrevivir")
                        }
					})

var sceneausenciaestado = new ScrollMagic.Scene({triggerElement: "#ausenciaestado", triggerHook:0.45} )
					.addTo(controller)
					.on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("ausenciaestado").dataset.image  )
                            adjustMainMenu("ausenciaestado")
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("ausenciaestadofotoportada").dataset.image  )
                            adjustMainMenu("ausenciaestadofotoportada")
                        }
					})

var scenefotocadenas = new ScrollMagic.Scene({triggerElement: "#cadenasdeviolenciafoto", triggerHook:0.5} )
					.addTo(controller)
					.on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("cadenasdeviolenciafoto").dataset.image  )
                            adjustMainMenu("cadenasdeviolenciafoto")
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("ausenciaestado").dataset.image  )
                            adjustMainMenu("ausenciaestado")
                        }
					})

var scenecadenas = new ScrollMagic.Scene({triggerElement: "#cadenasdeviolencia", triggerHook:0.6} )
					.addTo(controller)
					.on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("cadenasdeviolencia").dataset.image  )
                            adjustMainMenu("cadenasdeviolencia")
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("cadenasdeviolenciafoto").dataset.image  )
                            adjustMainMenu("cadenasdeviolenciafoto")
                        }
					})





var sceneresilienciafotoportada = new ScrollMagic.Scene({triggerElement: "#resilienciafotoportada", triggerHook:0.6} )
					.addTo(controller)
					.on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("resilienciafotoportada").dataset.image  )
                            adjustMainMenu("resilienciafotoportada")
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("cadenasdeviolencia").dataset.image  )
                            adjustMainMenu("cadenasdeviolencia")
                        }
					})

var sceneresiliencia = new ScrollMagic.Scene({triggerElement: "#resiliencia", triggerHook:0.5} )
					.addTo(controller)
					.on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("resiliencia").dataset.image  )
                            adjustMainMenu("resiliencia")
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("resilienciafotoportada").dataset.image  )
                            adjustMainMenu("resilienciafotoportada")
                        }
					})

var scenefotobicicleta = new ScrollMagic.Scene({triggerElement: "#resilienciafotobicicleta", triggerHook:0.55} )
					.addTo(controller)
					.on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("resilienciafotobicicleta").dataset.image  )
                            adjustMainMenu("resilienciafotobicicleta")
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("resiliencia").dataset.image  )
                            adjustMainMenu("resiliencia")
                        }
					})

var scenebicicleta = new ScrollMagic.Scene({triggerElement: "#resilienciabicicleta", triggerHook:0.6} )
					.addTo(controller)
					.on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("resilienciabicicleta").dataset.image  )
                            adjustMainMenu("resilienciabicicleta")
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("resilienciafotobicicleta").dataset.image  )
                            adjustMainMenu("resilienciafotobicicleta")
                        }
					})

var scenefotowhatsapp = new ScrollMagic.Scene({triggerElement: "#resilienciafotowhatsapp", triggerHook:0.5} )
					.addTo(controller)
					.on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("resilienciafotowhatsapp").dataset.image  )
                            adjustMainMenu("resilienciafotowhatsapp")
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("resilienciabicicleta").dataset.image  )
                            adjustMainMenu("resilienciabicicleta")
                        }
					})

var scenewhatsapp = new ScrollMagic.Scene({triggerElement: "#resilienciawhatsapp", triggerHook:0.6} )
					.addTo(controller)
					.on("enter leave", function (e) {
						if ( e.target.controller().info("scrollDirection") == "FORWARD" && e.type == "enter" ) {
                            sketch.transitionToImagename( document.getElementById("resilienciawhatsapp").dataset.image  )
                            adjustMainMenu("resilienciawhatsapp")
                        } else if ( e.target.controller().info("scrollDirection") == "REVERSE" && e.type == "leave" ) {
                            sketch.transitionToImagename( document.getElementById("resilienciafotowhatsapp").dataset.image  )
                            adjustMainMenu("resilienciafotowhatsapp")
                        }
					})



/* ------------- useful functions ------------------- */

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
    window.open(url, '_self');
}

/* ---------------------------------------------------- */


var typeOfPlayer;

function playAudio(ele) {
    document.getElementsByTagName("video").forEach( (videoele) => {
        if ( !videoele.paused ) {
            videoele.pause();
            endVideoPlayer( document.getElementById(  `${videoele.id}w` ) )
        }
    })
    typeOfPlayer = "audio";
    document.getElementById("wrapperaudioplayer").style.clip = "auto";
    d3.select("#wrapperplayer").select("#tempo").style( "stroke-dashoffset", 0 );

    audioplayerI.loadRecording( ele.dataset.file );
    audioplayerI.ele = ele;
    startAudioPlayer(ele)
}

function endAudioPlayer(ele) {
    document.getElementById("wrapperaudioplayer").style.clip = "rect(0 0 0 0)";

    sketch.transitionToImagename( ele.dataset.imagesection  )

    d3.selectAll('section')
                    .transition()
                    .duration(300)
                    .ease(d3.easeLinear)
                    .style("opacity", "1.0");
}

function startAudioPlayer(ele) {

    sketch.transitionToImagename( ele.dataset.image  )

    d3.selectAll('section')
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
}

function closePlayer() {
    
    audioplayerI.stopPlaying();
    endAudioPlayer(audioplayerI.ele)

}

function visualizeAudioTimer( dashoffset ) {
    d3.select("#wrapperplayer").select("#tempo").style( "stroke-dashoffset", dashoffset );
}

function tooglePlayerUI(ele) {
    switch( typeOfPlayer ) {
        case "audio":
            if ( audioplayerI.togglePlaying() ) {
                d3.select(ele).select("#play").attr( "display", "initial" );
                d3.select(ele).select("#pause").attr( "display", "none" );
            } else {
                d3.select(ele).select("#play").attr( "display", "none" );
                d3.select(ele).select("#pause").attr( "display", "initial" );
            }
            break;
        case "video" :
            if ( !vid.paused ) {
                vid.pause();
                d3.select(ele).select("#play").attr( "display", "initial" );
                d3.select(ele).select("#pause").attr( "display", "none" );
            } else {
                vid.play();
                d3.select(ele).select("#play").attr( "display", "none" );
                d3.select(ele).select("#pause").attr( "display", "initial" );
            }
            break;
    }

    
}



var vid;
var timerVideo;
var activeVideoplayer;


function playVideo(wid) {

    document.getElementsByTagName("video").forEach( (videoele) => {
        if ( !videoele.paused ) {
            videoele.pause();
            endVideoPlayer( document.getElementById(  `${videoele.id}w` ) )
        }
    })
    // ismobile
    // vid.controls = true;
    ele = document.getElementById(wid.dataset.idvideow)
    activeVideoplayer = ele;
    vid = ele.getElementsByTagName("video")[0];
    typeOfPlayer = "video";
    if (ismobile) {
        alert( "video mobile ")
        vid.controls = true;
        vid.play(); 
    } else {
        let playerViz = ele.getElementsByClassName("wrapperplayer")[0];
        ele.getElementsByTagName("svg")[1].setAttribute("data-idvideo", wid.dataset.idvideo );
        let closeB = ele.getElementsByClassName("wrapperclose")[0];
        ele.getElementsByTagName("svg")[2].setAttribute("data-idvideo", wid.dataset.idvideo );
        ele.getElementsByTagName("svg")[2].setAttribute("data-idvideow", wid.dataset.idvideow );
        let iconvideoplay = ele.getElementsByClassName("playvideoiconsmall")[0];
        iconvideoplay.style.display = "none"
        playerViz.style.display = "initial"
        closeB.style.display = "initial"
        d3.select(playerViz).select("#tempo").style( "stroke-dashoffset", 0 );
        typeOfPlayer = "video";

        vid.onended = function() {   
            endVideoPlayer(ele);
        };

        d3.select(playerViz).select("#play").attr( "display", "none" );
        d3.select(playerViz).select("#pause").attr( "display", "initial" );
        vid.play(); // mobile & dektop
    
        timerVideo = setInterval( () => {
            let offsetviz = audioplayerI.map( vid.currentTime, 0, vid.duration, 0, 390 );
            d3.select(playerViz).select("#tempo").style( "stroke-dashoffset", offsetviz );
        }, 33) 
    }
                    

}

function toggleVideo(ele) {
    vid = document.getElementById( ele.dataset.idvideo );
    if ( !vid.paused ) {
        vid.pause();
        d3.select(activeVideoplayer).select("#play").attr( "display", "initial" );
        d3.select(activeVideoplayer).select("#pause").attr( "display", "none" );
    } else {
        vid.play();
        d3.select(activeVideoplayer).select("#play").attr( "display", "none" );
        d3.select(activeVideoplayer).select("#pause").attr( "display", "initial" );
    }

}

function endVideoPlayer(ele) {
    if (ismobile) {

    } else {
        let playerViz = ele.getElementsByClassName("wrapperplayer")[0];
        let closeB = ele.getElementsByClassName("wrapperclose")[0];
        let iconvidepplay = ele.getElementsByClassName("playvideoiconsmall")[0];
        iconvidepplay.style.display = "initial"
        playerViz.style.display = "none"
        closeB.style.display = "none"
        vid.controls = false;
    }
        // vid.controls = true;)
    
}

function closePlayerVideo(ele) {
    vidw = document.getElementById( ele.dataset.idvideow );
    vid = document.getElementById( ele.dataset.idvideo );
    vid.pause();
    endVideoPlayer(vidw)
}


function openDataRef(ele) {
    window.open( ele.dataset.ref, "_blank")
}

function adjustMainMenu(currentTriggerEle) {
    currentTriggerElement = currentTriggerEle;
    menuicon[0].style.color = sectionMenu.off[currentSection][currentTriggerElement];
    headerele.forEach( (ele) => {
        ele.style["border-color"] = sectionMenu.off[currentSection][currentTriggerElement]
    })
    footerele.style["border-color"] = sectionMenu.off[currentSection][currentTriggerElement];
    document.getElementsByClassName("creditos").forEach( (ele) => {
        ele.style.color = sectionMenu.off[currentSection][currentTriggerElement];
    })
    //alert(1818)
}

adjustMainMenu("inicio")