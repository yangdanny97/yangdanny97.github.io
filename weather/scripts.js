$(document).ready(function(){
	var Geo=getLocation();
	var cityurl='https://api.wunderground.com/api/2160d9c4250d3691/forecast/geolookup/conditions/q/';
	
	function getLocation() {
    	if (navigator.geolocation) {
        	navigator.geolocation.getCurrentPosition(showPosition);
    	} else {
        	alert("Geolocation is not supported by this browser.");
    	}
	}
	function showPosition(position) {
    	console.log('position', [position.coords.latitude, position.coords.longitude]);
    	cityurl= cityurl+position.coords.latitude.toString()+','+position.coords.longitude.toString()+'.json';
    	updatepage();
    	console.log('cityurl',cityurl);
	}

	var temperaturec=0;
	var temperaturef=32;
	
	function updatepage(){
		$.getJSON(cityurl,function(json){
			var source=json.current_observation.icon_url;
			temperaturec = json.current_observation.temp_c;
			temperaturef = json.current_observation.temp_f;		
			$('#icon').attr("src",source);
			$('#display').html(json.current_observation.display_location.full+' : '+json.current_observation.weather);
			updateForecast(json,'#day1',2);
			updateForecast(json,'#day2',4);
			updateForecast(json,'#day3',6);
		});

  		$('#temp').html(temperaturef.toString()+' degrees');
  		$('#change').text("Fahrenheit"); 
	}
    
	function updateForecast(json,day,num){
		$(day).html("<img id='icon' width='75px' src="+
					json.forecast.txt_forecast.forecastday[num].icon_url+" alt='weather icon'></img><p>"+json.forecast.txt_forecast.forecastday[num].title+'</p>');
	}
                                           
	$("#change").click(function(){
    	  if($('#change').text()=='Celsius'){
          $('#change').text('Fahrenheit');
          $('#temp').html(temperaturef.toString()+' degrees');

        }
        else{
          $('#change').text('Celsius');
          $('#temp').html(temperaturec.toString()+' degrees');
        }
        
    });
  
});