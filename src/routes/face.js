import express from 'express';
import multer from 'multer';
import { nets, detectSingleFace } from 'face-api.js';
import { canvas, faceDetectionNet, faceDetectionOptions } from '../commons';

const router = express.Router();

const storage  = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, 'face.jpg');
  },
});
const uploadWithOriginalFilename = multer({ storage });

const run = async (mode) => {
  const MODEL_URL = './models/';

  await faceDetectionNet.loadFromDisk(MODEL_URL);
  await nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
  await nets.ageGenderNet.loadFromDisk(MODEL_URL);

  const img = await canvas.loadImage('./uploads/face.jpg');
  const result = (await detectSingleFace(img, faceDetectionOptions)
    .withFaceLandmarks()
    .withAgeAndGender());

  return result[mode];
}

router.post('/gender', uploadWithOriginalFilename.single('image'), async (req, res, next) => {
  try {
    const data = await run('gender');
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/age', uploadWithOriginalFilename.single('image'), async (req, res, next) => {
  try {
    const data = await run('age');
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
