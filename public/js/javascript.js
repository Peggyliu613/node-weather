console.log("hahaha")

const weatherForm = document.querySelector('form')
const addressInput = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('/weather?address='+ encodeURIComponent(addressInput.value)).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                document.getElementById("weatherInfo1").innerHTML = data.error
                return console.log(data.error)
            }
            const {forecast, location} = data
            document.getElementById("weatherInfo1").innerHTML = "Forecast: " + forecast
            document.getElementById("weatherInfo2").innerHTML = "Location: " + location
            return console.log(data)
        })
    })
})