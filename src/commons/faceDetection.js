import { nets, SsdMobilenetv1Options } from 'face-api.js';

const getFaceDetectorOptions = () => (new SsdMobilenetv1Options({ minConfidence: 0.5 }));

export const faceDetectionNet = nets.ssdMobilenetv1;
export const faceDetectionOptions = getFaceDetectorOptions();
