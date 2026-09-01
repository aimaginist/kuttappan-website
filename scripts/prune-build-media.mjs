import { rm } from 'node:fs/promises';
import path from 'node:path';

const sourceMasters = [
  'best-run-kuttappan.mp4',
  'dog-chase.mp4',
  'elephant-jump.mp4',
  'grok-video-0aa17f24-5d3d-47ef-a59e-21e1e5bcd10b (1).mp4',
  'grok-video-7b8a9e7a-c4c1-4052-aeef-e9a1298a47f5 (1).mp4',
  'grok-video-928a3dcd-732f-4114-b7a4-aa6c89a911ec (2).mp4',
  'grok-video-a5786210-809c-4a6f-8a9a-266806c11363 (2).mp4',
  'the-climax.mp4',
];

await Promise.all(sourceMasters.map((file) => rm(path.resolve('dist/media/video', file), {force: true})));
console.log(`[build] Kept ${sourceMasters.length} source-quality video masters out of the deploy bundle.`);
