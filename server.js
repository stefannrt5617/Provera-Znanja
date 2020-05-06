const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const PATH = "stranice/";
let artikli = [
    {
        "id": 1,
        "naziv": "USB Fles",
        "cena": "1000din",
        "imeKompanije": "Kompanija1"
    },
    {
        "id": 2,
        "naziv": "Mouse Logitech",
        "cena": "5000din",
        "imeKompanije": "Kompanija2"
    },
    {
        "id": 3,
        "naziv": "PC Xero",
        "cena": "450eur",
        "imeKompanije": "Kompanija3"
    }
];

http.createServer(function (req, res){    
    let urlObj = url.parse(req.url,true,false);
    if (req.method == "GET"){
        if (urlObj.pathname == "/svi-artikli"){ 
            fs.readFile(PATH + "svi-artikli.html", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
        if (urlObj.pathname == "/api/svi-artikli"){ 
            res.writeHead(200);
            data = JSON.stringify(sviArtikli());
            res.end(data);
        }
        if (urlObj.pathname == "/izmeni-artikal"){
            fs.readFile(PATH + "izmeni-artikal.html", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
        if (urlObj.pathname == "/dodaj-artikal"){
            fs.readFile(PATH + "dodaj-artikal.html", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
    }
    else if(req.method == "POST") {
        if (urlObj.pathname == "/izmeni-artikal"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                izmeniArtikal(parseInt(querystring.parse(body).id),querystring.parse(body).naziv, querystring.parse(body).cena, querystring.parse(body).ime)
                res.writeHead(302, {
                    'Location': '/svi-artikli'
                });
                res.end()
            });
        }
        if (urlObj.pathname == "/obrisi-artikal"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                obrisiArtikal(parseInt(querystring.parse(body).id));
                res.writeHead(302, {
                    'Location': '/svi-artikli'
                });
                res.end();
            });
        }
        if (urlObj.pathname == "/dodaj-artikal"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                dodajArtikal(parseInt(querystring.parse(body).id),querystring.parse(body).naziv,
                           querystring.parse(body).cena,querystring.parse(body).ime);
                res.writeHead(302, {
                    'Location': '/svi-artikli'
                });
                res.end();
            });
        }
    }
}).listen(5000);

function sviArtikli(){
    return artikli;
}
function izmeniArtikal(id,naziv, cena, ime){
    for(let i=0;i<artikli.length;i++){
        if(artikli[i].id == id){
            artikli[i].naziv = naziv;
            artikli[i].cena = cena;
            artikli[i].imeKompanije = ime;
        }
    }
}
function obrisiArtikal(id){
    let pomocni = []
    for(let i=0;i<artikli.length;i++){
        if(artikli[i].id != id){
            pomocni.push(artikli[i])
        }
    }
    artikli = pomocni;
    return artikli;
}
function dodajArtikal(id,naziv,cena,imeKompanije){
    let artikal = {
        'id': id,
        'naziv': naziv,
        'cena': cena,
        'imeKompanije': imeKompanije
    };
    artikli.push(artikal);
}