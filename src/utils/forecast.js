const request  = require("postman-request")

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=5a8e3b2b2c0649c2c2c31836422f3fae&query=' + latitude + ', ' + longitude

    request({url, json:true}, (error, {body}) =>{
        if (error){
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find coordinates. Try another search.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature + ' degrees out. It feels like its ' + body.current.feelslike + ' degrees out! The windspeed is ' + body.current.wind_speed + ', and the wind dirrection is ' + body.current.wind_dir + '.')
        }
    })
}

module.exports = forecast