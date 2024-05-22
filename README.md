# GraphAST

GraphAST is a simple lightweight application that will convert any EStree format AST .json file into a hierarchical based property graph.

Built off of Acorn parser and Graphlib, Vis.js is used to visually represent the graph data.

Each node in the AST is represented as a node in the graph, and edges represent relationships between nodes.
We generate unique IDs for nodes to ensure each node is uniquely identified within the graph.

Resources:

Graphlib
https://www.npmjs.com/package/@dagrejs/graphlib

Github for Graphlib Explanation
https://github.com/zmitry/graphlib

Graphlib Wiki
https://github.com/dagrejs/graphlib/wiki

Vis.js Visualization Library
https://almende.github.io/vis/index.html
