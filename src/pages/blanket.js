import React from "react";

import * as tf from '@tensorflow/tfjs';

const model = await tf.loadLayersModel('https://foo.bar/tfjs_artifacts/model.json');
const example = tf.fromPixels(webcamElement);  // for example
const prediction = model.predict(example);

// resize the input image to mobilenet's target size of (224, 224)
let tensor = tf.browser.fromPixels(image)
  .resizeNearestNeighbor([224, 224])
  .toFloat();

// get the model's prediction results
let results = Array.from(predictions)
  .map(function (p, i) {
    return {
      probability: p,s
      className: IMAGENET_CLASSES[i]
    };
  }).sort(function (a, b) {
    return b.probability - a.probability;
  }).slice(0, 5);



import Footer from "../components/common/Footer/Footer.js";

export default function GM(props) {

  return (
    <div>
      <GMSection />
    </div>
  );
}
