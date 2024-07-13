import React, { useState } from 'react';
import './ImageGen.scss';
import { client } from "@gradio/client";

const ImageGen = () => {
  const [mockup, setMockup] = useState(null);
  const [color, setColor] = useState("red");
  const [dressType, setDressType] = useState("t-shirt");
  const [design, setDesign] = useState("yellow stripes");
  const [loading, setLoading] = useState(false);
  const [timeTaken, setTimeTaken] = useState(null);
  const [error, setError] = useState(null);

  const generateMockup = async () => {
    setLoading(true);
    setMockup(null);
    setTimeTaken(null);
    setError(null);
    const startTime = performance.now();

    try {
      const app = await client("gaur3009/Modelgen1");
      const result = await app.predict("/infer", [
        "a single", // Prompt Part 1 (hidden)
        color, // color
        dressType, // dress_type
        design, // design
        "hanging on the plain grey wall", // Prompt Part 5 (hidden)
        "", // negative_prompt (hidden)
        0, // seed
        true, // randomize_seed
        512, // width
        512, // height
        0.0, // guidance_scale
        2, // num_inference_steps
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
        <h1>T-shirt Mockup Generator with Rookus AI</h1>
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
            <p>Generating mockup...</p>
          </div>
        )}
        {mockup && (
          <div className="mockup-result">
            <h2>Mockup Result</h2>
            <img src={`${mockup.url}`} alt="T-shirt Mockup" />
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
