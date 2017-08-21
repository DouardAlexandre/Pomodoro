$(document).ready(function(){

	let seconds = 0;
	let minutes = 25;
	let interval;
	let work_activated =true;
	let relax_activated=false;
	let four_sprint=0;
	let timer_activated=false;
	let animation_activated=false;
	let sound_on=true;
	//affichage timer
	$('#timer').html(minutes+" : "+seconds+"0" ) ;


	/*----------------------TIMER------------------------------------*/



	function timer(){

    //secondes
    if (seconds == 0 && minutes != 0){
    	minutes--;
    	seconds=60;
    }
	//decrementation seconds
	seconds--;
	//Si fin du travail ---relax   5m = 300000 ms
	if (seconds == 0 && minutes == 0 && work_activated == true && four_sprint!=4 ){
		seconds=60;
		minutes = 4;
		work_activated=false;
		relax_activated=true;
		four_sprint++;
		$('#power_up')[0].play();
		//sablier
		$('#sand').css({height:'2px'});
		$('#sand').stop();
		rotate(0);
		$('#sand').animate({height:"305px"}, {duration: 300000});
		$('#sand').css('background-color', 'green');
		
	}
    //Si fin de relax --at work   25mn = 1500000 ms
    if (seconds == 0 && minutes == 0 && work_activated == false && four_sprint!=4 ){
    	seconds=60;
    	minutes = 24;
    	work_activated=true;
    	relax_activated=false;
    	$('#horn')[0].play();
    	//sablier
    	$('#sand').css({height:'2px'});
    	$('#sand').stop();
    	rotate(0);
    	$('#sand').animate({height:"305px"}, {duration: 1500000});
		$('#sand').css('background-color', 'blue');
    }
    //apres 4 sprints  -- longue pause  20mn = 900000 ms
    if (seconds == 0 && minutes == 0 && four_sprint==4){
    	seconds=60;
    	minutes=19;
    	$('#sand').animate({height:"305px"}, {duration: 900000});
    	$('#sand').css({height:'2px'});
    	$('#sand').stop();
    	relax_activated=false;
    	$('#sand').css('background-color', 'red');
    }
	//affichage des zeros timer
	if(minutes<10 && seconds<10 ){
		$('#timer').html("0"+minutes+" : "+"0"+seconds) ;
	}
	if(minutes<10 && seconds>10 ){
		$('#timer').html("0"+minutes+" : "+seconds) ;
	}
	if(minutes>10 && seconds>10){
		$('#timer').html(minutes+" : "+seconds) ;
	}
	if(minutes>10 && seconds<10){
		$('#timer').html(minutes+" : "+"0"+seconds) ;
	}
	//timeout seconds-------------------------------------------------------interval timer
	interval = setTimeout(timer,1000);

	//animations sand timer
	if(work_activated==true && four_sprint!=4 && animation_activated==false){
		//at work   25mn = 1500000 ms
		$('#sand').animate({height:"305px"}, {duration: 1500000});
		animation_activated=true;
		$('#sand').css('background-color', 'blue');
	} 
	
}

/*------------button pause----------------*/

//space bar
$(window).keydown(function(e){
	if (e.keyCode == 32) {
		pause();
	}
});

//click pause
$('#pause').click(function(){
	pause();
});    

function pause(){
	//stop timer
	clearTimeout(interval);
	//stop animation
	$('#sand').stop();
	timer_activated = false;
	//play on / pause off
	$('#play').css('background-image', 'url(assets/images/play.png)');
	$('#pause').css('background-image', 'url(assets/images/pause_off.png)');
	//sound off
	$('#alert')[0].pause();
	$('#horn')[0].pause();
	$('#power_up')[0].pause();
}

/*----------button play------------------*/

//press enter
$(window).keydown(function(e){
	if (e.keyCode == 13) {
		play();
	}
});

//click play
$('#play').click(function(){
	play();
});

function play(){

	if (timer_activated == false && sound_on==true){
		$('#alert')[0].play();
	}
	if (interval == null){
		rotate(0);
		timer();
		timer_activated = true;
	}
	//pause reset
	if (timer_activated == false){
		timer();
		timer_activated = true;
	}
	//butoons on/off
	$('#play').css('background-image', 'url(assets/images/play_off.png)');
	$('#pause').css('background-image', 'url(assets/images/pause.png)');
	$('#reset').css('background-image', 'url(assets/images/reset.png)');
}

/*-----------------button reset----------------------*/

//press "R"
$(window).keydown(function(e){
	if (e.keyCode == 82) {
		reset();
	}
});

//click reset
$('#reset').click(function(){
	reset();
}); 

function reset(){
	timer_activated=false;
	//reset animation
	$('#sand').stop();
	//reset animation css
	$('#sand').css({height:'4px'});
	//reset timeout
	clearTimeout(interval);
	//reset time
	interval = null;
	seconds = 0;
	minutes = 25;
	//display
	$('#timer').html(minutes+" : "+seconds+"0" ) ;
	$('#pause').css('background-image', 'url(assets/images/pause.png)');
	$('#play').css('background-image', 'url(assets/images/play.png)');
	$('#reset').css('background-image', 'url(assets/images/reset_off.png)');
	//reset song
	$('#alert')[0].pause();
	$('#alert')[0].currentTime = 0;
	$('#horn')[0].pause();
	$('#horn')[0].currentTime = 0;
	$('#power_up')[0].pause();
	$('#power_up')[0].currentTime = 0;
}


/*----------------button options--------------------*/


//toggle menu
$('#options').click(function(){
	if ( $('.menu').is(':visible')) {
		$('#options').css('background-image', 'url(assets/images/options.png)');
	}else{
		$('#options').css('background-image', 'url(assets/images/options_off.png)');
	}
	$('.menu').slideToggle("fast");
	
});   

//fermeture menu
$('.cross').click(function(){
	$('#options').css('background-image', 'url(assets/images/options.png)');
	$('.menu').slideToggle("fast");
});   

/*---------------------button sound------------------*/

$('#sound').click(function(){
	if(sound_on==true){
		$('#alert')[0].pause();
		$('#sound').css('background-image', 'url(assets/images/sound_off.png)');
		sound_on=false;
	}else{
		//$('#alert')[0].play();
		$('#sound').css('background-image', 'url(assets/images/sound.png)');
		sound_on=true;
	}
});  


/*---------------------rotate hourglass------------------*/

function rotate(degree) {   
	let sablier = $('#container');     
	sablier.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});  
	sablier.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
	animation = setTimeout(function() {
		rotate(degree+2);
	},1);   
	if (degree==180)  {
		clearTimeout(animation);
	}             
}

/*---------------------Audio------------------*/

//création div audio
$('<audio id="alert"><source src="assets/sound/alert.mp3" type="audio/mp3"><source src="assets/sound/power_up.mp3" type="audio/mp3"></audio>').appendTo('body');
$('<audio id="horn"><source src="assets/sound/horn.mp3" type="audio/mp3"></source></audio>').appendTo('body');
$('<audio id="power_up"><source src="assets/sound/power_up.mp3" type="audio/mp3"></source></audio>').appendTo('body');
});

