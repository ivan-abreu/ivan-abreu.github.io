// Ivan Abreu 2021
// http://ivanabreu.net

var canvas;

var AudioPlayerLGBTI = function(p) {
    p.ele;
    p.file = "Audio_00.mp3";
    var playingStatus = 0;
    var playingStatusPrev = 0;
    var song;
    var audioReady = false;
    var button;
    var amp;
    var showInfo = false;
    var bars = new Array();
    var barW = 8; // 4
    var vol = 0;
    var volScaled = 0;
    var rectLimit = 0;

    var colorLGBTIQplus = ['#00000000', '#d12d1f','#ef9135','#fbec4f','#377e35','#1e4cf3','#6c1683','#00000000'];

    var colorTrans = ['#00000000', '#7acbf5','#e9acb8','#ffffff','#e9acb8','#7acbf5','#00000000'];

    var colorLes = ['#00000000', '#c43d1e','#df7b3c','#f09c63','#ffffff','#c368a3','#aa5a8f','#961d60','#00000000'];

    var colorGay = ['#00000000', '#3e8b71','#63caab','#abe5c3','#ffffff','#85abdb','#4f49c4','#381c73','#00000000'];

    var colorLesTrans = ['#00000000', '#c43d1e','#df7b3c','#f09c63','#ffffff','#c368a3','#aa5a8f','#961d60','#00000000','#7acbf5','#e9acb8','#ffffff','#e9acb8','#7acbf5','#00000000'];

    var colorLGT = {};
    colorLGT['lgbtiqplus'] = colorLGBTIQplus;
    colorLGT['trans'] = colorTrans;
    colorLGT['les'] = colorLes;
    colorLGT['gay'] = colorGay;
    colorLGT['lestrans'] = colorLesTrans;
    //colorLGT['hiper'] = colorLesTrans;

    var selectedG = 'lestrans';

    p.loadRecording = function(f) {
        p.file = f;
        song.stop();
        song = p.loadSound(  `../audios/${f}` , loaded);
    } 

    p.getFileRecording = function() {
        return p.file;
    } 

    p.setup = function(){
        //canvas = createCanvas(windowWidth-50, 300);
        canvas = p.createCanvas(300, p.windowHeight-80);
        //canvas = p.createCanvas(300, p.windowHeight);
        canvas.position(40, 40);
        song = p.loadSound('../audios/Audio_00.mp3');
        amp = new p5.Amplitude();
        var totalBars = (p.windowWidth-50)/barW; 
        for(var i=0; i<totalBars; i++) {
            bars[i] = 0; //(i%2+1)*20;
        }
        p.noStroke();
        p.fill(255);
    }

    function loaded() {
        song.play();
        song.setVolume(0.4);
        song.onended( endPlayer );
    }

    p.draw = function() {
        p.clear();
        let changingPlayinStatus = playingStatus - playingStatusPrev;
        //if ( changingPlayinStatus == -1 && song.currentTime() == song.duration() ) endAudioPlayer(p.ele);
        /*if ( changingPlayinStatus == 1 ) { 
            startAudioPlayer(p.ele);
        } else if ( changingPlayinStatus == -1 ) {
            endAudioPlayer(p.ele);
        }*/
        
        playingStatusPrev = playingStatus
        if ( song.isPlaying() ) {
            playingStatus = 1;
            vol = amp.getLevel();
            volScaled = vol*2.25;
            var levelG = p.map(vol, 0, 0.3, 0, 180);
            bars.pop();
            bars.unshift(levelG);
            rectLimit += 0.05;
            let offsetviz = p.map( song.currentTime(), 0, song.duration(), 0, 390 );
            visualizeAudioTimer( offsetviz );
        } else { 
            playingStatus = 0; 
            rectLimit -= 0.05;
            var levelG = 0;
            bars.pop();
            bars.unshift(levelG);
        }
        rectLimit = p.constrain(rectLimit, 0, 1);
        for(var i=0; i<bars.length; i++) {
            var y = p.map(i, 0, bars.length, 0, p.height);
            var xF = p.map(i, 0, bars.length, 2, 0);
            p.rect(0, y , bars[i]*p.random( (rectLimit - (volScaled*xF))  ,(rectLimit + (volScaled*xF)) )*xF  , barW-10 );
        }

    }

    p.togglePlaying = function() {
        let playing = song.isPlaying();
        if (!song.isPlaying()) {
            song.play();
            song.setVolume(0.3);
            return playing;
        } else {
            song.pause();
            volScaled = 0;
            return playing;
        }
    }

    p.stopPlaying = function() {
        song.stop(0);
        volScaled = 0;
    }

    function endPlayer() {
        if ( p.abs( song.currentTime() - song.duration() ) < 0.002 ) {
            endAudioPlayer(p.ele);
        }
    }
    

}

let audioplayerI = new p5(AudioPlayerLGBTI, 'wrapperaudiovisualizer');