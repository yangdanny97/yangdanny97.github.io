
var projectslist = ["p1","p2","p3","p4", "p5", "p6"];

var details = {
p1: "<p class='details unselectable'>[ Python, Javascript, React Native ]<br>[ Jan. 2017 - present ]</p><p class='details unselectable'>Worked on automatic email scripts and created dozens of REST API endpoints</p><p class='details unselectable'>Led team of 3 mobile devs to create mobile app for StartupTree platform in Summer 2017</p></a>",
p2: "<a href='https://yangdanny97.github.io/US-foreign-aid-visualizer/' target='_blank'><p class='details unselectable'>[ R, Javascript, D3.js ]<br>[ Feb. - May 2017 ]</p><p class='details unselectable'>Dynamic visualization of US Foreign aid spending vs HDI, Happiness, and Democracy scores worldwide</p>",
p3: "<a href='http://cornellcuprobotics.com/' target='_blank'><p class='details unselectable'>[ Python, Java, Javascript ]<br>[ Jan. 2017 - present ]</p><p class='details unselectable'>Worked on the software platform for Minibot, Cornell Cup's educational robotics platform</p><p class='details unselectable'>Contributed to: Python API for custom scripts, Minibot simulator with JBox2D physics backend, and control system GUI.</p></a>",
p4: "<a href='https://devpost.com/software/proton-positivity-generator' target='_blank'><p class='details unselectable'>[ Python, Javascript ]<br>[ Jan. 2017 ]</p><p class='details unselectable'>Web app with custom interface and skills for Amazon Alexa</p><p class='details unselectable'>Generates compliments using Markov chain</p><p class='details unselectable'>Eliminated the Alexa wake word</p></a>",
p5: "<a href='https://github.com/yangdanny97/CoopMaster' target='_blank'><p class='details unselectable'>[ Java, Android Studio ]<br>[ Jan. - Feb. 2017 ]</p><p class='details unselectable'>Data collection and visualization tool for backyard hen owners</p><p class='details unselectable'>Finalist at Cornell Animal Health Hackathon, released on app store in Feb. 2017</p></a>",
p6: "<a href='https://devpost.com/software/fun-with-foursquare' target='_blank'><p class='details unselectable'>[ Java, Javascript, Android Studio ]<br>[ Oct. 2016 ]</p><p class='details unselectable'>Android app built with FourSquare API and Wikitude</p><p class='details unselectable'>Uses AR to display icons pointing to nearby locations that are trending on Foursquare</p></a>"};

var original = {
p1: "<div class='text-center'><h4>StartupTree <img src='images/startuptree.png' width='60px' alt='startuptree logo'/></h4><p class='unselectable'>Backend Developer, Mobile Team Lead</p></div>",
p2: "<div class='text-center'><h4><a href='https://yangdanny97.github.io/US-foreign-aid-visualizer/' target='_blank'>US Foreign Aid <img src='images/d3.png' width='60px' alt='d3 logo'/></a></h4><p class='unselectable'>Dynamic Data Visualization</p></div>",
p3: "<div class='text-center'><h4><a href='http://cornellcuprobotics.com/' target='_blank'>Cornell Cup <img src='images/cup.png' width='60px' alt='Cup logo'/></a></h4><p class='unselectable'>Minibot Platform Team</p></div>",
p4: "<div class='text-center'><h4 class='unselectable'><a href='https://devpost.com/software/proton-positivity-generator' target='_blank'>Proton<img src='images/alexa.png' width='80px' alt='Alexa Logo'/></a></h4><p class='unselectable'>HackDavis 2017 Honorable Mention</p></div>",
p5: "<div class='text-center'><h4 class='unselectable'><a href='https://github.com/yangdanny97/CoopMaster' target='_blank'>CoopMaster <img src='images/coopmasterlogo.png' width='70px' alt='Alexa Logo'/></a></h4><p class='unselectable'>Animal Health Hackathon Finalist</p></div>",
p6: "<div class='text-center'><h4 class='unselectable'><a href='https://devpost.com/software/fun-with-foursquare' target='_blank'>FunSquare <img src='images/funsquare.png' width='60px' alt='Funsquare Logo'/></a></h4><p class='unselectable'>HackNY 2016 First Place</p></div>"};

var active = null;

function setActive(number){
	var projects = ["p1","p2","p3","p4","p5","p6"];
	projects.splice(number-1,1);
	projects.forEach(function(e){
		document.getElementById(e).innerHTML = original[e];
		});
	document.getElementById(projectslist[number-1]).innerHTML = details["p"+number.toString()];
	active = projectslist[number-1];
}

function toggleActive(number){
	if (active == projectslist[number-1]){
		document.getElementById(projectslist[number-1]).innerHTML = original["p"+number.toString()];
		active = null;
	} else {
        var projects = ["p1","p2","p3","p4","p5","p6"];
        projects.splice(number-1,1);
        projects.forEach(function(e){
            document.getElementById(e).innerHTML = original[e];
            });
        document.getElementById(projectslist[number-1]).innerHTML = details["p"+number.toString()];
        active = projectslist[number-1];
	}		
}

document.addEventListener("DOMContentLoaded", function() { 
  projectslist.forEach(function(e){
    document.getElementById(e).innerHTML = original[e];
  	document.getElementById(e).addEventListener('mouseenter',function() {
        setActive(e.substr(1));
    });
    document.getElementById(e).addEventListener('click',function() {
        toggleActive(e.substr(1));
    });
  });
});

document.getElementById('projects').addEventListener('mouseleave',function() {
        active = null;
        projectslist.forEach(function(e){
        	document.getElementById(e).innerHTML = original[e];
        });             
    });

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

