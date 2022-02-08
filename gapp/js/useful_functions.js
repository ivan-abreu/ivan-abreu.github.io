function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function constrain(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}

function norm(v, a, b ) {
  let min_number = Math.min(a,b);
  let valnorm = (v-min_number) / Math.abs(b-a) ;
  return valnorm;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function dist(x1, y1, x2, y2) {
	return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}

function lerpListNorm(list, posNorm ) {
  posNorm = constrain(posNorm, 0.0, 1.0);
  let indexFloat = lerp(0.0, list.length-1, posNorm);
  let indexStart = Math.floor(indexFloat);
  let indexEnd = Math.ceil(indexFloat);
  let stepNorm = 1.0 / (list.length-1);
  let posIndexNorm = norm(posNorm, (indexStart*stepNorm), (indexEnd*stepNorm));
  posIndexNorm = constrain(posIndexNorm, 0, 1);
  let val = lerp(list[indexStart], list[indexEnd], posIndexNorm);
  return val;
}

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};


var fNumber = {
    sepMil: ",", // separador para los miles
    sepDec: '.', // separador para los decimales
    formatear:function (num){
    num +='';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDec + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
    splitLeft = splitLeft.replace(regx, '$1' + this.sepMil + '$2');
    }
    return this.simbol + splitLeft + splitRight;
},
    go:function(num, simbol){
    this.simbol = simbol ||'';
    return this.formatear(num);
    }
}

$.fn.gparent = function( recursion ) {
    //console.log( 'recursion: ' + recursion );
    if ( recursion > 1 ) return $(this).parent().gparent( recursion - 1 );
    return $(this).parent();
};

// Object.prototype.getKeyByValue = function( value ) {
//     for( var prop in this ) {
//         if( this.hasOwnProperty( prop ) ) {
//              if( this[ prop ] === value )
//                  return prop;
//         }
//     }
// }

function objectKeyByValue (obj, val) {
  return Object.entries(obj).find(i => i[1] === val);
}

function isFormatFile(str , ext) { 
  return ( ( str.length - str.search(ext) ) == ext.length ) ;
}


function extractDomain(url) {
  var domain;
  //find & remove protocol (http, ftp, etc.) and get domain
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  }
  else {
    domain = url.split('/')[0];
  }
  
  //find & remove www
  if (domain.indexOf("www.") > -1) { 
    domain = domain.split('www.')[1];
  }
  
  domain = domain.split(':')[0]; //find & remove port number
  domain = domain.split('?')[0]; //find & remove url params
  domain = domain.split('#')[0]; //find & remove url params

  return domain;
}

