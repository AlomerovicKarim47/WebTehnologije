//Pitati za godineajax
const db = require('./baza/db.js');
//const Sequelize = require("sequelize");
const express = require('express');
const multer  = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
var json2xml = require('json2xml');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, req.body.naziv + '.pdf') 
    }
  })
  
var upload = multer({ 
    storage: storage,
    fileFilter: function(req, file, cb){
        if (file.originalname.indexOf('.pdf') <= -1)  
        {   
            return cb("PDF error", false);
        }
        else
        {
            fs.readdir('./public/uploads/', function(err, items) {           
                for (var i=0; i<items.length; i++) {
                
                    if (items[i] == req.body.naziv + '.pdf')
                    {   
                        return cb('Vec postoji error', false);
                    } 
                }
                return cb(null, true);
            });
            
        }
    }
}).single('postavka');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//4. spirala
db.sequelize.sync().then(function(){
    console.log("Zavrseno kreiranje tabela.");
});

//1.zad druge je u ispravkama ovih zad
//2.zadatak
app.post('/addZadatak', function(req, res){
    upload(req, res, function(err){
        if (req.body.naziv == "")
        {
            res.end('<html><body>Greska, prazan naziv.<form action = "http://localhost:8080/addZadatak.html"><input type = "submit" value = "nazad"></form></body></html>');
        }
        else if (err) //ako ima error
        {
            if (err.toString() == 'PDF error')
            {
                res.end('<html><body>Nije pdf <form action = "http://localhost:8080/addZadatak.html"><input type = "submit" value = "nazad"></form></body></html>');
            }
            else if (err.toString() == 'Vec postoji error')
                res.end('<html><body>Vec postoji <form action = "http://localhost:8080/addZadatak.html"><input type = "submit" value = "nazad"></form></body></html>');
        }
        else //ako ne, nastavi normalno
        {
            var naziv = req.body.naziv;
        
            var data = {naziv: naziv, postavka: 'http://localhost:8080/uploads/' + naziv + '.pdf'};
            fs.writeFile('public/uploads/' + naziv + 'Zad.json',  JSON.stringify(data), function(err){
                if (err) throw err;
            });
            //dodaj u bazu
            db.zadatak.create({naziv: data.naziv, postavka: data.postavka}).then(function(rez)
            {
                res.contentType('application/json');
                res.status(200);
                res.end(JSON.stringify(data));
            });                        
        }

    });   
    
});

//3.zadatak
app.get('/zadatak', function(req, res){
    
    if (req.query.naziv == null)
    {
        res.end('<html><body>Fali parametar naziv.</body></html>');
        return;
    }
    //Ne radimo vise ovako
    /*fs.readFile('./public/uploads/' + req.query.naziv + '.pdf', function(err, content){
        if (err){
            res.end('<html><body>Ne postoji file s tim imenom.</body></html>');
            return;
        }
        res.status(200);
        res.contentType("application/pdf");
        res.send(content);
    });*/

    //Izvadi iz baze i redirektuj
    db.zadatak.findOne({where:{naziv : req.query.naziv}}).then(function(rez){
        res.status(200);
        res.redirect(rez.dataValues.postavka);
    });;
});

//4. zadatak
app.post('/addGodina', function(req, res){
    var nazivGod = req.body.nazivGod;
    var nazivRepVje = req.body.nazivRepVje;
    var nazivRepSpi = req.body.nazivRepSpi;     
    
    var novaLinija = nazivGod + "," + nazivRepVje + "," + nazivRepSpi + "\n";

    
    /*fs.readFile('godine.csv', function(err, content){
        if (err)
            throw err       
        var tekst = content.toString();
        var redovi = tekst.split("\n");
        var ima = false;
        for (var i = 0; i < redovi.length; i++)
        {
            var kolone = redovi[i].split(",");
            if (kolone[0] == nazivGod)
            {
                res.end('<html><body>Vec postoji ta godina <form action = "http://localhost:8080/addGodina.html"><input type = "submit" value = "nazad"></form></body></html>');
                ima = true;
            }
        }
        if (!ima)
            fs.appendFile('godine.csv', novaLinija, function(err){
                if (err) throw err;
                res.status(200);
                res.redirect('http://localhost:8080/addGodina.html'); //??
            });     
    });*/  
    
    db.godina.create({naziv: nazivGod, nazivRepSpi: nazivRepSpi, nazivRepVje: nazivRepVje}).
    then(function(rez){
        res.status(200);
        res.redirect('http://localhost:8080/addGodina.html');
    });
    

});

