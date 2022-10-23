const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const passport = require("passport");
const cookieSession = require('cookie-session');
const { response } = require("express");
require('./passportSetup')


app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.get(bodyParser.json())

app.use(cookieSession({
  name: 'testSession',
  keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.sendStatus(401);
  }
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send("Efetue seu login!"))
app.get('/failed', (req, res) => res.send("Tentativa de login falhou!"))
app.get('/sucess', isLoggedIn, (req, res) => res.send(`Bem vindo {$req.user.displayName}`))

app.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    
    res.redirect('/sucess');
  });

app.get('/logout',(req,res)=>{
  req.session = null;
  req.logout();
  res.redirect('/')
})

app.listen(3000, () => console.log(`Testando app porta ${3000}!`))