var key = '3eea52853f1ad86d6871641e06a68b43';

//geolocation
function getLocation() {
  
var output = document.getElementById("out");


  initialize();

  if (!navigator.geolocation){
    document.querySelector('.curTemp').textContent = "No Location Found";
    return;
  }

  var geocoder;

  function success(position) {
    var lat  = position.coords.latitude;
    var long = position.coords.longitude;

    codeLatLng(lat, long)

    var url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + key + "/" + lat + "," + long + "?units=si";


    $.getJSON(url, function(weather) {
		
//write top current weather

		var date = new Date(weather.currently.time * 1000);
    var hour = date.getHours();

    var curTemp = Math.floor(weather.currently.temperature);

    console.log(weather);

    document.querySelector('.weather-background').src = "inc/icons/" + weather.currently.icon + ".png";
    document.querySelector('.cur-weather-summary').textContent = weather.currently.summary;
    document.query
    document.querySelector('.curUV').textContent = weather.currently.uvIndex;
    document.querySelector('.curWind').textContent = weather.currently.windSpeed + " km/h";
    document.querySelector('.curWindDi.fa-arrow-up').style = "transform: rotate(" + weather.daily.data[0].windBearing + "deg)";

    	
//write daily weather
    	
      document.querySelector('.summary').textContent = weather.daily.summary;
    	document.querySelector('.curTemp').textContent = curTemp;
    	document.querySelector('.curHum').textContent = weather.currently.humidity;
    	document.querySelector('.curUV').textContent = weather.currently.uvIndex;
      
		  document.querySelector('.curPrePe').textContent = weather.daily.data[0].precipProbability + "%";
      document.querySelector('.curPreIn').textContent = weather.daily.data[0].precipIntensity + "mm/h";
      document.querySelector('.dayWind').textContent = weather.daily.data[0].windSpeed + " km/h";
      document.querySelector('.dayWindDi.fa-arrow-up').style = "transform: rotate(" + weather.daily.data[0].windBearing + "deg)";


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

	
// UV
        document.querySelector('.uv-' + i).textContent = weather.hourly.data[i].uvIndex; 
				
			}

      for (var i = 1; i <= 6; i++) {

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

  function initialize() {
      geocoder = new google.maps.Geocoder();

  }

  function codeLatLng(lat, lng) {

      var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
        
          document.querySelector('.city-name').textContent = results[0].address_components[3].short_name;
          console.log(results);
          }
      })
    };

    function error() {
      document.querySelector('.curTemp').textContent = "No Location Found";
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