//5.zadatak
app.get('/godine', function(req, res){
    /*fs.readFile('godine.csv', function(err, content){
        if (err)
            throw err       
        var tekst = content.toString();
        var redovi = tekst.split("\n");
        var niz = [];
        for (var i = 0; i < redovi.length - 1; i++)
        {
            var kolone = redovi[i].split(",");
            var objekat = {nazivGod : kolone[0], nazivRepVje : kolone[1], nazivRepSpi : kolone[2]};
            niz.push(objekat);
        }
        res.writeHead(200, {"Content-Type":"application/json"}); //treba li application/json header, inace koji headeri trebaju
        res.end(JSON.stringify(niz));
    });*/
    db.godina.findAll().then(function(rez){
        var niz = [];
        for (var i = 0; i < rez.length; i++)
        {
            var objekat = {
                id: rez[i].dataValues.id,
                nazivGod : rez[i].dataValues.naziv, 
                nazivRepVje : rez[i].dataValues.nazivRepVje, 
                nazivRepSpi : rez[i].dataValues.nazivRepSpi
            };
            niz.push(objekat);
        }
        res.status(200);
        res.contentType("application/json");
        res.end(JSON.stringify(niz));
    });

});

//7.zadatak
app.get('/zadaci', function(req, res){
    var header = req.get('Accept');
    var oblik = 'json';

    if (header.indexOf('application/json') > -1)
        oblik = 'json';
    else if (header.indexOf('application/xml') > -1)
        oblik = 'xml';
    else if (header.indexOf('text/csv') > -1)
        oblik = 'csv';
    
     db.zadatak.findAll().then(function(items) {           
        var niz = [];
        var csv = "";
        for (var i=0; i<items.length; i++) {
            var objekatJSON = {id: items[i].dataValues.id, naziv: items[i].dataValues.naziv, postavka: items[i].dataValues.postavka};
            if (oblik == 'json' || oblik == 'xml')
            {
                niz.push(objekatJSON);
            }
            else if (oblik == 'csv')
                csv += objekatJSON.naziv + ',' + objekatJSON.postavka + '\n';                                        
        }
        res.status(200);

        if (oblik == 'json')
        {     
            res.contentType('application/json');
            res.end(JSON.stringify(niz));
        }
        else if (oblik == 'csv')
        {
            res.contentType('text/csv');
            res.end(csv);
        }
        else if (oblik == 'xml')
        {
            xmlRes = '<?xml version="1.0" encoding="UTF-8"?><zadaci>';

            for (var i = 0; i < niz.length; i++)
                xmlRes += '<zadatak>' + json2xml(niz[i]) + '</zadatak>';
            
            xmlRes += '</zadaci>';
            res.contentType('application/xml');
            res.end(xmlRes);
        }       
        
    });
    
});

//4. spirala 
//Zadatak 2.a + 2.b
app.post('/addVjezba', function(req, res){
    var sGodine = req.body.sGodine;
    var sVjezbe = req.body.sVjezbe;
    var naziv = req.body.nazivVjezbe;
    var spirala = req.body.spirala;
    spirala = spirala == 'on';
    
    if (!naziv)
    {
        if (!sVjezbe || !sGodine)
        {
            res.end('<html><body>Fali vjezba ili godina<form action = "http://localhost:8080/addVjezba.html"><input type = "submit" value = "nazad"></form></body></html>');
            return;
        }
        db.godina.findOne({where:{id: sGodine}}).then(function(godina){
            db.vjezba.findOne({where:{id:sVjezbe}}).then(function(vjezba){
                vjezba.addGodine([godina]).then(function(redIzMedjutabele){
                    res.status(200);
                    res.redirect("http://localhost:8080/addVjezba.html"); 
                })          
            })
        });
    }
    else
    {
        db.vjezba.create({naziv: naziv, spirala: spirala}).then(function(vje){
            db.godina.findOne({where:{id:sGodine}}).then(function(god){
                vje.addGodine([god]).then(function(rezultatGod){
                    res.status(200);
                    res.redirect("http://localhost:8080/addVjezba.html"); 
                });               
            });
        }).catch(function(err){
            res.end('<html><body>IZUZETAK! Nepravilno ubacivanje u bazu!<form action = "http://localhost:8080/addVjezba.html"><input type = "submit" value = "nazad"></form></body></html>'); 
        });
        
    }
})

