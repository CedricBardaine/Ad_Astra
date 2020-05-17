const paths = require('../utils');
const mediaPath = "../Medias/";

const fs = require('fs');
const formidable = require('formidable');
const util = require('util'); 

module.exports = {
    
    /**
    * Insert picture in the directory of picts and insert the correpsonding row in table 
    * Method with the "formidable" library. 
    */
    insert_Picture: (req, res) => {
        const TAG_insertPict = "insertPicture: "

        // // let id = req.body.id; 
        let id_userStar;
        // // let xblock = req.body.xblock; // DEFAULT : FALSE
        
        var form = new formidable.IncomingForm();
        form.uploadDir = mediaPath + paths.pathArtistPicts;
        
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
                        fs.rename(file.path, imagePathAndName, function( error ) {});
                    });
                    
                    form.parse(req, (err, fields, files) => {
                        // res.writeHead(200, { 'content-type': 'application/json' });
                        // console.log(TAG_insertPict+ JSON.stringify({ fields, files }, null, 2));
                        console.log(TAG_insertPict+ "saved picture to : "+imagePathAndName);
                    });
                    
                    res.send(result) ;            
                    // res.end("Value has been inserted.") ; 
                });
            }
        });
        
        form.parse(req) ;
        // res.end("Value may not have been inserted.") ; 
    },
    
    // /**
    //  * Insert picture in the directory of picts and insert the correpsonding row in table 
    //  * Method with the "formidable" library. 
    //  * Note 15/05/2020 : nope doesnet work it send the fileanme only ? :( 
    //  */
    // insert_Picture: (req, res) => {
    //     // // let id = req.body.id; 
    //     let id_userStar = req.body.id_userStar; 
    //     // // let xblock = req.body.xblock; // DEFAULT : FALSE
    
    //     let pict = req.body.pict ; 
    
    //     console.log(insertPict+ req.body) ; 
    
    //     console.log(insertPict+ id_userStar + " + "+ pict) ;  
    
    //     let query = "INSERT INTO `Picture` (id_userStar) VALUES ('" +
    //     id_userStar +"')";
    //     db.query(query, (err, result) => {
    //         if (err) {
    //             return res.status(500).send(err); 
    //         }
    
    //         let imgpathandname = mediaPath+paths.pathArtistPicts+result.insertId+'.jpg' ; 
    //         fs.appendFile(imgpathandname, pict, (err) => {
    //             if (err) throw err;
    //             else {
    //                 console.log(insertPict+ 'The image has been saved to '+imgpathandname+' !');
    //                 res.send(result) ;
    //             } 
    //         });          
    //     });
    // }
    
    
    
}