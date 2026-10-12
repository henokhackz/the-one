/**
 * GLSL Shaders for the Fidel 3D Architectural Experience
 * Gold-tinted fog (#E8A838), volumetric Ge'ez instanced particle field, chromatic aberration, and film grain.
 */

export const fidelFieldVertexShader = /* glsl */ `
attribute vec3 aInitialPos;
attribute vec3 aTargetPos;
attribute float aGlyphIndex;
attribute vec3 aSeed; // [phase, speed, scaleFactor]

uniform float uTime;
uniform vec3 uPointer; // World-space pointer position
uniform float uPointerActive;
uniform float uAssembleProgress; // 0.0 = full drift, 1.0 = assembled
uniform float uCols;
uniform float uRows;

varying vec2 vUv;
varying float vDepth;
varying float vHighlight;

void main() {
  // 1. Calculate free volumetric drift
  float phase = aSeed.x;
  float speed = aSeed.y * 0.6 + 0.3;
  vec3 drift = vec3(
    sin(uTime * speed + phase) * 0.45,
    cos(uTime * speed * 0.8 + phase * 1.3) * 0.4,
    sin(uTime * speed * 0.5 + phase * 2.1) * 0.5
  );
  vec3 freePos = aInitialPos + drift;

  // 2. Blend between free drift and assembled target position
  float assembleFactor = smoothstep(0.0, 1.0, uAssembleProgress);
  assembleFactor = clamp((assembleFactor - aSeed.x * 0.25) / 0.75, 0.0, 1.0);
  vec3 basePos = mix(freePos, aTargetPos, assembleFactor);

  // 3. Cursor Interaction (Repulsion & Swirl Magnetism)
  vec3 toPointer = basePos - uPointer;
  float distToPointer = length(toPointer);
  float interactionRadius = 4.2;

  vec3 interactionDisplacement = vec3(0.0);
  float highlight = 0.0;

  if (uPointerActive > 0.5 && distToPointer < interactionRadius) {
    float force = (interactionRadius - distToPointer) / interactionRadius;
    force = pow(force, 1.8);

    // Repulsion outward
    vec3 repelDir = normalize(toPointer + vec3(0.001, 0.001, 0.0));
    interactionDisplacement += repelDir * force * 2.4;

    // Subtle magnetic swirl around Z axis
    vec3 swirl = vec3(-toPointer.y, toPointer.x, sin(distToPointer * 6.0)) * 0.35 * force;
    interactionDisplacement += swirl;

    highlight = force;
  }

  vec3 finalPos = basePos + interactionDisplacement;

  // 4. Billboard quad orientation (always camera-facing)
  float scale = aSeed.z * (1.0 + highlight * 0.35);
  if (assembleFactor > 0.4) {
    scale *= (1.0 + (assembleFactor - 0.4) * 0.5);
  }

  vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
  mvPosition.xy += position.xy * scale;

  gl_Position = projectionMatrix * mvPosition;

  // 5. Atlas UV calculation
  float col = mod(aGlyphIndex, uCols);
  float row = floor(aGlyphIndex / uCols);
  
  vUv = vec2((uv.x + col) / uCols, (1.0 - uv.y + row) / uRows);
  vDepth = -mvPosition.z;
  vHighlight = highlight;
}
`;

export const fidelFieldFragmentShader = /* glsl */ `
precision mediump float;

uniform sampler2D uAtlas;
uniform vec3 uColorBase;    // Muted parchment ink: #B8B0A2
uniform vec3 uColorAccent;  // Radiant Saffron Gold: #E8A838
uniform vec3 uFogColor;     // Deep warm obsidian fog: #0D0B08
uniform float uFogNear;
uniform float uFogFar;
uniform float uOpacity;

varying vec2 vUv;
varying float vDepth;
varying float vHighlight;

void main() {
  vec4 texSample = texture2D(uAtlas, vUv);
  float glyphAlpha = texSample.a;

  if (glyphAlpha < 0.08) {
    discard;
  }

  float alpha = smoothstep(0.08, 0.42, glyphAlpha) * uOpacity;
  vec3 glyphColor = mix(uColorBase, uColorAccent, clamp(vHighlight * 1.6, 0.0, 1.0));

  // Volumetric atmospheric depth fog
  float fogFactor = clamp((vDepth - uFogNear) / (uFogFar - uFogNear), 0.0, 1.0);
  fogFactor = pow(fogFactor, 1.4);

  vec3 finalColor = mix(glyphColor, uFogColor, fogFactor);

  if (vHighlight > 0.1) {
    finalColor += uColorAccent * (vHighlight * 0.45);
  }

  gl_FragColor = vec4(finalColor, alpha * (1.0 - fogFactor * 0.8));
}
`;

export const portalPreviewVertexShader = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const portalPreviewFragmentShader = /* glsl */ `
precision mediump float;

uniform sampler2D uTexture;
uniform float uTime;
uniform float uHover;
uniform vec3 uAccent;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;

void main() {
  vec2 uv = vUv;

  // Interactive wave ripple when hovered
  if (uHover > 0.01) {
    vec2 p = uv - 0.5;
    float len = length(p);
    float wave = sin(len * 16.0 - uTime * 4.0) * 0.02 * uHover;
    uv += normalize(p + 0.0001) * wave;
  }

  vec4 tex = texture2D(uTexture, uv);

  // Border tilet / sacred frame geometry
  float edgeDist = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  float border = smoothstep(0.03, 0.005, edgeDist);
  float innerGlow = smoothstep(0.12, 0.01, edgeDist) * 0.35;

  vec3 col = tex.rgb;
  // Blend with gold border and manuscript glow
  col = mix(col, uAccent, border * 0.9);
  col += uAccent * innerGlow * (0.4 + uHover * 0.6);

  gl_FragColor = vec4(col, 1.0);
}
`;