//Custom get za pribavljanje vjezbi u liste
app.get("/vjezbe", function(req, res){
    db.vjezba.findAll().then(function(rez){
        
        var niz = [];
        for (var i = 0; i < rez.length; i++)
        {
            var objekat = rez[i].dataValues;
            niz.push(objekat);
        }
        res.status(200);
        res.contentType("application/json");
        res.end(JSON.stringify(niz));
    });
});

//2c (plus ima i ajax dio)
app.post("/vjezba/:idVjezbe/zadatak", function(req, res){
    var idVje = req.body.sVjezbe;
    var idZad = req.body.sZadatak;

    db.vjezba.findOne({where:{id: idVje}}).then(function(vjeRez){
        db.zadatak.findOne({where:{id:idZad}}).then(function(zadRez){
            zadRez.addVjezbe([vjeRez]).then(function(novaVeza){
                res.status(200);
                res.redirect("http://localhost:8080/addVjezba.html");
            });
        });
    });

});
//custom get za filtrirane zadatke
app.get("/zadaciF", function(req, res){
    var vje = req.query.vjezba;
    var niz = [];
    db.sequelize.model("vjezba_zadatak").findAll({where:{idvjezba: vje}}).then(function(rezVeze){
        db.zadatak.findAll().then(function(zadaciRez){
            
            for (var j = 0; j < zadaciRez.length; j++)
            {
                var ima = false;
                for (var i = 0; i < rezVeze.length; i++)
                {
                    if (rezVeze[i].dataValues.idzadatak == zadaciRez[j].dataValues.id)
                    {
                        ima = true;
                        break;
                    }
                }
                if (!ima)
                niz.push({
                    id: zadaciRez[i].dataValues.id,
                    naziv: zadaciRez[i].dataValues.naziv,
                    postavka: zadaciRez[i].dataValues.postavka
                });
            }
            res.status(200);
            res.end(JSON.stringify(niz));
            
        });
    });
});

//3a
app.post("/student", function(req, res){
    
    var posaljiOdg = function (n)
    {
        db.godina.findOne({where:{id:godinaId}}).then(function(godRez)
        {
            db.student.findAll({where:{studentGod: godinaId}}).then(function(findRez){
                var nazivGodine = godRez.dataValues.naziv;
                var m = findRez.length;
                var poruka = "Dodano je "+ n + " novih studenata i upisano " + m + " na godinu " + nazivGodine;
                var data = {message: poruka};
                res.status(200);
                res.end(JSON.stringify(data));
                return;
            });
            
        });
        
    }

    var jsonBody = req.body;
    var godinaId = jsonBody.godina;
    var studenti = jsonBody.studenti;

    var n = 0;
    var i = 0;
    if (studenti.length == 0)
        posaljiOdg(0);
    else
    studenti.forEach(student => {   
        db.student.findOne({where:{index:student.index}}).then(function(studRez){           
            if (studRez == null)
            {
                db.student.create({imePrezime: student.imePrezime, index: student.index, studentGod: godinaId}).then(function(noviStud){
                    n++;
                    i++;
                    if (i == studenti.length)
                        posaljiOdg(n);
                });
            }
            else
            {               
                studRez.update({studentGod: godinaId}).then(function(noviStud){
                    i++;
                    if (i == studenti.length)
                        posaljiOdg(n);
                });               
            }
        });
    });
});



app.listen(8080);