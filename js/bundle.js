/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


//
//  Variables
//
//////////////////////////
var i, j, player, title, image, slider, volumeSlider, intv, playlistTracks, fullList, btnMute, btnPlayPause, btnStop, btnNext, btnPrevious, scrubbing;

//////////////////////////
window.onload = function() {
	//
	// Assignments
	//
	////////////////////
	i = 0;
	j = 0;
	player = document.getElementById('player');
	title = document.getElementById('songtitle');
	image = document.getElementById('trackPic');
	slider = document.getElementById('sliderTime');
	volumeSlider = document.getElementById('volumeSlider');
	fullList = document.getElementById("fullList");
	btnMute = document.getElementById("btnMute");
	btnPlayPause = document.getElementById('btnPlayPause');
	btnStop = document.getElementById('btnStop');
	btnNext = document.getElementById('btnNext');
	btnPrevious = document.getElementById('btnPrevious');
	player.volume = 0.3;
	volImg = document.getElementById('volImg');
	listIcon =document.getElementById('listIcon');
	//
	// Event Listeners
	//
	////////////////////

	btnPlayPause.addEventListener('click', initialPlay, false);
	btnStop.addEventListener('click', stopMusic, false);
	btnNext.addEventListener('click', playNext, false);
	btnPrevious.addEventListener('click', playPrevious, false);
	btnMute.addEventListener('click', mute, false);
	volumeSlider.addEventListener('mousemove', volUpDown, false);
	player.addEventListener('timeupdate', scrub, false);
	slider.addEventListener('mousedown',function () {
		scrubbing = true;
	}, false);
	slider.addEventListener('mousemove', changeSliderPos, false);
	slider.addEventListener('mouseup', function () {
		scrubbing = false;
	}, false);
	player.addEventListener('ended', loop, false);
	player.addEventListener('loadstart', hideart, false);
	player.addEventListener('playing', fadeIn, false);
	fullList.addEventListener('click', playClicked, false);

};



/////////////////// *Playlist Assembly* ////////////////////////////
///////////////////////////////////////////////////////////////////


playlistTracks = [];

function Track(title, src, art, composer){
	this.title = title;
	this.src = src;
	this.art = art;
	this.composer = composer;
}

Track.prototype.addToPlaylist = function() {
	playlistTracks.push(this);
};

var track0 = new Track("Stop, Look, Listen", "mp3/stop, look, listen.mp3","images/wizard_thumbnail.jpg", "J Wiz"),
	track1 = new Track("Battering Ram", "mp3/battering ram.mp3", "images/gray-white logo 177.jpg", "J Wiz"),
	track2 = new Track("Limitless", "mp3/limitless.mp3","images/J Wiz 177.jpg", "J Wiz"),
	track3 = new Track("Full Metal Jacket", "mp3/full metal jacket.mp3","images/white-black logo 177.jpg", "J Wiz"),
	track4 = new Track("Starships", "mp3/starships.mp3","images/purple-white177.jpg", "J Wiz");


track0.addToPlaylist();
track1.addToPlaylist();
track2.addToPlaylist();
track3.addToPlaylist();
track4.addToPlaylist();

/////////////////// *Init* ////////////////////////////
///////////////////////////////////////////////////////////////////
function update(){
	document.getElementById('songTime').innerHTML = millisToMins(player.currentTime);
}

function millisToMins(time){
	var sec = Math.floor(time);
	var d=new Date(0,0,0);
	d.setSeconds(sec);
	var hours =d.getHours();
	var minutes = d.getMinutes();
	var seconds = d.getSeconds();
	if(seconds  <= 9.5){
		return "0" + minutes +  " : 0" + seconds;
	}else{
		return "0" + minutes + "  : " + seconds;
	}
}

function hideart(){
	image.src = playlistTracks[j].art;
	image.className = "unseen";

}

function fadeIn(){
	image.className = "fadeIn";
}

/////////////////// *Volume Controls* ////////////////////////////
///////////////////////////////////////////////////////////////////
function volUpDown(){
	player.volume = volumeSlider.value/100;
}

function mute(){
	if(player.muted){
		player.muted = false;
		btnMute.style.color = '#ffffff';
	}else{
		player.muted = true;
		btnMute.style.color = '#8034b3';
	}
}

//////////////////////////////
function changeEvent(){
	btnPlayPause.removeEventListener('click', initialPlay, false);
	btnPlayPause.addEventListener('click', playPauseMusic, false);
}

//////////////////////////////

function changeSliderPos() {
	if (scrubbing) {
		player.currentTime = slider.value;
	}
}
function scrub(){
	if(!scrubbing){
		slider.value = player.currentTime;
	}
}


//Music Play Controls
//
/////////////////////////////

function initialPlay(){
	btnPlayPause.innerHTML = "&#10074&#10074";
	fullList.children[i].className = "highlighted";
	j=0;
	loadPlayer();
	changeEvent();
}

function playPauseMusic(){
	if (player.paused == true){
		player.play();
		btnPlayPause.innerHTML = "&#10074&#10074";
	} else{
		player.pause();
		btnPlayPause.innerHTML = "&#9658";
	}
}

function stopMusic(){
	player.pause();
	slider.value = 0;
	btnPlayPause.innerHTML = "&#9658";
	player.currentTime = 0;
}

function playNext(){
	changeEvent();
	btnPlayPause.innerHTML = "&#10074&#10074";
	player.pause();
	if(j < playlistTracks.length - 1){
		j++;
		fullList.children[j-1].className = "playList";
		fullList.children[j].className = "highlighted";
	}else{
		j = 0;
		fullList.children[playlistTracks.length -1].className = "playList";
		fullList.children[j].className = "highlighted";
	}
	loadPlayer();
}

