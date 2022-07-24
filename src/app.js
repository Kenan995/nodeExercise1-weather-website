const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

//Define paths for express config
const publicDirectoryPath =  path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Kula Boi'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Kula Boi'
    }
    );
})

app.get('/help', (req,res) => {
    res.render("help", {
        title:'Help',
        helpMessage: 'This message is supposed to help you.',
        name: 'Kula Boi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You have to search for an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if (error) {
            res.send({
                error
            });
        } 
        forecast(latitude, longitude, (error,forecastData) => {
            if (error){
                res.send({
                    error
                });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
        })
    })
    })
});

// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        errorMessage: 'Article not found',
        name: 'Kula Error'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Kula Error'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});