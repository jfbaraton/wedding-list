// server/index.js

const express = require("express");
const bodyParser = require('body-parser');
var escape = require('sql-escape');
var connection  = require('express-myconnection');
var mysql = require('mysql');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());

const SQLsanitize = (text) => {
    if(!text) return '';
    return escape(text)
}

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
});

app.get("/contributions", (req, res) => {
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
    if(req.query && req.query.px && req.query.px.length < 10) {
        req.getConnection(function(err, myconnection) {
            if (err) {
                console.log("Error getConnection : %s ",err );
                res.send(500);
            }

            myconnection.query('SELECT name, language FROM people where hash = \''+req.query.px+'\'',function(err,rows) {

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
        req.getConnection(function(err, myconnection) {
            if (err) {
                console.log("Error getConnection : %s ",err );
                res.send(500);
            }

            myconnection.query(
            'SELECT ppl.name as name, count(cont.item_id) as gift_count, cont.type as type, sum(cont.amount) as amount '+
            'FROM contributions as cont join people as ppl on cont.people_id = ppl.id '+
            'WHERE cont.state = 0 and ppl.hash = \''+req.query.px+'\' and '+
            '(cont.type = \'Buy\' or (cont.type = \'Pay\' and cont.item_id not in (SELECT item_id FROM contributions WHERE state = 0 and people_id = ppl.id and type = \'Buy\' ))) group by type',
            function(err,rows) {
                if(err)
                    console.log("Error Selecting : %s ",err );

                res.json({myContributions:rows});

            });
        });
    } else {
        res.json({myContributions:[]});
    }
});

app.post('/pay',(req,res)=>{

    let {px,item_id, amount, message} = req.body;


    if(!px || px.length > 10 ) return res.status(400).json('Arg');
    if(!item_id) return res.status(400).json('Arg item_id');
    if(!amount || amount<=0 || amount >10000) return res.status(400).json('Arg amount');
    console.log('Pay '+item_id+' '+amount+'€');

    req.getConnection(function(err, myconnection) {
        if (err) {
            console.log("Error getConnection : %s ",err );
            res.send(500);
        }

        myconnection.query("INSERT INTO contributions (item_id, people_id, comment, type, amount) VALUES ("+SQLsanitize(''+item_id)+",(SELECT id from people where hash='"+SQLsanitize(px)+"'), '"+SQLsanitize(message)+"', 'Pay' , "+SQLsanitize(''+amount)+")",
            function(err, rows)
            {
                if (err) {
                //If error
                    res.status(400).json('Sorry!!Unable To Pay');
                    console.log("Error inserting : %s ",err );
                }else {
                //If success
                    res.status(200).json('Contribution Added Successfully!!')
                }
        });
    });
});

app.post('/buy',(req,res)=>{

    let {px,item_id, message} = req.body;
    var amount = 1;


    if(!px || px.length > 10 ) return res.status(400).json('Arg');
    if(!item_id) return res.status(400).json('Arg item_id');

    req.getConnection(function(err, myconnection) {
        if (err) {
            console.log("Error getConnection : %s ",err );
            res.send(500);
        }

        myconnection.query("INSERT INTO contributions (item_id, people_id, comment, type, amount) VALUES ("+SQLsanitize(''+item_id)+",(SELECT id from people where hash='"+SQLsanitize(px)+"'), '"+SQLsanitize(message)+"', 'Buy' , "+SQLsanitize(''+amount)+")",
            function(err, rows)
            {
                if (err) {
                //If error
                    res.status(400).json('Sorry!!Unable To Buy');
                    console.log("Error inserting : %s ",err );
                }else {
                //If success
                    res.status(200).json('Contribution Added Successfully!!')
                }
        });
    });
});

app.post('/cancel',(req,res)=>{

    let {px} = req.body;


    if(!px || px.length > 10 ) return res.status(400).json('Arg');

    req.getConnection(function(err, myconnection) {
        if (err) {
            console.log("Error getConnection : %s ",err );
            res.send(500);
        }

        myconnection.query("UPDATE contributions c1 join (SELECT max(c3.id) as max_id from contributions c3 join people p1 on c3.people_id = p1.id where c3.state = 0 and p1.hash='"+SQLsanitize(px)+"') c2 on c1.id = c2.max_id SET c1.state = 2",
            function(err, rows)
            {
                if (err) {
                //If error
                    res.status(400).json('Sorry!!Unable To Cancel');
                    console.log("Error inserting : %s ",err );
                }else {
                //If success
                    res.status(200).json('Contribution Cancelled Successfully!!')
                }
        });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});