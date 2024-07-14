import React, { useState, useEffect } from 'react';
import './ImageGen.scss';
import { client } from "@gradio/client";

const ImageGen = () => {
  const [mockup, setMockup] = useState(null);
  const [color, setColor] = useState("red");
  const [dressType, setDressType] = useState("t-shirt");
  const [design, setDesign] = useState("yellow stripes");
  const [loading, setLoading] = useState(false);
  const [timeTaken, setTimeTaken] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [loading]);

  const generateMockup = async () => {
    setLoading(true);
    setMockup(null);
    setTimeTaken(null);
    setError(null);
    setElapsedTime(0);
    const startTime = performance.now();

    try {
      const app = await client("gaur3009/Rookus_mockup");
      const result = await app.predict("/infer", [
        `A ${color} ${dressType} with ${design}`, // Prompt Part 1
        "", // Prompt Part 5 (hidden)
        0, // Seed
        true, // Randomize seed
        512, // Width
        512, // Height
        0.0, // Guidance scale
        2, // Number of inference steps
      ]);

      if (result && result.data && result.data[0]) {
        console.log("Generated Image Data:", result.data[0]); // Log image data
        setMockup(result.data[0]); // Directly use the image data
      } else {
        throw new Error("Invalid result format");
      }
      const endTime = performance.now();
      setTimeTaken(((endTime - startTime) / 1000).toFixed(2));
    } catch (error) {
      console.error("Error generating mockup:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-gen-container">
      <div className="form-area">
        <h1>T-shirt Mockup Generator (wait time ~1 minute)</h1>
        <div className="form-group">
          <label>Color</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Enter color (e.g., red, blue)"
          />
        </div>
        <div className="form-group">
          <label>Dress Type</label>
          <input
            type="text"
            value={dressType}
            onChange={(e) => setDressType(e.target.value)}
            placeholder="Enter dress type (e.g., t-shirt, sweatshirt)"
          />
        </div>
        <div className="form-group">
          <label>Design</label>
          <input
            type="text"
            value={design}
            onChange={(e) => setDesign(e.target.value)}
            placeholder="Enter design (e.g., yellow stripes)"
          />
        </div>
        <button onClick={generateMockup}>Generate Mockup</button>
      </div>
      <div className="output-area">
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Generating mockup... Elapsed time: {elapsedTime} seconds</p>
          </div>
        )}
        {mockup && (
          <div className="mockup-result">
            <h2>Mockup Result</h2>
            <img src={`data:image/png;base64,${mockup}`} alt="T-shirt Mockup" />
          </div>
        )}
        {!loading && !mockup && (
          <div className="mockup-result">
            <h2>Mockup Result</h2>
            <div className="placeholder-box">Your generated image will appear here.</div>
          </div>
        )}
        {timeTaken && (
          <div className="time-taken">
            <p>Time taken: {timeTaken} seconds</p>
          </div>
        )}
        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGen;
