const validateAST = require('../Utils/validateAST');
const fs = require('fs');


function validationMiddleware(req, res, next) {
  console.log('Validation Middleware');
  try {

    if (!req.files || !req.files.file) {
      throw new Error('No file uploaded');
    }

    const uploadedFile = req.files.file;
    console.log('File received:', uploadedFile.name); // Log the name of the file


    if (uploadedFile.mimetype !== 'application/json') {
      throw new Error('Invalid file type. Only JSON files are allowed.');
    }

    const ast = JSON.parse(uploadedFile.data);
    console.log('Parsed AST:', ast); // This will show you the structure of the AST

    validateAST(ast);


    fs.writeFileSync('AST-output.json', JSON.stringify(ast, null, 2), 'utf8');
    console.log('AST written to output log file');

    req.ast = ast;

    next();

  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = validationMiddleware;