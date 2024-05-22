/* GENERATE UNIQUE ID FOR EACH NODE IN THE GRAPH TO ENSURE DISTINCT IDENTIFICATION */
                        /* IMPORTED INTO GRAPH BUILDER */


const generateNodeId = (idCounter) => {
  return { nodeId: idCounter, newIdCounter: idCounter + 1 };
};

module.exports = generateNodeId;