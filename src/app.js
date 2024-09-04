import path from 'node:path';
import express from 'express';
import hbs from 'hbs';

import { getGeocode } from './utils/geocode.js';
import { getForecast } from './utils/weather.js';

const app = express();

// Define Paths for Express Config
const publicDirPath = path.join(import.meta.dirname, "../public");
const viewsPath = path.join(import.meta.dirname, "../templates/views");
const partialsPath = path.join(import.meta.dirname, "../templates/partials");

// Setup Handlebars Engine and Views Location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "박태민"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "박태민"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Need Help?",
        name: "박태민",
        helpText: "This is the help page!"
    });
});

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address."
        });
    }

    getGeocode(req.query.address, (error, { location, ...geocodeData } = {}) => {
        if(error) {
            return res.send({ error });
        }

        getForecast(geocodeData, (error, forecast) => {
            if(error) {
                return res.send({ error });
            }

            res.send({
                location,
                forecast,
                address: req.query.address
            });
        })
    })
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

// Catches unknown website help paths
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Error 404",
        name: "박태민",
        errorMessage: "Help article not found."
    });
});

// Catches unknown website paths
app.get('*', (req, res) => {
    res.render('404', {
        title: "Error 404",
        name: "박태민",
        errorMessage: "Page not found."
    });
});


app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});