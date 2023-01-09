// API(Application Programming Interface) USED
// Current Weather Data(Today's Weather)
// One Call API(Future's Weather)
// Query Selector(to select particular object on screen) -> DOM(Document Object Model) 
//todatastring-> to convert into readable string

let longitude, lattitude;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let weather = {
    "apikey": "285c037e2c52620f47e56f724ed4e967",
    fetchw: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=285c037e2c52620f47e56f724ed4e967")
            .then((response) => response.json()) //then = promises
            .then((data) => {
                longitude = data.coord.lon;
                lattitude = data.coord.lat;

                this.displayw(data);

                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&units=metric&appid=8f5318a86d301ac955009af3ce79b46c`)
                .then((response) => response.json())
                .then((data) => {
                    this.displayFutureW(data); //To fill data in their respective div's
                })

            });
    },
    displayw: function (data) {
        // object destructuring(a convenient way of extracting multiple values from data stored in (possibly nested) objects and Arrays.)
        const { name } = data;
        const { icon, description } = data.weather[0]; 
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // console.log(name, icon, description, temp, humidity, speed); //to debug the code

        // creating current date
        const date = new Date();
        // console.log(date);

        // Weather in (City name)
        document.querySelector(".place").innerText = "Weather in " + name;
        
        // Current Date, toDateString() to convert into readable date
        document.querySelector(".date").innerText = `${date.toDateString()}`;
        
        // creating dynamic url of icon
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".details").innerText = description;
        document.querySelector(".windspeed").innerText = " Wind Speed: " + speed + "Km/hr";
        document.querySelector(".humidity").innerText = " Humidity: " + humidity + "%";
        document.querySelector(".temp").innerText = (temp - 273.15).toFixed(2) + "° C";
    },
    displayFutureW: function(data) {
        document.querySelector("#future").style.display = "block";

        // console.log(data);

        const date = new Date();

        document.querySelector(".day1").innerText = days[(date.getDay() + 1) % 7];
        document.querySelector(".day1-icon").src = "https://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png";
        document.querySelector(".day1-temp").innerText = `${data.daily[0].temp.min}° C / ${data.daily[0].temp.max} ° C`;

        document.querySelector(".day2").innerText = days[(date.getDay() + 2) % 7];
        document.querySelector(".day2-icon").src = "https://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png";
        document.querySelector(".day2-temp").innerText = `${data.daily[1].temp.min}° C / ${data.daily[1].temp.max} ° C`;

        document.querySelector(".day3").innerText = days[(date.getDay() + 3) % 7];
        document.querySelector(".day3-icon").src = "https://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png";
        document.querySelector(".day3-temp").innerText = `${data.daily[2].temp.min}° C / ${data.daily[2].temp.max} ° C`;

        document.querySelector(".day4").innerText = days[(date.getDay() + 4) % 7];
        document.querySelector(".day4-icon").src = "https://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png";
        document.querySelector(".day4-temp").innerText = `${data.daily[3].temp.min}° C / ${data.daily[3].temp.max} ° C`;

        document.querySelector(".day5").innerText = days[(date.getDay() + 5) % 7];
        document.querySelector(".day5-icon").src = "https://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png";
        document.querySelector(".day5-temp").innerText = `${data.daily[4].temp.min}° C / ${data.daily[4].temp.max} ° C`;
    },
    search: function () {
        this.fetchw(document.querySelector(".sbar").value);
    }
};

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault(); //to reload the page //e=event listener 
    weather.search();
});
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();

});

// methods(get(image) & post(profile,form,etc))
// JSON- JavaScript Object Notation