const paths = require('../utils');

const fs = require('fs');
const formidable = require('formidable');
const util = require('util'); 

const fileTAG = "Picture.js : ";



module.exports = {
    
    /**
    * Insert picture in the directory of picts and insert the correpsonding row in table 
    * Method with the "formidable" library. 
    * // TODO: verify file type 
    * WORKING!! well, only one pict after another... 
        */
        insert_Picture: (req, res) => {
            // Global tag for console formating
            const theTAG =fileTAG+ "insertPicture : "
            
            
            // get the multipart form data
            var form = new formidable.IncomingForm();
            form.uploadDir = paths.mediasPath + paths.pathArtistPicts;
            
            
            let id_userStar;
            
            let thePictId ; 
            let theFile ; 
            let imagePathAndName ; 

            let errorFieldCount = 1 ; 
            let renamed_successfully = false ; 
            let picturesSaved = [] ; 
            

            form.on('error', function (err) {
                console.log(theTAG+  "error : "+err);
                res.writeHead(200, {'content-type': 'text/plain'});
                res.end('error:\n\n'+util.inspect(err));
            })
            .on('aborted', function (err) { 
                console.log(theTAG+  "user aborted upload : "+err); 
            })
            .on('field', (fieldName, fieldValue) => {
                if (fieldName != "id_userStar") console.log(theTAG+  "Error ! Wrong form field sent ! n°"+ (errorFieldCount++) );
                else {
                    console.log(theTAG+  fieldName + " = "+ fieldValue);

                    id_userStar = fieldValue ; 
                    
                    let query = "INSERT INTO `Picture` (id_userStar) VALUES ('" +
                    id_userStar +"')";
                    db.query(query, (err, result) => {
                        if (err) { 
                            return res.status(500).send(err); 
                        }
                        thePictId = result.insertId ; 
                        console.log(theTAG+  "set thepictid :"+ thePictId);
                        
                        try {
                            console.log(theTAG+  "rename in db query callback..."); 
                            let fileType = theFile.type.split("/")[1];
                            console.log(theTAG+  "renaming uploaded file '"+ thePictId +"."+fileType+"'");
                            imagePathAndName = form.uploadDir +  thePictId  +"."+fileType ; 
                            fs.renameSync(theFile.path, imagePathAndName);
                            
                            picturesSaved.push(thePictId);
                            console.log(theTAG+  "renamed picture to : "+imagePathAndName);
                            renamed_successfully = true ; 
                        } catch (TypeError) {
                            console.log("error : "+ TypeError); 
                        }
                    });
                }
            })
            .on('file', function (field, file) {
                console.log(theTAG+ "parsing in 'on('file')' method"); 
                theFile = file ;  
                
                if (!renamed_successfully  &&  thePictId != undefined) {
                    console.log(theTAG+  "rename in the 'on('file')' method..."); 
                    let fileType = theFile.type.split("/")[1];
                    console.log(theTAG+  "renaming uploaded file '"+ thePictId +"."+fileType+"'");
                    imagePathAndName = form.uploadDir +  thePictId  +"."+fileType ; 
                    fs.renameSync(theFile.path, imagePathAndName);
                    
                    picturesSaved.push(thePictId);
                    console.log(theTAG+  "renamed picture to : "+imagePathAndName);
                }
            });
            

            form.parse(req, (err, fields, files) => {   
                nbFileUploaded = Object.keys(files).length ; 
                console.log (theTAG+  "uploaded : "+nbFileUploaded+ " file(s)");
                // if(nbFileUploaded != 1) {}; 
                
                if(!err) res.status(200); 
                else res.status(500) ;
                // res.writeHead(200, { 'content-type': 'application/json' });
                // console.log(theTAG+  JSON.stringify({ err, fields, files }, null, 2));
                
                // NB: even if it doesn't show the id of the pict, it has surely worked, it's caused when the renaming   ?(in the db query callback was too slow)?  (not 100% sur). 
                res.send("Saved new pict(s) : "+ JSON.stringify(picturesSaved) ) ;
            });
            
            
            console.log()
            return ;
            // res.end("Value has been inserted.") ; 
            // form.parse(req) ;
            // res.end("Value may not have been inserted.") ; 
        },
        
        /**
        * Method with "multer" lib. 
        * @deprecated should not be used. Doesn't work.
        */
        insert_Picture2: (req, res) => {
            var multer = require('multer');
            var path = require('path')
            const theTAG =fileTAG+ "insertPicture2: "
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
            
            console.log(theTAG , req.body.id_userStar , req.body.pict);
            
            
            var form = new formidable.IncomingForm();
            form.uploadDir = paths.mediasPath + paths.pathArtistPicts;
            form.on('file', function (field, file) {
                //   console.log(theTAG+ "field : "+field, file);
                console.log(theTAG+ "saving file...");
                // file.push([field, file]); // 15/05/2020 : doesn't exist ? 
                // fs.rename(file.path, form.uploadDir + "/" + "9999.jpg", function( error ) {});
                let fileType = file.type.split("/")[1];
                imagePathAndName = imagePathAndName +"."+fileType ; 
                fs.renameSync(file.path, imagePathAndName );
            });
            form.parse(req);
            
            
            
            // console.log(theTAG+ fieldName + " : "+ fieldValue);
            // id_userStar = fieldValue ; 
            
            let query = "INSERT INTO `Picture` (id_userStar) VALUES ('" +
            id_userStar +"')";
            db.query(query, (err, result) => {
                console.log(theTAG, "launching db query")
                if (err) { return res.status(500).send(err); }
                
                imagePathAndName = uploadDir + result.insertId;
                
                console.log(theTAG , "inserted id : "+ result.insertId)
                
                
                var customStorage = multer.diskStorage({
                    destination: function (req, file, cb) {
                        console.log(theTAG, "setting destination folder")
                        console.log(theTAG, "file : "+thePictUploaded)
                        // cb(null, process.env.UPLOAD_FOLDER);
                        cb(null, uploadDir );
                    },
                    filename: function (req, file, cb) {
                        console.log(theTAG, "setting destination name")
                        console.log(theTAG, "file : "+file)
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
                //     console.log(theTAG, "upload... ")
                //     if (err) {} 
                //     // Get posted data:
                //     var obj = { 
                //         // myField1: req.body.myField1,
                //         // myField2: req.body.myField2
                //     };
                //  });
                console.log(theTAG, "ending");
                res.send("end");
            });    
            
        },
        
        /**
        * @deprecated should not be used. Doesn't work.
        */
        insert_Picture3: (req, res) => {
            const theTAG =fileTAG+ "insertPicture3: "
            
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
                console.log(theTAG+ "query callback...", result.insertId);
                
                let imagePathAndName = form.uploadDir + result.insertId;
                
                form.on('error', function (err) {
                    console.log(theTAG+ "error : "+err);
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.end('error:\n\n'+util.inspect(err));
                })
                .on('aborted', function (err) { console.log(theTAG+ "user aborted upload : "+err); })
                .on('field', (fieldName, fieldValue) => {
                    if (fieldName != "id_userStar") console.log(theTAG+ "Error ! Wrong form field sent ! n°"+ (errorFieldCount++) );
                    else {
                        console.log(theTAG+ fieldName + " : "+ fieldValue);
                        id_userStar = fieldValue ;
                        
                    }
                    
                })
                
                .parse(req, (err, fields, files) => {
                    // res.writeHead(200, { 'content-type': 'application/json' });
                    // console.log(theTAG+ JSON.stringify({ fields, files }, null, 2));
                    console.log(theTAG+ "saved picture to : "+imagePathAndName);
                });
                
                res.send(result) ;   
            })
            
            
            form.parse(req) ;
        },
        
        /**
        * Uses Formidable, but this way : https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp 
        */
        insert_Picture4: (req, res) => {
            const theTAG =fileTAG+ "insertPicture4: "
            var form = new formidable.IncomingForm();
            
            console.log(theTAG , "start");
            
            form.parse(req, function (err, fields, files) {
                console.log(theTAG , "parse");
                console.log( theTAG , fields.name);
                console.log( theTAG , files);
                
                /* for : 
                // formData.append('pict', [...]) 
                // formData.append('id_userStar', [...]) */ 
                var id_userStar = fields.id_userStar 
                var oldpath = files.pict.path;
                
                var newpath = paths.mediasPath + paths.pathArtistPicts; + files.pict.name;
                fs.rename(oldpath, newpath, function (err) {
                    console.log(theTAG , "rename");
                    if (err) throw err;
                    res.write('File uploaded and moved!');
                    res.end();
                });
            });
            
            // let theTAG =fileTAG+ "insert_Picture4(5): ";
            // console.log(theTAG, "start");
            // console.log(theTAG, req.body);
            
            // // let id = req.body.id; 
            // let pict = req.body.pict; 
            // let id_userStar = req.body.id_userStar; 
            
            // var newpath = paths.mediasPath + paths.pathArtistPicts; + files.pict.name;
            //     fs.rename(oldpath, newpath, function (err) {
            //         console.log(theTAG , "rename");
            //         if (err) throw err;
            //         res.write('File uploaded and moved!');
            //         res.end();
            //     });
        }
    }