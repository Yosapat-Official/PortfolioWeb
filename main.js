//Close Work Window
var userBack = document.getElementsByClassName('item-back')[0];
var reveal = document.getElementById('item-details');

userBack.addEventListener('click', function() {
  reveal.classList.toggle('show');
});

//Show Work Window Base
var userSelection = document.getElementsByClassName('work');

for(var i = 0; i < userSelection.length; i++) {
  (function(index) {
    userSelection[index].addEventListener("click", function() {
      reveal.classList.toggle('show');
     })
  })(i);
}

//Show Each Work Window
var Topic1 = document.getElementsByClassName('topic1');
var Topic1Reveal = document.getElementById('item1-info');

for(var i = 0; i <Topic1.length; i++) {
  (function(index) {
    Topic1[index].addEventListener("click", function() {
      Topic1Reveal.classList.toggle('show2');
     })
  })(i);
}

var Topic2 = document.getElementsByClassName('topic2');
var Topic2Reveal = document.getElementById('item2-info');

for(var i = 0; i <Topic2.length; i++) {
  (function(index) {
    Topic2[index].addEventListener("click", function() {
      Topic2Reveal.classList.toggle('show2');
     })
  })(i);
}

var Topic3 = document.getElementsByClassName('topic3');
var Topic3Reveal = document.getElementById('item3-info');

for(var i = 0; i <Topic3.length; i++) {
  (function(index) {
    Topic3[index].addEventListener("click", function() {
      Topic3Reveal.classList.toggle('show2');
     })
  })(i);
}

var Topic4 = document.getElementsByClassName('topic4');
var Topic4Reveal = document.getElementById('item4-info');

for(var i = 0; i <Topic4.length; i++) {
  (function(index) {
    Topic4[index].addEventListener("click", function() {
      Topic4Reveal.classList.toggle('show2');
     })
  })(i);
}

var Topic5 = document.getElementsByClassName('topic5');
var Topic5Reveal = document.getElementById('item5-info');

for(var i = 0; i <Topic5.length; i++) {
  (function(index) {
    Topic5[index].addEventListener("click", function() {
      Topic5Reveal.classList.toggle('show2');
     })
  })(i);
}

var Topic6 = document.getElementsByClassName('topic6');
var Topic6Reveal = document.getElementById('item6-info');

for(var i = 0; i <Topic6.length; i++) {
  (function(index) {
    Topic6[index].addEventListener("click", function() {
      Topic6Reveal.classList.toggle('show2');
     })
  })(i);
}

var Topic7 = document.getElementsByClassName('topic7');
var Topic7Reveal = document.getElementById('item7-info');

for(var i = 0; i <Topic7.length; i++) {
  (function(index) {
    Topic7[index].addEventListener("click", function() {
      Topic7Reveal.classList.toggle('show2');
     })
  })(i);
}

var Topic8 = document.getElementsByClassName('topic8');
var Topic8Reveal = document.getElementById('item8-info');

for(var i = 0; i <Topic8.length; i++) {
  (function(index) {
    Topic8[index].addEventListener("click", function() {
      Topic8Reveal.classList.toggle('show2');
     })
  })(i);
}

// let cb = document.getElementById("language-toggle");
// cb.addEventListener("click",function(e) { 
//         var langTH = document.getElementsByClassName('th');
//         for (let i = 0 ; i < langTH.length; i++) {
//           langTH[0].classList.toggle("hide");
//         }
//         var langEN = document.getElementsByClassName('en');
//         for (let i = 0 ; i < langEN.length; i++) {
//           langEN[0].classList.toggle("hide");
//         }
// });

$(document).ready(function(){
	$(".switch input").on("change", function(e) {
  	const isOn = e.currentTarget.checked;
    if (isOn) {
    	$(".th").hide();
      $(".en").show();
    } else {
    	$(".th").show();
      $(".en").hide();
    }
  });
});

