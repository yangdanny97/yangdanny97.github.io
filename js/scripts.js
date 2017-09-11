
var projectslist = ["p1","p2","p3","p4", "p5", "p6"];

var details = {
p1: "<p class='details unselectable'>[ Python, Javascript ]<br>[ Jan. - Aug. 2017 ]</p><p class='details unselectable'>Implemented robust endpoints across the entire mobile service using Django REST Framework</p><p class='details unselectable'>Optimized an existing endpoint to reduce response time by 66% and wrote extensive unit tests for all endpoints</p></a>",
p2: "<a href='https://yangdanny97.github.io/US-foreign-aid-visualizer/' target='_blank'><p class='details unselectable'>[ R, Javascript, D3.js ]<br>[ Feb. - May 2017 ]</p><p class='details unselectable'>Created an interactive world map visualization of the flow of US foreign aid mapped against various metrics like happiness index, HDI, and democracy index, featuring detailed tooltips and a country comparison tool</p>",
p3: "<a href='http://cornellcuprobotics.com/' target='_blank'><p class='details unselectable'>[ Python, Java, Javascript ]<br>[ Jan. 2017 - present ]</p><p class='details unselectable'>Worked on the software platform for Minibot, Cornell Cup's educational robotics platform</p><p class='details unselectable'>Helped implement physics backend and optimized frontend display for virtual bot/obstacle simulator</p></a>",
p4: "<a href='https://devpost.com/software/proton-positivity-generator' target='_blank'><p class='details unselectable'>[ Python, Javascript ]<br>[ Jan. 2017 ]</p><p class='details unselectable'>Developed an animated custom web interface for Amazon Alexa that eliminates the wake word</p><p class='details unselectable'>Created custom Alexa skill that generates speech using Markov chains</p><p>Honorable mention at HackDavis 2017</p></a>",
p5: "<a href='https://github.com/yangdanny97/CoopMaster' target='_blank'><p class='details unselectable'>[ Java, Android Studio ]<br>[ Jan. - Feb. 2017 ]</p>Led team of four developers to create Android application that allows owners of chickens to log and visualize data for backyard chicken flocks</p><p class='details unselectable'>Finalist at Cornell Animal Health Hackathon</p></a>",
p6: "<a href='https://devpost.com/software/fun-with-foursquare' target='_blank'><p class='details unselectable'>[ Java, Javascript, Android Studio ]<br>[ Oct. 2016 ]</p><p class='details unselectable'>Developed Android application that uses AR markers to display nearby locations that are trending on Foursquare</p><p class='details unselectable'>First Place at HackNY 2016</p></a>"};

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

