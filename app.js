window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let icons = document.querySelector('.icons');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `http://api.weatherstack.com/current?access_key=c623b9e654ade1337123b7394fd293fc&query=${lat},${long}`;
       
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, weather_descriptions} = data.current;
                const { name } = data.location;
                // elementu priskyrimas HTML
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = weather_descriptions;
                locationTimezone.textContent = name;
            
                if(name == "Naujogi-Akmene")
                temperatureDegree.textContent = "MYLIU TAVE";

                if(weather_descriptions == "Overcast")
                document.getElementById("icons").src = "animated/cloudy.svg";
                if(weather_descriptions == "Rainy")
                document.getElementById("icons").src = "animated/rainy-1svg";
                if(weather_descriptions == "Sunny")
                document.getElementById("icons").src = "animated/day.svg";
                if(weather_descriptions == "Partly cloudy")
                document.getElementById("icons").src = "animated/cloudy.svg";

                var skycons = new Skycons({"color": "pink"});
                skycons.add(document.getElementById("icon"), Skycons.PARTLY_CLOUDY_DAY);
                skycons.play();
            });
        });
    }

});