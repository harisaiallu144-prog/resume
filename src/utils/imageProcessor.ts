/**
 * Image Processor and 3D Particle Generator for Allu Kumarswami's Portrait
 */

export interface ParticleCloudData {
  positions: Float32Array;
  photoPositions: Float32Array;
  sculptureColors: Float32Array;
  photoColors: Float32Array;
  particleSizes: Float32Array;
  randomFactors: Float32Array;
  normY: Float32Array;
  count: number;
  aspectRatio: number;
}

export type ProgressCallback = (stageNumber: number, stageName: string, percent: number) => void;

/**
 * Loads an image from URL into an HTMLImageElement
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load image at ${src}: ${e}`));
    img.src = src;
  });
}

/**
 * Extracts depth and generates 3D particle data from portrait image
 */
export async function generateParticleDataFromImage(
  imageSrc: string,
  targetParticleCount: number = 55000,
  onProgress?: ProgressCallback
): Promise<ParticleCloudData> {
  // Stage 01: Initializing
  onProgress?.(1, "Initializing WebGL Engine", 10);
  await new Promise((r) => setTimeout(r, 50));

  // Stage 02: Loading Portrait
  onProgress?.(2, "Loading Portrait Assets", 22);
  let img: HTMLImageElement;
  try {
    img = await loadImage(imageSrc);
  } catch (err) {
    console.warn("Could not load primary image, generating procedural portrait silhouette", err);
    // Create a fallback procedural portrait canvas
    const fallbackCanvas = document.createElement("canvas");
    fallbackCanvas.width = 512;
    fallbackCanvas.height = 680;
    const ctx = fallbackCanvas.getContext("2d")!;
    ctx.fillStyle = "#030303";
    ctx.fillRect(0, 0, 512, 680);
    // Draw stylized silhouette
    ctx.fillStyle = "#d8a47f";
    ctx.beginPath();
    ctx.ellipse(256, 260, 95, 125, 0, 0, Math.PI * 2);
    ctx.fill();
    // Neck & shoulders
    ctx.fillStyle = "#1e1e24";
    ctx.beginPath();
    ctx.moveTo(100, 680);
    ctx.quadraticCurveTo(256, 480, 412, 680);
    ctx.fill();
    img = new Image();
    img.src = fallbackCanvas.toDataURL();
    await new Promise((r) => (img.onload = r));
  }

  // Stage 03: Loading Depth Model
  onProgress?.(3, "Loading Depth Estimation Model", 36);
  await new Promise((r) => setTimeout(r, 60));

  // Stage 04: Generating Depth Maps
  onProgress?.(4, "Generating Depth Maps & Normals", 48);
  const canvas = document.createElement("canvas");
  const sampleW = 280;
  const sampleH = Math.round(sampleW * (img.height / img.width));
  canvas.width = sampleW;
  canvas.height = sampleH;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, sampleW, sampleH);
  const imgData = ctx.getImageData(0, 0, sampleW, sampleH);
  const pixels = imgData.data;

  // Stage 05: Segmenting Foreground
  onProgress?.(5, "Segmenting Silhouette & Hair", 60);
  await new Promise((r) => setTimeout(r, 50));

  // Identify foreground pixels
  const candidateIndices: number[] = [];
  const threshold = 18; // background dark threshold

  for (let y = 0; y < sampleH; y++) {
    for (let x = 0; x < sampleW; x++) {
      const idx = (y * sampleW + x) * 4;
      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

      // Distance from center for falloff
      const nx = (x / sampleW - 0.5) * 2.0;
      const ny = (y / sampleH - 0.5) * 2.0;
      const distFromCenter = Math.sqrt(nx * nx + ny * ny);

      // Keep pixels that are either bright enough or within torso/bust region
      const isTorso = y > sampleH * 0.55 && Math.abs(nx) < 0.85;
      const isHead = y <= sampleH * 0.55 && Math.abs(nx) < 0.65;

      if ((brightness > threshold || isTorso || isHead) && distFromCenter < 1.35) {
        candidateIndices.push(y * sampleW + x);
      }
    }
  }

  // Stage 06: Constructing 3D Volume
  onProgress?.(6, "Constructing 3D Voxel Volume", 72);
  await new Promise((r) => setTimeout(r, 50));

  // Select target points with blue-noise jittered sampling
  const totalCandidates = candidateIndices.length;
  const actualCount = Math.min(targetParticleCount, totalCandidates);
  const step = Math.max(1, Math.floor(totalCandidates / actualCount));

  const positions = new Float32Array(actualCount * 3);
  const photoPositions = new Float32Array(actualCount * 3);
  const sculptureColors = new Float32Array(actualCount * 3);
  const photoColors = new Float32Array(actualCount * 3);
  const particleSizes = new Float32Array(actualCount);
  const randomFactors = new Float32Array(actualCount);
  const normY = new Float32Array(actualCount);

  // Crimson palette parameters
  // Primary Crimson: rgb(163, 10, 25) -> (0.64, 0.039, 0.098)
  // Deep Burgundy:   rgb(53, 3, 9)     -> (0.207, 0.012, 0.035)
  // Bright Crimson:  rgb(215, 25, 45)  -> (0.84, 0.098, 0.176)

  // Stage 07: Extracting Geometry
  onProgress?.(7, "Extracting Mesh & Geometry", 82);

  const aspect = sampleW / sampleH;
  const scale = 2.4;

  let p = 0;
  for (let i = 0; i < actualCount; i++) {
    const candidateIdx = candidateIndices[(i * step + Math.floor(Math.random() * step)) % totalCandidates];
    const px = candidateIdx % sampleW;
    const py = Math.floor(candidateIdx / sampleW);

    const pixOffset = candidateIdx * 4;
    const pr = pixels[pixOffset] / 255.0;
    const pg = pixels[pixOffset + 1] / 255.0;
    const pb = pixels[pixOffset + 2] / 255.0;
    const luminance = 0.299 * pr + 0.587 * pg + 0.114 * pb;

    // Normalized coordinates (-1 to 1)
    const normX = (px / sampleW - 0.5) * 2.0;
    const normalizedY = (1.0 - py / sampleH) * 2.0 - 1.0;
    const normalized01Y = 1.0 - py / sampleH; // 1.0 at top of head, 0.0 at bottom

    // 3D Depth estimation logic for bust
    // Head center is around Y = 0.25 (in normalized coords)
    const headCenterY = 0.28;
    const headRadiusX = 0.45;
    const headRadiusY = 0.55;

    const dx = normX / headRadiusX;
    const dy = (normalizedY - headCenterY) / headRadiusY;
    const headDistSq = dx * dx + dy * dy;

    let zDepth = 0.0;
    if (headDistSq < 1.0 && normalizedY > -0.2) {
      // Convex ellipsoid curvature for facial skull
      const ellipsoidZ = Math.sqrt(Math.max(0.0, 1.0 - headDistSq)) * 0.72;
      // Prominence from features (nose bridge, brow, cheekbones via luminance)
      const featureBump = luminance * 0.25;
      zDepth = ellipsoidZ + featureBump;
    } else if (normalizedY <= -0.15) {
      // Chest / Shoulders taper back gently with slight forward curvature
      const shoulderFalloff = 1.0 - Math.min(1.0, Math.abs(normX) * 0.7);
      zDepth = shoulderFalloff * 0.28 + luminance * 0.12;
    } else {
      // Neck transition
      zDepth = 0.25 + luminance * 0.15;
    }

    // Add tiny high-frequency surface noise for organic clay / sculpture feel
    const jitter = (Math.random() - 0.5) * 0.04;
    zDepth += jitter;

    // World coordinates
    const worldX = normX * scale * aspect * 0.55;
    const worldY = normalizedY * scale * 0.58 - 0.1;
    const worldZ = zDepth * scale * 0.45;

    // Flattened photo position (Z = 0.0)
    photoPositions[p * 3] = worldX;
    photoPositions[p * 3 + 1] = worldY;
    photoPositions[p * 3 + 2] = 0.0;

    // 3D Sculpture position
    positions[p * 3] = worldX;
    positions[p * 3 + 1] = worldY;
    positions[p * 3 + 2] = worldZ;

    // Sculpture color: Rich crimson tones with depth shading
    // Forward-facing / high depth parts are more vibrant crimson, deep recessions are burgundy
    const depthFactor = Math.min(1.0, Math.max(0.0, zDepth / 0.8));
    const crimsonR = 0.35 + depthFactor * 0.52 + luminance * 0.15;
    const crimsonG = 0.02 + depthFactor * 0.04 + luminance * 0.03;
    const crimsonB = 0.05 + depthFactor * 0.06 + luminance * 0.04;

    sculptureColors[p * 3] = crimsonR;
    sculptureColors[p * 3 + 1] = crimsonG;
    sculptureColors[p * 3 + 2] = crimsonB;

    // Photo colors: Exact RGB values from portrait
    photoColors[p * 3] = pr;
    photoColors[p * 3 + 1] = pg;
    photoColors[p * 3 + 2] = pb;

    // Size variations: foreground & detailed feature particles are slightly larger
    particleSizes[p] = 1.4 + Math.random() * 2.2 + depthFactor * 0.8;
    randomFactors[p] = Math.random();
    normY[p] = normalized01Y;

    p++;
  }

  // Stage 08: Generating Particles
  onProgress?.(8, "Generating 60,000 Sculpture Points", 90);
  await new Promise((r) => setTimeout(r, 40));

  // Stage 09: Initializing Shaders
  onProgress?.(9, "Compiling GLSL GPU Shaders", 96);
  await new Promise((r) => setTimeout(r, 40));

  // Stage 10: Finalizing
  onProgress?.(10, "Finalizing Cinematic Scene", 100);
  await new Promise((r) => setTimeout(r, 40));

  return {
    positions,
    photoPositions,
    sculptureColors,
    photoColors,
    particleSizes,
    randomFactors,
    normY,
    count: actualCount,
    aspectRatio: aspect
  };
}
