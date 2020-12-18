const request = require('request')

const forecast = (lat, lon, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=32f023be48a6590f1f66f260d1d059fa&query=' + lat + ',' + lon
    request({url: url, json: true}, (error, response) => {
        if (error){
            callback("unable to connect to weather service", undefined)
        }else if(response.body.error){
            callback("unable to find the location", undefined)
        }else{ 
            callback(undefined, response.body.current.weather_descriptions + ". It is currently " + response.body.current.temperature + " degrees out and feels like " + response.body.current.feelslike + " degree out. There is " + response.body.current.humidity + "% of rain.")
        }
    })
}

module.exports = forecast