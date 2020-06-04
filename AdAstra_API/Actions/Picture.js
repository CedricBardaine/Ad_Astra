const paths = require('../utils');

const fs = require('fs');
const formidable = require('formidable');
const util = require('util'); 

module.exports = {
    
    /**
    * Insert picture in the directory of picts and insert the correpsonding row in table 
    * Method with the "formidable" library. 
    * TODO: verify file type 
    * TODO: change wait methode to let the upload. Make it synchronous ? 
    */
    insert_Picture: (req, res) => {
        const TAG_insertPict = "insertPicture: "
        
        // // let id = req.body.id; 
        let id_userStar;
        // // let xblock = req.body.xblock; // DEFAULT : FALSE
        
        var form = new formidable.IncomingForm();
        form.uploadDir = paths.mediasPath + paths.pathArtistPicts;
        
        let errorFieldCount = 1 ; 
        
        form.on('error', function (err) {
            console.log(TAG_insertPict+ "error : "+err);
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end('error:\n\n'+util.inspect(err));
        })
        .on('aborted', function (err) { console.log(TAG_insertPict+ "user aborted upload : "+err); })
        .on('end', function() { console.log(TAG_insertPict+ 'End of operation.'); })
        .on('field', (fieldName, fieldValue) => {
            if (fieldName != "id_userStar") console.log(TAG_insertPict+ "Error ! Wrong form field sent ! n°"+ (errorFieldCount++) );
            else {
                console.log(TAG_insertPict+ fieldName + " : "+ fieldValue);
                id_userStar = fieldValue ; 
                
                let query = "INSERT INTO `Picture` (id_userStar) VALUES ('" +
                id_userStar +"')";
                db.query(query, (err, result) => {
                    if (err) { return res.status(500).send(err); }
                    
                    let imagePathAndName = form.uploadDir + result.insertId;
                    
                    form.on('file', function (field, file) {
                        //   console.log(TAG_insertPict+ "field : "+field, file);
                        console.log(TAG_insertPict+ "saving file...");
                        // file.push([field, file]); // 15/05/2020 : doesn't exist ? 
                        // fs.rename(file.path, form.uploadDir + "/" + "9999.jpg", function( error ) {});
                        let fileType = file.type.split("/")[1];
                        imagePathAndName = imagePathAndName +"."+fileType ; 
                        fs.rename(file.path, imagePathAndName, function( error ){} );
                    });
                    
                    
                    
                    setTimeout(function() {
                        form.parse(req, (err, fields, files) => {
                            // res.writeHead(200, { 'content-type': 'application/json' });
                            // console.log(TAG_insertPict+ JSON.stringify({ fields, files }, null, 2));
                            console.log(TAG_insertPict+ "saved picture to : "+imagePathAndName);
                        });
                        
                        res.send(result) ;            
                    }, 1000);  
                    
                    
                    
                    // res.end("Value has been inserted.") ; 
                });
            }
        });
        
        form.parse(req) ;
        // res.end("Value may not have been inserted.") ; 
    },
    
    /**
    * Method with "multer" lib. 
    * @deprecated should not be used. Doesn't work.
    */
    insert_Picture2: (req, res) => {
        var multer = require('multer');
        var path = require('path')
        const TAG_insertPict = "insertPicture2: "
        //
        // // let id = req.body.id; 
        let id_userStar = req.body.id_userStar;
        // // let xblock = req.body.xblock; // DEFAULT : FALSE
        //
        let thePictUploaded = req.body.pict ; 
        let uploadDir = paths.mediasPath + paths.pathArtistPicts;
        let imagePathAndName ; 
        //
        let errorFieldCount = 1 ; 
        
        console.log(TAG_insertPict , req.body.id_userStar , req.body.pict);
        
        
        var form = new formidable.IncomingForm();
        form.uploadDir = paths.mediasPath + paths.pathArtistPicts;
        form.on('file', function (field, file) {
            //   console.log(TAG_insertPict+ "field : "+field, file);
            console.log(TAG_insertPict+ "saving file...");
            // file.push([field, file]); // 15/05/2020 : doesn't exist ? 
            // fs.rename(file.path, form.uploadDir + "/" + "9999.jpg", function( error ) {});
            let fileType = file.type.split("/")[1];
            imagePathAndName = imagePathAndName +"."+fileType ; 
            fs.rename(file.path, imagePathAndName, function( error ){} );
        });
        form.parse(req);
        
        
        
        // console.log(TAG_insertPict+ fieldName + " : "+ fieldValue);
        // id_userStar = fieldValue ; 
        
        let query = "INSERT INTO `Picture` (id_userStar) VALUES ('" +
        id_userStar +"')";
        db.query(query, (err, result) => {
            console.log(TAG_insertPict, "launching db query")
            if (err) { return res.status(500).send(err); }
            
            imagePathAndName = uploadDir + result.insertId;
            
            console.log(TAG_insertPict , "inserted id : "+ result.insertId)
            
            
            var customStorage = multer.diskStorage({
                destination: function (req, file, cb) {
                    console.log(TAG_insertPict, "setting destination folder")
                    console.log(TAG_insertPict, "file : "+thePictUploaded)
                    // cb(null, process.env.UPLOAD_FOLDER);
                    cb(null, uploadDir );
                },
                filename: function (req, file, cb) {
                    console.log(TAG_insertPict, "setting destination name")
                    console.log(TAG_insertPict, "file : "+file)
                    // cb(null, path.extname(file.originalname));
                    // cb(null, toString(result.insertId) );
                    // cb(null, path.extname(file.originalname) );
                }
            });
            
            customStorage._handleFile()
            
            // Treat posted file
            // var upload = multer({ storage: customStorage }).fields([
            //     { name: 'pict', maxCount: 1 }, 
            // ]);
            var upload = multer({ storage: customStorage });
            
            
            // upload(req, res, function(err) {
            //     console.log(TAG_insertPict, "upload... ")
            //     if (err) {} 
            //     // Get posted data:
            //     var obj = { 
            //         // myField1: req.body.myField1,
            //         // myField2: req.body.myField2
            //     };
            //  });
            console.log(TAG_insertPict, "ending");
            res.send("end");
        });    
        
    },
    
    /**
    * @deprecated should not be used. Doesn't work.
    */
    insert_Picture3: (req, res) => {
        const TAG_insertPict = "insertPicture3: "
        
        // // let id = req.body.id; 
        // let id_userStar;
        let id_userStar = req.body.id_userStar;
        // // let xblock = req.body.xblock; // DEFAULT : FALSE
        //
        var form = new formidable.IncomingForm();
        form.uploadDir = paths.mediasPath + paths.pathArtistPicts;
        //
        let errorFieldCount = 1 ; 
        //
        var ret ; 
        
        let query = "INSERT INTO `Picture` (id_userStar) VALUES ('" +
        id_userStar +"')";
        
        db.query(query, (err, result) => {
            if (err) { return res.status(500).send(err); }
            console.log(TAG_insertPict+ "query callback...", result.insertId);
            
            let imagePathAndName = form.uploadDir + result.insertId;
            
            form.on('error', function (err) {
                console.log(TAG_insertPict+ "error : "+err);
                res.writeHead(200, {'content-type': 'text/plain'});
                res.end('error:\n\n'+util.inspect(err));
            })
            .on('aborted', function (err) { console.log(TAG_insertPict+ "user aborted upload : "+err); })
            .on('end', function() { console.log(TAG_insertPict+ 'End of operation.'); })
            .on('field', (fieldName, fieldValue) => {
                if (fieldName != "id_userStar") console.log(TAG_insertPict+ "Error ! Wrong form field sent ! n°"+ (errorFieldCount++) );
                else {
                    console.log(TAG_insertPict+ fieldName + " : "+ fieldValue);
                    id_userStar = fieldValue ;
                    
                }
                
            })
            
            .parse(req, (err, fields, files) => {
                // res.writeHead(200, { 'content-type': 'application/json' });
                // console.log(TAG_insertPict+ JSON.stringify({ fields, files }, null, 2));
                console.log(TAG_insertPict+ "saved picture to : "+imagePathAndName);
            });
            
            res.send(result) ;   
        })
        
        
        form.parse(req) ;
    },
    
    /**
    * Uses Formidable, but this way : https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp 
    */
    insert_Picture4: (req, res) => {
        const TAG_insertPict = "insertPicture4: "
        var form = new formidable.IncomingForm();
        
        console.log(TAG_insertPict , "start");
        
        form.parse(req, function (err, fields, files) {
            console.log(TAG_insertPict , "parse");
            console.log( TAG_insertPict , fields.name);
            console.log( TAG_insertPict , files);
            
            /* for : 
            // formData.append('pict', [...]) 
            // formData.append('id_userStar', [...]) */ 
            var id_userStar = fields.id_userStar 
            var oldpath = files.pict.path;
            
            var newpath = paths.mediasPath + paths.pathArtistPicts; + files.pict.name;
            fs.rename(oldpath, newpath, function (err) {
                console.log(TAG_insertPict , "rename");
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });

        // let theTAG = "insert_Picture4(5): ";
        // console.log(theTAG, "start");
        // console.log(theTAG, req.body);

        // // let id = req.body.id; 
        // let pict = req.body.pict; 
        // let id_userStar = req.body.id_userStar; 

        // var newpath = paths.mediasPath + paths.pathArtistPicts; + files.pict.name;
        //     fs.rename(oldpath, newpath, function (err) {
        //         console.log(TAG_insertPict , "rename");
        //         if (err) throw err;
        //         res.write('File uploaded and moved!');
        //         res.end();
        //     });
    }
}