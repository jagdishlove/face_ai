import "./App.css";
import * as faceapi from "face-api.js";
import React, { useState, useEffect, useRef } from "react";
function App() {
  const vidoHeight = 480;
  const videoWidth = 640;
  // const [initializing, setInitializing] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const loadModals = () => {
      const MODEL_URL = "/models";
      // setInitializing(true);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(openVideo());
    };

    loadModals();
  }, []);

  const openVideo = async () => {
    const video = videoRef.current;
    video.width = videoWidth;
    video.height = vidoHeight;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
      },
    });
    video.srcObject = stream;
    await video.play();
  };

  const handleVideo = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      // console.log(detections);
    }, 100);
  };

  return (
    <div className="App">
      <h1>Hello App se xo ia all things we have right now</h1>
      {/* <span>{initializing ? "Ready" : "initialzing"}</span> */}
      <video
        ref={videoRef}
        autoPlay
        muted
        height={vidoHeight}
        width={videoWidth}
        onPlay={handleVideo}
      />
      <canvas ref={canvasRef} />
    </div>
  );
}
export default App;
