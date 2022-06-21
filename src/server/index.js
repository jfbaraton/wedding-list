// server/index.js

const express = require("express");
const bodyParser = require('body-parser');
var connection  = require('express-myconnection');
var mysql = require('mysql');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());


app.use(

        connection(mysql,{

            host: 'localhost', //'localhost',
            user: 'jeff',
            password : 'aquarium',
            port : 3306, //port mysql
            database:'wedding'

        },'pool')
); //or single

app.get("/items", (req, res) => {
    //console.log('GET items ');
    req.getConnection(function(err, myconnection) {
        if (err) {
            console.log("Error getConnection : %s ",err );
            res.send(500);
        }

        myconnection.query('SELECT id, name, price FROM items',function(err,rows) {
            if(err)
                console.log("Error Selecting : %s ",err );

            res.json({items:rows});


         });
    });

        /*

    res.json({
        message: "Hello from Express2222222!",
        contributions: [
            {price:10, item_name:'baking_robot'},
            {},
        ]
    });
            */
});

app.get("/contributions", (req, res) => {
    //console.log('GET contributions ');
    req.getConnection(function(err, myconnection) {
        if (err) {
            console.log("Error getConnection : %s ",err );
            res.send(500);
        }

        myconnection.query('SELECT item_id, comment, type, amount FROM contributions where state = 0',function(err,rows) {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.json({contributions:rows});

        });
    });
});
app.get("/mySettings", (req, res) => {
    console.log('GET mySettings ');
    if(req.query && req.query.px && req.query.px.length < 10) {
        req.getConnection(function(err, myconnection) {
            if (err) {
                console.log("Error getConnection : %s ",err );
                res.send(500);
            }

            myconnection.query('SELECT language FROM people where hash = \''+req.query.px+'\'',function(err,rows) {

                if(err)
                    console.log("Error Selecting : %s ",err );

                res.json({mySettings:rows});

            });
        });
    } else {
        res.json({mySettings:[]});
    }
});

app.get("/myContributions", (req, res) => {
    if(req.query && req.query.px && req.query.px.length < 10) {
        //console.log('GET myContributions "'+req.query.px+'"');
        req.getConnection(function(err, myconnection) {
            if (err) {
                console.log("Error getConnection : %s ",err );
                res.send(500);
            }

            myconnection.query('SELECT ppl.name as name, count(cont.item_id) as gift_count, cont.type as type, sum(cont.amount) as amount FROM contributions as cont join people as ppl on cont.people_id = ppl.id where cont.state = 0 and ppl.hash = \''+req.query.px+'\' group by type',function(err,rows) {

                if(err)
                    console.log("Error Selecting : %s ",err );

                res.json({myContributions:rows});

            });
        });
    } else {
        //console.log('GET myContributions NOPARAM '+(req.query ? req.query.px :0));
        res.json({myContributions:[]});
    }
});

app.post('/add_book',(req,res)=>{

    let {book_name,author} = req.body;


    if(!book_name) return res.status(400).json('Book Name cant be blank');
    if(!author) return res.status(400).json('Author cant be blank');

    var data={book_name:book_name,
              author:author};


    var query = connection.query("INSERT INTO books set ? ",data,
        function(err, rows)
        {
            if (err) {
            //If error
                res.status(400).json('Sorry!!Unable To Add');
                console.log("Error inserting : %s ",err );
            }else {
            //If success
                res.status(200).json('Book Added Successfully!!')
            }
    });

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});