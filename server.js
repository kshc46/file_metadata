'use strict';

var express = require('express'),
    glob = require('glob'),
    fs = require('fs'),
    multer = require('multer');

var app = express();

app.use('/public', express.static(process.cwd() + '/public'));

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + '/public/index.html');
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded! File size: " + req.file.size + " bytes");
        removeFiles();
        console.log(req.file)
    });
});

function removeFiles(){
    glob(__dirname + "/uploads/*",function(err,files){
        if (err) throw err;
        files.forEach(function(item,index,array){
            fs.unlink(item, function(err){
                if (err) throw err;
            });
        });
    });
}

var port = Number(process.env.PORT || 8080);
app.listen(port, function () {
    console.log('Listening on port' + port);
});
    
