var express = require('express');
var mysql = require('mysql');
var bodyparser = require('body-parser');

var app = express();


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.listen(3000, () => {
    console.log('nodejs serve running');
})

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'game'
})

app.post('/agg_game', (req, res, next) => {
    var data = JSON.parse(req.body.data);
    var name = data.name;
    var cricketer = data.cricketer;
    var colors = data.colors;


    connection.connect(function () {
        query = "insert into tbl_game(player_name,cricketer,flag_color,date) values(" + name + "," + cricketer + "," + colors + "," + new Date() + ")";

        connection.query(query, function (err, result) {
            if (err) {
                res.end(JSON.stringify(err));
            }
            else {
                if (result.affectedRows > 0) {
                    res.end('successfully game added');
                }
                else {
                    res.end('Please try again');
                }
            }
        })
    })
})

app.get('/getdata', (req, res, next) => {
    connection.connect(function () {
        query = "select * from tbl_game";

        connection.query(query, function (err, result) {
            if (err) {
                res.end(JSON.stringify(err));
            }
            else {
                res.json({
                    data : result
                })
            }
        })
    })
})