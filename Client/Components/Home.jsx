import React, { useRef, useState, useEffect } from "react";
import "../styling.css";
import { DataSet, Network } from "vis-network/standalone";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [graphData, setGraphData] = useState({ nodes: {}, edges: [] });
  const fileInputRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    console.log("useEffect triggered with graphData:", graphData);

    if (networkRef.current && graphData && graphData.nodes && graphData.edges) {
      const data = {
        nodes: new DataSet(graphData.nodes),
        edges: new DataSet(graphData.edges),
      };

      const container = networkRef.current;
      const options = {
        layout: {
          hierarchical: true,
        },
      };
      const network = new Network(container, data, options);
    }
  }, [graphData]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleFileUpload(file);
    }
  };

  const handleClick = () => {
    // IF NO FILE OPEN FINDER
    if (!selectedFile) {
      fileInputRef.current.click();
    } else {
      // IF THERE IS A FILE PERFORM UPLOAD
      handleFileUpload(selectedFile);
    }
  };

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    // FETCH REQUEST TO SERVER
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Recieved Graph Data:", data);
        setGraphData({ ...data }); // Set graph data received from the server
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section className="home">
      <header>
        <h1>Welcome to GraphAST</h1>
        <h3>Visualizing ASTs as Property Graphs</h3>
      </header>
      <article>
        <p>
          GraphAST is a simple, lightweight application that converts any EStree
          format AST .json file into a hierarchical-based property graph.
        </p>
        <p>
          Each node in the AST is represented as a graph node, with edges
          denoting relationships. Unique IDs for nodes ensure distinct
          identification within the graph.
        </p>
        <p>
          It leverages the Acorn parser and Graphlib, with Vis.js for visual
          representation.
        </p>
        <div className="file-upload">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            hidden
          />
          <button onClick={handleClick}>
            {selectedFile ? "Upload and Visualize" : "Upload and Visualize"}
          </button>
        </div>
        <div className="graph-container" ref={networkRef}></div>
      </article>
    </section>
  );
};

export default Home;
