/* BUILD GRAPH FROM AST - ALSO COLLECTING NODES & EDGES INTO ARRAYS FOR VIS.JS */
                   /* IMPORTED INTO GRAPH CONTROLLER */


const graphlib = require('graphlib');
const Graph = graphlib.Graph;
const generateNodeId  = require('./idGenerator');

const graphBuilder = async (ast) => {
  let idCounter = 0;
  const graph = new Graph();
  const nodes = [];
  const edges = [];

  const queue = [{ node: ast, parent: null }];

  while (queue.length) {
    const { node, parent } = queue.shift();
    const { nodeId, newIdCounter } = generateNodeId(idCounter);
    idCounter = newIdCounter; // Update the idCounter with the new value

    // Set the node in graphlib's Graph
    graph.setNode(nodeId, { label: node.type, type: node.type });
    // Also push to the nodes array
    nodes.push({ id: nodeId, label: node.type });

    if (parent) {
      // Set the edge in graphlib's Graph
      graph.setEdge(parent.id, nodeId);
      // Also push to the edges array
      edges.push({ from: parent.id, to: nodeId });
    }

    // Assuming all children are in 'body' and it is an array
    if (node.body && Array.isArray(node.body)) {
      node.body.forEach(child => {
        queue.push({ node: child, parent: { id: nodeId } }); 
      });
    }
    // Handle other child properties similarly if needed
  }

  // Return both the graphlib graph and the arrays for vis.js
  return { graph, nodes, edges };
};

module.exports = graphBuilder;
