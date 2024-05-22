/* VALIDATE THE AST IS THE CORRECT FORMAT BEFORE PROCEEDING ONTO GRAPH CONSTRUCTION */
                   /* IMPORTED INTO VALIDATION MIDDLEWARE */

const validateAST = (ast) => {
  if (!ast) {
    throw new Error('No AST provided');
  }
  if (!ast.type || ast.type !== 'Program') {
    throw new Error('Invalid AST: Must be of type Program');
  }
  if (!ast.body || !Array.isArray(ast.body)) {
    throw new Error('Invalid AST: Must have a body property that is an array');
  }
  if (ast.body.length === 0) {
    throw new Error('Invalid AST: Body array must not be empty');
  }
  console.log('AST is valid');
  return true;
}

module.exports = validateAST;

