const express = require('express');
const fileUpload = require('express-fileupload');
const validationMiddleware = require('./Middleware/validationMiddleware');
const buildGraphFromAST  = require('./Controllers/graphController');

const app = express();

app.use(fileUpload());

app.post('/api/upload', validationMiddleware, buildGraphFromAST, (req, res) => {
  if (req.ast) { // Check if the AST is correctly attached to the request
    console.log('Graph is completed and ready for front end visualization');
    // console.log(req.graphData)
  }

  res.send(req.graphData);
});


app.get('/', (req, res) => {
  res.status(200).send('Backend server is running!');
});





const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});