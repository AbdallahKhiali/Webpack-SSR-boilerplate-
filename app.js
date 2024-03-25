require('dotenv').config()
const app = require('./config')
const path = require('path')




app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (request, response) => {
    response.render("base")
})


app.listen(3000, () => {
    console.log("working fine and listning on port 3000 ")
})