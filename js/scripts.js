
var projectslist = ["p1","p2","p3","p4"];
var active = null;

function setActive(number){
	var projects = [1,2,3,4];
	projects.splice(number-1,1);
	projects.forEach(function(e){
		var id='p'+e.toString();
		document.getElementById(id).innerHTML = original[e-1];
		});
	document.getElementById(projectslist[number-1]).innerHTML = details[number-1];
	active = projectslist[number-1];
}

function toggleActive(number){
	if (active == projectslist[number-1]){
		console.log(number);
		document.getElementById(projectslist[number-1]).innerHTML = original[number-1];
		active = null;
	} else {
		var projects = [1,2,3,4];
		projects.splice(number-1,1);
		projects.forEach(function(e){
			var id='p'+e.toString();
			document.getElementById(id).innerHTML = original[e-1];
		});
		document.getElementById(projectslist[number-1]).innerHTML = details[number-1];
		active = projectslist[number-1];
	}		
}

document.getElementById('about-btn').addEventListener('click',function() {
        $('html, body').animate({
            scrollTop: $("#about-marker").offset().top - 50
        }, 600)
    });

document.getElementById('projects-btn').addEventListener('click',function() {
        $('html, body').animate({
            scrollTop: $("#projects-marker").offset().top - 50
        }, 600)
    });

document.getElementById('cornell-cup').addEventListener('click',function() {
        $('html, body').animate({
            scrollTop: $("#projects-marker").offset().top - 50
        }, 600)
    });

document.addEventListener("DOMContentLoaded", function() { 
  projectslist.forEach(function(e){
  	document.getElementById(e).addEventListener('mouseenter',function() {
        setActive(projectslist.indexOf(e)+1);
    });
    document.getElementById(e).addEventListener('click',function() {
    	console.log("toggle");
        toggleActive(projectslist.indexOf(e)+1);
    });
  });
});


document.getElementById('projects').addEventListener('mouseleave',function() {
        var i = 0;
        active = null;
        projectslist.forEach(function(e){
        	document.getElementById(e).innerHTML = original[i];
        	i+=1; 
        });             
    });


var details = ["<p class='details'>[ Python, Java, Javascript ] [ Jan. 2017 - present ]</p><p class='details'>Worked on the software platform for Minibot, an educational robotics platform being developed by Cornell Cup</p><p class='details'>Contributed to: Python API for custom scripts, Minibot simulator with JBox2D physics backend, and GUI for controlling the Minibot/simulator.</p>",
"<p class='details'>[ Python, Javascript ] [ Jan. 2017 ]</p><p class='details'>Web app with custom interface and skills for Amazon Alexa</p><p class='details'>Original compliment generation using Markov Chains</p><p class='details'>Eliminated the Alexa wake word for smoother UX</p>",
"<p class='details'>[ Java, Android Studio ] [ Jan. 2017 - Feb. 2017 ]</p><p class='details'>Data collection and visualization tool for owners of backyard hen flocks like my parents</p><p class='details'>Graphs behavioral trends in flock over time to track flock health</p><p class='details'>Finalist at Cornell Animal Health Hackathon, released on app store in Feb. 2017</p>",
"<p class='details'>[ Java, Javascript, Android Studio ] [ Oct. 2016 ]</p><p class='details'>Android app built with FourSquare API and Wikitude</p><p class='details'>Uses AR to display icons pointing to nearby locations that are trending on Foursquare</p>"];

var original = ["<div class='text-center'><h4>Cornell Cup <img src='images/cup.png' width='60px' alt='Cup logo'/></h4><p>Minibot Platform Team</p></div>",
"<div class='text-center'><h4><a href='https://devpost.com/software/proton-positivity-generator' target='_blank'>Proton<img src='images/alexa.png' width='80px' alt='Alexa Logo'/></a></h4><p>HackDavis 2017 Honorable Mention</p></div>",
"<div class='text-center'><h4><a href='https://github.com/yangdanny97/CoopMaster' target='_blank'>CoopMaster <img src='images/coopmasterlogo.png' width='70px' alt='Alexa Logo'/></a></h4><p>Animal Health Hackathon Finalist</p></div>",
"<div class='text-center'><h4><a href='https://devpost.com/software/fun-with-foursquare' target='_blank'>FunSquare <img src='images/funsquare.png' width='60px' alt='Funsquare Logo'/></a></h4><p>HackNY 2016 First Place</p></div>"];




