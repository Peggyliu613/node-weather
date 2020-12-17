const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geo = require('./utils/geo')

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/templates'))
app.use(express.static(__dirname))

hbs.registerPartials(path.join(__dirname, '/templates'))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Peggy"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Peggy",
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Peggy",
        helpText: "This is the help page"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geo(req.query.address, (error, {lat, lon, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(lat, lon, (error, forecast) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast, 
                location,
                address: req.query.address
                
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        res.send({
            error: "You must provide a search term"
        })
        return
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.send("help artical not found")
})

app.get('*', (req, res) => {
    res.send("My 404 Page")
})

app.listen(3000, () => {
    console.log("server is up on port 3000")
})