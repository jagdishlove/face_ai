
import './App.css';
import * as faceapi from 'face-api.js'
import React, {useState,useEffect,useRef} from 'react'
function App() {
  const vidoHeight=480
  const videoWidth=640
  const [initializing, setInitializing] = useState(false);
  const videoRef=useRef()
  const canvasRef=useRef()

  useEffect(()=>{
    const loadModals=()=>{
      const MODEL_URL=process.env.PUBLIC_URL + '/models'
      setInitializing(true)
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]).then(startVideo);
    }

    loadModals();
  },[])

  function startVideo(){
    navigator.getUserMedia(
      {video:{}},
    stream => video.srcObject= stream
    )
  }
  return (
    <div className="App">
     <h1>Hello App se xo ia all things we have right now</h1>
    <span>{initializing ?  'initialzing' : 'Ready'}</span>
    <video ref={videoRef} autoPlay muted height={vidoHeight} width={videoWidth}/>
    <canvas ref={canvasRef}/>
    </div>
  );
}
export default App;
