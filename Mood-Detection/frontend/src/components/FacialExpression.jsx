import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export default function FacialExpression({ setsong }) {
  const videoRef = useRef();

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    let mostProbableExpression = 0;
    let _expression = "";

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProbableExpression) {
        mostProbableExpression = detections[0].expressions[expression];
        _expression = expression;
      }
    }

    axios
      .get(`http://localhost:3000/songs?mood=${_expression}`)
      .then((resolve) => {
        console.log(resolve.data);
        setsong(resolve.data.song);
      });
    console.log(_expression);
  }

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="flex flex-col bg-zinc-900 p-6 rounded-2xl shadow-lg max-w-lg mx-auto gap-5 text-white">
      <h1 className="text-2xl font-semibold text-center">Detect Your Mood</h1>
      <p className="text-center text-zinc-300 text-sm">
        Allow webcam access and click below to detect your facial expression and
        get a song recommendation automatically.
      </p>
      <div className="flex justify-center">
        <video
          className="w-80 h-48 rounded-lg object-cover border border-zinc-700"
          ref={videoRef}
          autoPlay
          muted
        />
      </div>
      <button
        className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition duration-200 px-5 py-3 rounded-lg text-lg font-medium text-center"
        onClick={detectMood}
      >
        Detect Mood & Get Song
      </button>
    </div>
  );
}
