import React, { useState, useEffect } from 'react';
import './Test.scss';
import { Client } from "@gradio/client";

const Test = () => {
  const [frontMockup, setFrontMockup] = useState(null);
  const [backMockup, setBackMockup] = useState(null);
  const [color, setColor] = useState("red");
  const [dressType, setDressType] = useState("t-shirt");
  const [frontDesign, setFrontDesign] = useState("yellow stripes");
  const [backDesign, setBackDesign] = useState("plain");
  const [loading, setLoading] = useState(false);
  const [timeTaken, setTimeTaken] = useState(null);
  const [error, setError] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => {
        setCurrentTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [loading]);

  const generateMockup = async () => {
    setLoading(true);
    setFrontMockup(null);
    setBackMockup(null);
    setTimeTaken(null);
    setError(null);
    setStartTime(performance.now());
    setCurrentTime(0);

    try {
      const client = await Client.connect("gaur3009/Modelgen1_69");
      const result = await client.predict("/infer", [
        "a single", // Prompt Part 1 (hidden)
        color, // color
        dressType, // dress_type
        frontDesign,
        backDesign, // design
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
        setFrontMockup(result.data[0]);
        setBackMockup(result.data[1]) // Directly use the image data
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
    <div className="wrapper">
        <div className="heading">
            <span>Design Generation</span>
        </div>
        <div className="container">
        <div className="input-row"> 
            <div className="form">
                <input className="input" placeholder="Color (e.g., red, black, ...)" type="text" 
                onChange={(e) => setColor(e.target.value)}/>
                <span className="input-border"></span>
            </div>
            <div className="form">
                <input className="input" placeholder="Dress Type (e.g., t-shirt, ...)" type="text" 
                onChange={(e) => setDressType(e.target.value)}/>
                <span className="input-border"></span>
            </div>
            <div className="form">
                <input className="input" placeholder="Front Design" type="text" 
                onChange={(e) => setFrontDesign(e.target.value)}/>
                <span className="input-border"></span>
            </div>
            <div className="form">
                <input className="input" placeholder="Back Design" type="text" 
                onChange={(e) => setBackDesign(e.target.value)}/>
                <span className="input-border"></span>
            </div>
            {!loading && (
                <button className='active-run-button' onClick={generateMockup}>Run</button>
            )}
            {loading && (
                <button style={{opacity:0.2}}>Run</button>
            )}
        </div>
        <div className="image-container">
            <div className="image-preview">
                {!frontMockup && !loading && (
                    <div className="front-placeholder">Front</div>
                )}
                {frontMockup && (
                    <img src={`${frontMockup.url}`} alt="T-shirt Mockup" />
                )}
                {loading && (
                    <span>loading...</span>
                )}
        </div>
        <div className="image-preview">
            {!backMockup && !loading && (
                <div className="front-placeholder">Back</div>
            )}
            {backMockup && (
                <img src={`${backMockup.url}`} alt="T-shirt Mockup" />
            )}
            {loading && (
                <span>loading...</span>
            )}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Test;
