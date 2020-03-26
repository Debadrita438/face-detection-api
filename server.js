const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-objective-38697', //heroku database
    user : 'postgres',
    password : '',
    database : 'smartbrain'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

// /--> GET = this is working
app.get('/', (req, res) => {
	res.send('Hello World');
});

// /signin --> POST = success/fail(go back to /register)
app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt)
});

// /register --> POST = user
app.post('/register', (req, res) => { 
	register.handleRegister(req, res, db, bcrypt) 
});

// /profile/:id --> GET = user see the profile
app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req, res, db)
});

// /image ---> PUT = user rank updated
app.put('/image', (req, res) => {
	image.handleImage(req, res, db)
});

//image ---> POST = for face detection
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res)
});

app.listen(process.env.PORT || 3000, () => {
	console.log('App is running!');
});