const paths = require('../utils');

const fs = require('fs');
const formidable = require('formidable');
const util = require('util'); 

module.exports = {
    
    /**
    * Insert Audio in the directory of picts and insert the correpsonding row in table 
    * Method with the "formidable" library. 
    * // TODO: verify file type 
    * // TODO: change wait methode to let the upload. Make it synchronous ?  (do like in Picture.js)
    */
    insert_Audio: (req, res) => {
        const TAG_insertAudio = "insertAudio: "

        // // let id = req.body.id; 
        let id_userStar;
        // // let xblock = req.body.xblock; // DEFAULT : FALSE
        
        var form = new formidable.IncomingForm();
        form.uploadDir = paths.mediasPath + paths.pathArtistAudios;
        
        let errorFieldCount = 1 ; 
        
        form.on('error', function (err) {
            console.log(TAG_insertAudio+ "error : "+err);
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end('error:\n\n'+util.inspect(err));
        })
        .on('aborted', function (err) { console.log(TAG_insertAudio+ "user aborted upload : "+err); })
        .on('end', function() { console.log(TAG_insertAudio+ 'End of operation.'); })
        .on('field', (fieldName, fieldValue) => {
            if (fieldName != "id_userStar") console.log(TAG_insertAudio+ "Error ! Wrong form field sent ! n°"+ (errorFieldCount++) );
            else {
                console.log(TAG_insertAudio+ fieldName + " : "+ fieldValue);
                id_userStar = fieldValue ; 
                
                let query = "INSERT INTO `Audio` (id_userStar) VALUES ('" +
                id_userStar +"')";
                db.query(query, (err, result) => {
                    if (err) { return res.status(500).send(err); }
                    
                    let imagePathAndName = form.uploadDir + result.insertId;
                    
                    form.on('file', function (field, file) {
                          console.log(TAG_insertAudio+ "field : "+field, file);
                        console.log(TAG_insertAudio+ "saving file...");
                        let fileType = file.type.split("/")[1];
                        imagePathAndName = imagePathAndName +"."+fileType ; 
                        fs.rename(file.path, imagePathAndName, function( error ){} );
                    });
                    
                   

                    setTimeout(function() {
                        form.parse(req, (err, fields, files) => {
                            console.log(TAG_insertAudio+ "saved Audio to : "+imagePathAndName);
                        });
                        
                        res.send(result) ;            
                    }, 3000);      
                    
                    // res.end("Value has been inserted.") ; 
                });
            }
        });
        
        form.parse(req) ;
        // res.end("Value may not have been inserted.") ; 
    },
    
    
}