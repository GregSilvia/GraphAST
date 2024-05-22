const graphBuilder = require('../Utils/graphBuilder');
const fs = require('fs');
const path = require('path');

async function buildGraphFromAST(req, res, next) {
  try {
    console.log('Received AST in Controller:', req.ast); // Log the received AST
    console.log('Building graph from AST');

    const graphData = await graphBuilder(req.ast);
    console.log('Graph successfully created using builder util function:', graphData);  // Log the received graph data

    // Attach the graph data to the req object
    req.graphData = graphData;







    // Write the graph data to a file

    fs.writeFileSync('GRAPH-output.json', JSON.stringify(graphData, null, 2), 'utf8');



    next(); // Move to next middleware if any or terminate the middleware chain successfully
  } catch (error) {
    console.error('Error building the graph:', error);
    res.status(500).send('Error building the graph');
  }
}

module.exports = buildGraphFromAST;
