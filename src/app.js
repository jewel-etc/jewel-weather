const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const location = require('./utils/location.js');

const app = express();

const port = process.env.PORT || 3000
//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../Public');
const viewPath = path.join(__dirname, '../Templates/Views');
const partialsPath = path.join(__dirname, '../Templates/Partials');

//Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('Index.hbs', {
        title: 'Weather and Location App',
        name: 'Jewel'
    })
})

app.get('/Weather', (req, res) => {
    res.render('Weather.hbs', {
        name: 'Jewel '
    })
})


app.get('/About', (req, res) => {
    res.render('About.hbs', {
        title: 'Jewel Bhattacharyya',
        name: 'Jewel'

    })
})

app.get('/weatherData', (req, res) => {

    if (!req.query.address) {

        return res.send({
            error: 'Please provide your location'
        })
    }

    geocode.geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error: error })
        }
        forecast.forecast(latitude, longitude, (error, { temperature, weatherDescription } = {}) => {

            if (error) {
                return res.send({ error: error })
            }
            res.send({
                temperature: temperature,
                weatherDescription: weatherDescription,
                location: location,

            })
        })
    })

})

app.get('/longLat', (req, res) => {

    if (!req.query.longitude || !req.query.latitude) {

        return res.send({
            error: 'Location not found'
        })
    }

    location.location(req.query.longitude, req.query.latitude, (error, { latitude, longitude, location } = {}) => {      

        if (error) {
            return res.send({ error: error })
        }
        forecast.forecast(latitude, longitude, (error, { temperature, weatherDescription } = {}) => {
           
            if (error) {
                return res.send({ error: error })
            }
            res.send({
                temperature: temperature,
                weatherDescription: weatherDescription,
                location: location,

            })
        })
    })





})

app.get('*', (req, res) => {
    res.render('Error.hbs', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Jewel'
    })
})

app.listen(port, () => {
    console.log("Server is running on port" + port);
})