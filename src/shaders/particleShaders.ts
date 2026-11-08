/**
 * Custom GLSL Shaders for Allu Kumarswami's 3D Particle Sculpture
 */

export const particleVertexShader = /* glsl */ `
  attribute vec3 photoPosition;
  attribute vec3 sculptureColor;
  attribute vec3 photoColor;
  attribute float particleSize;
  attribute float randomFactor;
  attribute float normY;

  uniform float uTime;
  uniform vec3 uCursor;
  uniform float uRevealProgress;
  uniform float uSweepY;
  uniform float uSweepWidth;
  uniform float uHover;
  uniform float uPixelRatio;
  uniform float uBaseSize;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vSweepIntensity;
  varying vec2 vUv;

  void main() {
    vUv = uv;

    // Idle floating organic oscillation
    float idleMotion = sin(uTime * 1.5 + randomFactor * 6.28) * 0.015;
    float idleSide = cos(uTime * 1.2 + randomFactor * 6.28) * 0.01;

    vec3 currentSculpturePos = position + vec3(idleSide, idleMotion, idleMotion * 0.5);

    // Interactive cursor push / attraction
    vec3 toCursor = uCursor - currentSculpturePos;
    float distToCursor = length(toCursor);
    float cursorGlow = smoothstep(1.5, 0.0, distToCursor) * uHover;

    // Subtle magnetic cursor pull
    if (uRevealProgress < 0.2) {
      currentSculpturePos += normalize(toCursor + 0.001) * cursorGlow * 0.04;
    }

    // Morph towards flattened photo position based on reveal progress & sweep
    // Sweep travels from top (normY = 1.0) to bottom (normY = 0.0)
    float sweepDist = abs(normY - uSweepY);
    float sweepBand = smoothstep(uSweepWidth, 0.0, sweepDist);
    vSweepIntensity = sweepBand;

    // Whether this particle is behind the sweep line (already swept)
    float sweptFactor = smoothstep(uSweepY + 0.08, uSweepY - 0.02, normY);
    float localProgress = clamp(uRevealProgress * 1.4 - (1.0 - normY) * 0.4, 0.0, 1.0);

    vec3 targetPos = mix(currentSculpturePos, photoPosition, localProgress);

    // Color interpolation: Sculpture Crimson -> Photo RGB
    vec3 baseColor = sculptureColor;

    // Brighten particles near cursor light source
    baseColor += vec3(0.35, 0.05, 0.05) * cursorGlow * (1.0 - localProgress);

    // Add laser light band flash
    baseColor += vec3(1.0, 0.2, 0.25) * sweepBand * 1.5;

    // Morph to photo color
    vec3 finalColor = mix(baseColor, photoColor, localProgress);
    vColor = finalColor;

    // Opacity fades slightly when fully transitioned to photo so photo underneath connects
    vAlpha = mix(0.95, 0.45, localProgress * 0.8) + sweepBand * 0.4;

    vec4 mvPosition = modelViewMatrix * vec4(targetPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation based on distance
    float sizeFactor = particleSize * (1.0 + cursorGlow * 0.35 + sweepBand * 0.6);
    gl_PointSize = sizeFactor * uBaseSize * uPixelRatio * (1.0 / -mvPosition.z);
    gl_PointSize = max(gl_PointSize, 1.5);
  }
`;

export const particleFragmentShader = /* glsl */ `
  precision highp float;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vSweepIntensity;

  void main() {
    // Render soft circular anti-aliased particle disc
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);

    if (dist > 0.5) {
      discard;
    }

    // Soft rim falloff
    float core = 1.0 - smoothstep(0.0, 0.5, dist);
    float glow = exp(-dist * 3.5);

    vec3 finalRgb = vColor + vec3(0.3, 0.02, 0.02) * glow;
    if (vSweepIntensity > 0.01) {
      finalRgb += vec3(0.6, 0.1, 0.1) * vSweepIntensity;
    }

    gl_FragColor = vec4(finalRgb, vAlpha * core);
  }
`;
