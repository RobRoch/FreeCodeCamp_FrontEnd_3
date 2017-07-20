$(document).ready(function() {
  
  //if navigator then checking position
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      var api = position.coords.latitude + "," + position.coords.longitude;
      
  //getJSON of my actual weather
  $.getJSON("https://api.darksky.net/forecast/8f7dc952613bdc7ae4c55a949a90588a/"+api+"?callback=?", function(json) {
    
    //assigning temperature.
    var temperature = (json["currently"]["temperature"]).toFixed(1);
    //assigning temperature to backgroundTemp to change url based on this.
    var backgroundTemp = parseInt(temperature);
    
    //display temperature value
    $("#temperature").html(temperature);
    
    //button functionality fahrenheit to celsius convertion.
    $("#change").on("click", function() {
      if ($("#degree").html() === "℃") {
        $("#degree").html("℉");
        temperature = ((temperature * 9/5) + 32).toFixed(1);
        $("#temperature").html(temperature);
      } else {
        $("#degree").html("℃");
        temperature =  ((temperature - 32) * 5/9).toFixed(1);
        $("#temperature").html(temperature);
      }
    });
    
    //timeZone fron JSON
    var timeZone = json["timezone"];
    $("#timeZone").html(timeZone);
    
    //summary from JSON
    var summary = json["currently"]["summary"];
    $("#summary").html(summary);
    
    //Current hours and minutes from JSON.
    var date = new Date(json["currently"]["time"]*1000);
    var hours = (date.getHours() < 10)? "0" + date.getHours(): date.getHours();
    var minutes = (date.getMinutes() < 10)? "0" + date.getMinutes(): date.getMinutes();
    var fullDate = hours + ":" + minutes;
    $("#time").html(fullDate);

    //changing background-image, only 3 to rotate. Snow, cloudy, desert.
    if (backgroundTemp < 32) {
      $(".container-fluid").css("background-image", "url(http://wallpaper-gallery.net/images/weather-wallpaper/weather-wallpaper-6.jpg)");
    } else if (backgroundTemp < 77) {
      $(".container-fluid").css("background-image", "url(http://wallpaper-gallery.net/images/weather-wallpaper/weather-wallpaper-7.jpg)");
    } else {
      $(".container-fluid").css("background-image", "url(http://wallpaper-gallery.net/images/weather-wallpaper/weather-wallpaper-5.jpg)");
    }
  });
 });
  };
});
