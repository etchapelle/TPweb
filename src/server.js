const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
//const models = require('./models/index');
const path = require('path');

// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// Add a bit of logging
app.use(morgan('short'))

app.get('/', function (req, res) {
    res.send('Hello World !')
})

//Associations
//models.Monkey.belongsTo(models.Enclos);
//models.Enclos.hasMany(models.Monkey, { as: "Monkeys" });

/*app.get('/', function (req, res) {
    var tabTempMonkeys = [];
    var tabTempEnclos = [];

    models.Monkey.findAll()
        .then((monkeys) => {
            //console.log(monkeys)
            tabTempMonkeys = monkeys;
        })
    models.Enclos.findAll()
        .then((enclos) => {
            //console.log(enclos
            tabTempEnclos = enclos;
        })
        .then(() => {
            res.render('index', { tabMonkey: tabTempMonkeys, tabEnclos: tabTempEnclos });
        })
})

app.get('/AddMonkey', function (req, res) {
    res.render('AjouterSinge')
})
app.get('/AddEnclos', function (req, res) {
    res.render('AjouterEnclos')
})

app.get('/maj/:id', function (req, res) {
    res.render('majSinge', { id: req.params.id })
})

app.get('/LierAEnclos/:id', function (req, res) {
    res.render('lierAEnclos', { id: req.params.id })
})

// Monkeys--------------------------------------------------------------------------------------------------------------------------------

// CREATE -------------------------------------------
// POST UI
// CREATE ONE
app.post('/monkeys', function (req, res) {
    models.Monkey.create({
        name: req.body.name,
        age: req.body.age,
        espece: req.body.espece
    })
        .then(() => {
            res.render('SingeAjoute')
        })
})

// API
// CREATE ONE
app.post('/v1/monkeys', function (req, res) {
    models.Monkey.create({
        name: req.body.name,
        age: req.body.age,
        espece: req.body.espece
    })
        .then(() => {
            res.send('Singe Ajoute')
        })
})

// READ ---------------------------------------------
// GET UI
// GET ONE
app.get('/monkeys/:id', function (req, res) {
    models.Monkey.findOne({ where: { id: req.params.id } })
        .then((monkey) => {
            res.render('OneMonkey', { obj: monkey });
        })
})

// GET FILTER
app.get('/monkeys', function (req, res) {
    models.Monkey.findAll({ where: req.query })
        .then((monkeys) => {
            res.render('AllMonkeys', { obj: monkeys });
        })
})

// API
// GET ALL
app.get('/v1/monkeys', function (req, res) {
    models.Monkey.findAll({ where: req.query })
        .then((monkeys) => {
            res.send(monkeys);
        })
})

// GET ONE BY ID
app.get('/v1/monkeys/:id', function (req, res) {
    models.Monkey.findOne({ where: { id: req.params.id } })
        .then((monkey) => {
            res.send(monkey);
        })
})

// UPDATE -------------------------------------------
// UPDATE ONE
function MiddleWareMAJ(req, res, next) {
    console.log(req.body);
    const objRet = req.body;
    for (let property in req.body) {
        if (req.body[property] == '') {
            delete objRet[property];
        }
    }
    console.log(objRet);
    req.body = objRet;
    next();
}

// UPDATE
// UPDATE UI
app.post('/update/monkeys/:id', [MiddleWareMAJ], function (req, res) {
    console.log(req.body)
    models.Monkey.update({ name: req.body.name, age: req.body.age, espece: req.body.espece }, { where: { id: req.params.id } })
        .then(() => {
            res.render('SingeMisAJour');
        })
})

// API
// UPDATE ONE BY ID
app.put('/v1/monkeys/:id', function (req, res) {
    models.Monkey.update({ name: req.body.name, age: req.body.age, espece: req.body.espece }, { where: { id: req.params.id } })
        .then(() => {
            res.send('Singe Mis A Jour');
        })
})

// UPDATE FILTER
app.put('/v1/monkeys', function (req, res) {
    models.Monkey.update({ name: req.body.name, age: req.body.age, espece: req.body.espece }, { where: req.query })
        .then(() => {
            res.send("Singe mis a jour")
        })
})

// DELETE -------------------------------------------
// DELETE UI
app.get('/delete/monkeys/:id', function (req, res) {
    models.Monkey.destroy({ where: { id: req.params.id } })
        .then(() => {
            res.render('SingeSupprime')
        })
})

// API
// DELETE ONE BY ID
app.delete('/v1/monkeys/:id', function (req, res) {
    models.Monkey.destroy({ where: { id: req.params.id } })
        .then(() => {
            res.send('Singe Supprimé')
        })
})

// DELETE FILTER
app.delete('/v1/monkeys', function (req, res) {
    models.Monkey.destroy({ where: req.query })
        .then(() => {
            res.send("Tous les singe correspondant aux critères ont été supprimés");
        })
})


// Enclos --------------------------------------------------------------------------------------------------------------------------------

// CREATE -------------------------------------------
// Create enclos
app.post('/enclos', function (req, res) {
    models.Enclos.create({
        name: req.body.name,
        taille: req.body.taille,
        environnement: req.body.environnement
    })
        .then(() => {
            res.send('Enclos added')
        })
})

// READ ---------------------------------------------
// GET FILTER
app.get('/enclos', function (req, res) {
    var tabTempMonkeys = [];
    var tabTempEnclos = [];

    models.Monkey.findAll()
        .then((monkeys) => {
            //console.log(monkeys)
            tabTempMonkeys = monkeys;
        })
    models.Enclos.findAll()
        .then((enclos) => {
            //console.log(enclos
            tabTempEnclos = enclos;
        })
        .then(() => {
            res.render('AllEnclos', { tabMonkey: tabTempMonkeys, tabEnclos: tabTempEnclos });
        })
})

// Get a monkey by id
app.get('/enclos/:id', function (req, res) {
    models.Enclos.findOne({ where: { id: req.params.id } })
        .then((enclos) => {
            res.render('OneEnclos', { obj: enclos })
        })
})

// UPDATE -------------------------------------------
// UPDATE ONE
app.put('/enclos/:id', function (req, res) {
    models.Enclos.update({ name: req.body.name, taille: req.body.taille, environnement: req.body.environnement }, { where: { id: req.params.id } })
        .then(() => {
            res.send("Enclos mis a jour")
        })
})

//UPDATE FILTER
app.put('/enclos', function (req, res) {
    models.Enclos.update({ name: req.body.name, taille: req.body.taille, environnement: req.body.environnement }, { where: req.query })
        .then(() => {
            res.send("Plusieurs enclos mis a jour")
        })
})

// DELETE -------------------------------------------
// DELETE ONE
app.delete('/enclos/:id', function (req, res) {
    models.Enclos.destroy({ where: { id: req.params.id } })
        .then(() => {
            res.send("Enclos supprimé")
        })
})

// DELETE FILTER
app.delete('/enclos', function (req, res) {
    models.Enclos.destroy({ where: req.query })
        .then(() => {
            res.send("Tous les enclos correspondant aux critères ont été supprimés");
        })
})


// Synchronize models
models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   * 
   * Listen only when database connection is sucessfull
   */
    app.listen(process.env.PORT, function () {
    console.log('Express server listening on port 3000');
  });
//});
