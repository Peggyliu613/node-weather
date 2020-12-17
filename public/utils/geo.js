const request = require('request')

const geo = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGVnZ3lsaXU2MTMiLCJhIjoiY2tpaWgwYjlnMDZxNTM1cXJqcGdyeWxyaCJ9._xATZ1Mbg0_oxtAoGcJXJA&limit=1'
    request({url, json: true}, (error, {body} = {}) =>{
        if (error) {
            callback("unable to connect to location services", undefined)
        } else if (body.features.length === 0) {
            callback("unable to find the location", undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geo