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
    console.log(detections[0]);

    if (!detections || detections.length === 0) {
      console.log("No face Detected!!");
      return;
    }

    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProbableExpression) {
        mostProbableExpression = detections[0].expressions[expression];
        _expression = expression;
      }
    }

    axios
      .get(`https://moody-i9n3.onrender.com/songs?mood=${_expression}`)
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
    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6 w-full md:w-[400px] flex flex-col items-center gap-6 text-white transition-transform duration-300 hover:scale-[1.02]">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
        Detect Your Mood
      </h1>
      <p className="text-center text-sm text-gray-300 leading-relaxed">
        Allow webcam access, click below to detect your facial expression, and
        get song recommendations based on your mood.
      </p>

      <div className="relative w-80 h-52 overflow-hidden rounded-xl border border-gray-700 shadow-md">
        <video
          className="w-full h-full object-cover"
          ref={videoRef}
          autoPlay
          muted
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      <button
        onClick={detectMood}
        className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white rounded-xl shadow-lg group bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 transition-all duration-300"
      >
        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white/30 rounded-full group-hover:w-48 group-hover:h-48 opacity-10"></span>
        <span className="relative">🎵 Detect Mood & Get Song</span>
      </button>
    </div>
  );
}
