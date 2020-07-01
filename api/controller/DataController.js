
const multer = require('multer');
const path = require('path');


// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname +  path.extname(file.originalname));
    }
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
   
    fileFilter: function(req, file, cb){
      
      checkFileType(file, cb);
    }
  }).single('offer_code_price');


exports.saveFile = (req,res) => {
        
    console.log('offer_code_price is pushed')
    upload(req, res, (err) => {
        if(err){
          res.status(400).json( {
            msg: err
          });
        } else {
          if(req.file == undefined){
            res.status(400).json( {
              msg: 'Error: No File Selected!'
            });
          } else {
           
            res.json( {
              msg: 'File Uploaded!',
              file: `uploads/${req.file.filename}`
            });
          }
        }
      })
    
    }


    // Check File Type
function checkFileType(file, cb){
    // Allowed json
    const filetypes = /json/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: json file Only!');
    }
  }
  

    


