const express = require('express')
const bodyParser = require('body-parser')
const {Users, db} = require('./database')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


const app = express()
app.set('view engine', 'hbs')


app.use(urlencodedParser)

let User = [{
    id: 1,
    name: "dhruv", 
    country: "India"
},  {
    "id": "2",
    "name": "yugansh",
    "country": "USA"
}]

app.get("/user/:id", async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    })

    res.send(user);
})

app.get("/all", (req, res) => {    
    let userlist = User;

    if(req.query.country != null) {
        userlist = userlist.filter(user => {
            if(user.country === req.query.country)
            return user
        })
    }

    if(req.query.name != null) {
        userlist = userlist.filter(user => {
            if(user.name === req.query.name)
            return user
        })
    }
    console.log(userlist)

    res.render('all', {
        userlist, 
        msg: "User list"
    });
})

app.post("/", async (req, res) => {

    console.log(req.body)
    const user = await Users.create({
        name: req.body.name,
        country: req.body.country,
        age: req.body.age
    })

    res.send(user.name)
})


db.sync().then(() => {
    app.listen(3000, () => {
        console.log("App started on http://localhost:3000")
    })
})