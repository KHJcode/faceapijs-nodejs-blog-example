import '@tensorflow/tfjs-node';

import * as faceapi from 'face-api.js';

const canvas = require('canvas');

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

export { canvas };
