var key = '3eea52853f1ad86d6871641e06a68b43';

// var city = prompt("Choose City");

var lat = -37.8245483;
var lng = 144.963937;


if ("geolocation" in navigator) {
	  navigator.geolocation.getCurrentPosition(
		function(position){
			return 	lat = position.coords.latitude,
	        		lng = position.coords.longitude;
		}
	)
} else {
  /* geolocation IS NOT available */
}
// https://api.darksky.net/forecast/3eea52853f1ad86d6871641e06a68b43/-37.8245483,144.963937




$(document).ready(function(){

	$.ajax({
		dataType: "json",
		url: "https://api.darksky.net/forecast/" + key + "/" + lat + "," + long,
		success: function(weather) {
			
			if(typeof r === 'string'){
				weather = JSON.parse(weather); 
			}
			
			var max_temp = 0;		

			console.log(lat);
			console.log(weather);
			
			console.log(weather.list);
// city name
			document.querySelector('.city').textContent = weather.city.name;

// weather icons + time
			for (var i = 0; i < 10; i++) {
				//console.log(weather.list[i].weather[0].icon);
				document.querySelector('.im-' + i ).src = "http://openweathermap.org/img/w/" + weather.list[i].weather[0].icon + ".png";
//time
				var time = weather.list[i].dt_txt.substr(weather.list[i].dt_txt.length - 8).substring(0,5);

				time = time.split(":");

				if(time[0] > 12){
					time = +time[0] - 13;
				} else {
					time = +time[0] + 11;
				}

				if(time <= 12 ){
					document.querySelector('.tm-' + i ).textContent = time + " AM";
				} else {
					document.querySelector('.tm-' + i ).textContent = time - 12 + " PM";
				}
// temp
				document.querySelector('.tmp-' + i ).textContent = Math.round(weather.list[i].main.temp);
				
				

				if(weather.list[i].main.temp_max > max_temp ) {
					max_temp = weather.list[i].main.temp_max;
				} 

				
			}

// write max temp
			document.querySelector('.max-temp-result').textContent = Math.round(max_temp);





// 1 day rain check:
			for (var i = 0; i < 5; i++) {
				console.log(weather.list[i].weather[0].main);

				var rain = 0;

				if (weather.list[i].weather[0].main == "Rain") {
					console.log(weather.list[i].weather[0].main)
					rain++;
				} else {
					rain = rain;
				}
			}

			if(rain > 0) {
				document.querySelector('.rainpredicted').textContent = "Rain is";
				document.querySelector('.takeumbrella').textContent = "you might want to take an umbrella with you if you're heading out";
			} else {
				document.querySelector('.rainpredicted').textContent = "No rain";
				document.querySelector('.takeumbrella').textContent = "you shouldn't need an umbrella";
			}
// end raibn check
			 

		}
		

		



	}); // ajax

}); // ready

