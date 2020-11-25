const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql')

// set up our database
const pool = mysql.createPool({
    host: 'localhost',
    //----------edit username/password-------
    user: 'root',
    password: '',
    database: 'planets',
    multipleStatements: true
})

router.post('/', (req, res) => {
    const name = req.body.deposit;
    res.locals = {
        data: name
    }
    res.render('homepage')
})

router.get('/', function (req, res) {
    res.render('homepage', { data: "will you name me?" });
})

router.get('/save/:id', function (req, res) {
    id = req.params.id;
    res.render('save', { data: id });
})

//save planet to database associated to galaxy
router.post('/save/:id', function (req, res) {
    const galaxy = req.body.galaxy;
    planet = req.params.id;
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query({
            sql: 'INSERT INTO planet VALUES (?, ?);',
            values: [planet, galaxy]
        })
    })
    res.redirect("/" + galaxy);
})

router.get('/:id', function (req, res) {
    galaxy = req.params.id
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query({
            sql: 'SELECT distinct * FROM planet WHERE galaxy=?;',
            values: [galaxy]
        }, function (err, result) {
            if (err) {
                console.error(err)
                res.send('An error has occurred')
                return
            }
            //put each planet name in an array
            planets = {}
            for (i = 0; i < result.length; i++) {
                planets[i] = result[i].name;
            }

            JSON.stringify(planets)
            res.locals = {
                data: planets,
                galaxy: galaxy
            }
            res.render('galaxy');

        })

    })


})

module.exports = router;