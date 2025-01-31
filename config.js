const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const errorHandler = require('errorhandler')
const path = require('path')

module.exports = (() => {
    const app = express()

    app.set('port', 3000)

    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'pug')


    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    app.use(methodOverride())

    app.use(express.static(path.join(__dirname, 'public')))

    app.use(errorHandler())

    return app
})()