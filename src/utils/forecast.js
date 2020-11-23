const request = require('request')
const forecast = (latitude, longitude, callback) => {
    

    const url = 'http://api.weatherstack.com/current?access_key=85bfc31e4770b6e0721682e4e8561edd&query=' + latitude + ',' + longitude
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect', undefined)
        }
        else if (response.body.error) {
            callback('Not found', undefined)
        }
        else {

            callback(undefined, {
                temperature: response.body.current.temperature,
                weatherDescription: response.body.current.weather_descriptions[0],
                location: 'Location is:' + response.body.location.name + ' ,' +
                    response.body.location.country + ',' +
                    response.body.location.region
            })


        }


    })


}
module.exports = {
    forecast: forecast
}