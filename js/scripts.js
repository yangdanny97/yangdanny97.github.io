
document.getElementById('about-btn').addEventListener('click',function() {
        $('html, body').animate({
            scrollTop: $("#about-marker").offset().top
        }, 600)
    });

document.getElementById('projects-btn').addEventListener('click',function() {
        $('html, body').animate({
            scrollTop: $("#projects-marker").offset().top
        }, 600)
    });
