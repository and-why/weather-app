var key = '3eea52853f1ad86d6871641e06a68b43';

//geolocation
function getLocation() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var lat  = position.coords.latitude;
    var long = position.coords.longitude;

    var url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + key + "/" + lat + "," + long + "?units=si";

    console.log(lat);



    $.getJSON(url, function(weather) {
		
		var date = new Date(weather.currently.time * 1000);

    var hour = date.getHours();

    console.log(weather);

    
    document.querySelector('.weather-background').src = "inc/icons/" + weather.currently.icon + ".png";
    document.querySelector('.cur-weather-summary').textContent = weather.currently.summary;

    

    	
//write current weather
    	document.querySelector('.summary').textContent = weather.daily.summary;
    	document.querySelector('.curTemp').textContent = Math.floor(weather.currently.temperature);
    	document.querySelector('.curHum').textContent = weather.currently.humidity;
    	document.querySelector('.curUV').textContent = weather.currently.uvIndex;
    	document.querySelector('.curWind').textContent = weather.currently.windSpeed + " km/h";
		
		var max_temp = 0;
    	for (var i = 0; i <= 24; i++) {
		
				document.querySelector('.im-' + i ).src = "inc/icons/" + weather.hourly.data[i].icon + ".svg";
//time
				var time = new Date(weather.hourly.data[i].time * 1000)

				console.log(time);
				var hour = time.getHours();


        if(hour == 0) {
          document.querySelector('.tm-' + i ).textContent = +hour +12 + " AM";
        }
				else if(hour > 12){
					document.querySelector('.tm-' + i ).textContent = +hour -12 + " PM";
				} else {
					document.querySelector('.tm-' + i ).textContent = hour + " AM";
				}

        
				
			
// temp
				document.querySelector('.tmp-' + i ).textContent = Math.floor(weather.hourly.data[i].temperature);
				
				

				if(weather.hourly.data[i].temperature > max_temp ) {
					max_temp = weather.hourly.data[i].temperature;
				} 

				
			}

      for (var i = 0; i <= 6; i++) {

        var daily = new Date(weather.daily.data[i].time * 1000)

        var day = daily.getDay();
        
        console.log(day);
        
        if(day == 0) {
          document.querySelector('.dy-' + i).textContent = "Sunday";
        } else if (day == 1) {
          document.querySelector('.dy-' + i).textContent = "Monday";
        } else if (day == 2) {
          document.querySelector('.dy-' + i).textContent = "Tuesday";
        } else if (day == 3) {
          document.querySelector('.dy-' + i).textContent = "Wednesday";
        } else if (day == 4) {
          document.querySelector('.dy-' + i).textContent = "Thursday";
        } else if (day == 5) {
          document.querySelector('.dy-' + i).textContent = "Friday";
        } else {
          document.querySelector('.dy-' + i).textContent = "Saturday";
        }

        document.querySelector('.dth-' + i).textContent = Math.floor(weather.daily.data[i].temperatureHigh) + " °C";
        document.querySelector('.dtl-' + i).textContent = Math.floor(weather.daily.data[i].temperatureLow) + " °C";
      
        document.querySelector('.dsm-' + i).textContent = weather.daily.data[i].summary;
      }


    });


			

}

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  navigator.geolocation.getCurrentPosition(success, error);
}


/*
function getWeatherData(lat, long){
     var url = "https://api.darksky.net/forecast/" + key + "/" + lat + "," + long;
     
    //get darksky api data
    $.ajax({
      url: url,
      dataType: "jsonp",
      success: function (weatherData) { 
        //icon information (explained after)
        console.log(weatherData.currently.icon);
        //weather description
        var description = weatherData.currently.summary;
        //change background image
        //temperature
        var temperature = weatherData.currently.temperature;
      }
    });
  }


*/