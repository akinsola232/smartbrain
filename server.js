const express = require("express");

const cors = require("cors");

const signin = require("./controllers/signin");

const register = require("./controllers/register");

const profile = require("./controllers/profile");

const image = require("./controllers/image");

const bcrypt = require("bcrypt-nodejs");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json())

app.use(cors())

const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '08023530453',
    database : 'smart-brain'
  }
});

app.get("/", (req,res) => {	res.json(database.users);})
app.post("/signin", (req,res) => signin.signinHandler(req, res, db, bcrypt))
app.post("/register",(req, res) => register.registerHandler(req, res, db, bcrypt))
app.get("/profile/:id", (req, res) => profile.profileHandler(req, res, db))
app.put("/image", (req, res ) => image.imageHandler(req, res, db))
app.post("/imageApi", (req, res ) => image.imageApiHandler(req, res))

app.listen(process.env.PORT || 3000, ()=>{ 

	console.log(`server is running on port ${process.env.PORT}`)
})