function playPrevious(){
	changeEvent();
	player.pause();
	btnPlayPause.innerHTML = "&#10074&#10074";
	if(j > 0){
		j--;
		fullList.children[j+1].className = "playList";
		fullList.children[j].className = "highlighted";

	}else{
		j = playlistTracks.length - 1;
		fullList.children[0].className = "playList";
		fullList.children[j].className = "highlighted";
	}
	loadPlayer();
}
function playClicked(event){
	if (player.paused == true){
		for(i=0; i<fullList.children.length; i++){
			fullList.children[i].className = "playList";
			if(fullList.children[i] == event.target){
				j=i;
			}
		}
		loadPlayer();
		fullList.children[j].className = "highlighted";
		fullList.children[j].children[0].className = "fa fa-pause";
		changeEvent();
	}else{
		player.pause();
		for(i=0; i<fullList.children.length; i++){
			fullList.children[i].children[0].className = "fa fa-play-circle";
		}
		fullList.children[j].children[0].className = "fa fa-play-circle";
	}

}

function loadPlayer(){
	player.src = playlistTracks[j].src;
	setTimeout(function(){
		slider.max = (Math.floor(player.duration));
	}, 500);
	title.innerHTML = playlistTracks[j].title;
	intv = setInterval(update, 100);
	player.play();
}

//
//
//Loop Playlist
//////////////////////////////
function loop(){
	playNext();
}

let template = Handlebars.compile($('#trackNames').html());
$("#fullList").append(template(playlistTracks));



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);


__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(0);
__webpack_require__(8);



/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
* FlowType.JS v1.1
* Copyright 2013-2014, Simple Focus http://simplefocus.com/
*
* FlowType.JS by Simple Focus (http://simplefocus.com/)
* is licensed under the MIT License. Read a copy of the
* license in the LICENSE.txt file or at
* http://choosealicense.com/licenses/mit
*
* Thanks to Giovanni Difeterici (http://www.gdifeterici.com/)
*/

(function($) {
   $.fn.flowtype = function(options) {

// Establish default settings/variables
// ====================================
      var settings = $.extend({
         maximum   : 9999,
         minimum   : 1,
         maxFont   : 9999,
         minFont   : 1,
         fontRatio : 35
      }, options),

// Do the magic math
// =================
      changes = function(el) {
         var $el = $(el),
            elw = $el.width(),
            width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
            fontBase = width / settings.fontRatio,
            fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
         $el.css('font-size', fontSize + 'px');
      };

// Make the magic visible
// ======================
      return this.each(function() {
      // Context for resize callback
         var that = this;
      // Make changes upon resize
         $(window).resize(function(){changes(that);});
      // Set changes on load
         changes(this);
      });
   };
}(jQuery));

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * Created by Jwiz on 9/2/2015.
 */
$(document).ready(function(){
    $('.songartist').flowtype({
        minimum   : 300,
        maximum   : 1000,
        minFont   : 12,
        maxFont   : 300,
        fontRatio : 10
    });
    $('footer').flowtype({
        minimum   : 550,
        maximum   : 1000,
        minFont   : 8,
        maxFont   : 280,
        fontRatio : 40
    });
    $('.playList').flowtype({
        minimum   : 200,
        maximum   : 1920,
        minFont   : 8,
        maxFont   : 18,
        fontRatio : 20
    });
    $('#songTime').flowtype({
        minimum   : 300,
        maximum   : 500,
        minFont   : 8,
        maxFont   : 280,
        fontRatio : 20
    });
    $('.info').flowtype({
        minimum   : 200,
        maximum   : 1000,
        minFont   : 8,
        maxFont   : 280,
        fontRatio : 40
    });
    $('.controls').flowtype({
        minimum   : 500,
        maximum   : 1920,
        minFont   : 12,
        maxFont   : 280,
        fontRatio : 40
    });
    $('.contactInfo').flowtype({
        minimum   : 500,
        maximum   : 1920,
        minFont   : 12,
        maxFont   : 280,
        fontRatio : 50
    });
    $('.aboutInfo').flowtype({
        minimum   : 500,
        maximum   : 1920,
        minFont   : 12,
        maxFont   : 280,
        fontRatio : 50
    });
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

$(document).ready(function(){
	$('.naviconMobile').click(function(){
		if($('header').hasClass('closed')){
			$('main').css('top', '100px');
			$('header').css('z-index', 2).removeClass('closed');
			$('.naviconMobile').css('color', '#5b079c');
		}else{
			$('main').css('top', 0);
			$('header').css('z-index', -1).addClass('closed');
			$('.naviconMobile').css('color', 'white');
		}
	});

	$('.navicon').click(function(){
		if($('header').hasClass('closed')){
			$('main').css('top', '100px');
			$('header').css('z-index', 2).removeClass('closed');
			$('.naviconMobile').css('color', '#5b079c');
		}else{
			$('main').css('top', 0);
			$('header').css('z-index', -1).addClass('closed');
			$('.naviconMobile').css('color', 'white');
		}
	});
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__musicPlayer_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__musicPlayer_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__musicPlayer_js__);

(function(){

  let template = Handlebars.compile($('#trackNames').html());
  $("#fullList").append(template(__WEBPACK_IMPORTED_MODULE_0__musicPlayer_js__["playlistTracks"]));

}());

/***/ })
/******/ ]);