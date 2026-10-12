/**
 * Fidel Static Grid Shaders
 * Strict 24x14 / 12x8 Syllable Chart Layout
 * Cursor-only interaction, 60% desaturated Ethiopian diagonal tint, and headline vignette.
 */

export const fidelGridVertexShader = /* glsl */ `
attribute vec3 aBasePos;
attribute vec2 aGridNorm;   // [0..1, 0..1]
attribute float aGlyphIndex;

uniform float uCols;
uniform float uRows;
uniform vec3 uPointer;
uniform float uPointerActive;
uniform float uWakeTime; // 0.0 to 1.2s once on load, never loops

varying vec2 vUv;
varying vec2 vGridNorm;
varying float vHover;
varying float vWake;

void main() {
  vGridNorm = aGridNorm;

  // 1. One-time wake up wave across X (left to right, 1.2s duration)
  float wakeProgress = clamp(uWakeTime / 1.2, 0.0, 1.0);
  float wavePos = wakeProgress * 1.35 - 0.15;
  float distToWave = abs(aGridNorm.x - wavePos);
  float wake = smoothstep(0.14, 0.0, distToWave) * (1.0 - smoothstep(0.7, 1.2, uWakeTime));
  vWake = wake;

  // 2. Cursor hover interaction (only cursor drives motion)
  vec3 toPointer = aBasePos - uPointer;
  toPointer.z = 0.0;
  float dist = length(toPointer);
  float hoverRadius = 2.8;
  float hover = 0.0;

  if (uPointerActive > 0.5 && dist < hoverRadius) {
    hover = pow((hoverRadius - dist) / hoverRadius, 1.6);
  }
  vHover = hover;

  // 3. Static base position + lift on cursor or wake
  float lift = hover * 0.45 + wake * 0.25;
  vec3 worldPos = aBasePos + vec3(0.0, 0.0, lift);

  // 4. Camera-facing billboard sizing
  float scale = 0.28 * (1.0 + hover * 0.32 + wake * 0.18);
  vec4 mvPosition = modelViewMatrix * vec4(worldPos, 1.0);
  mvPosition.xy += position.xy * scale;

  gl_Position = projectionMatrix * mvPosition;

  // 5. Atlas UV coordinate
  float col = mod(aGlyphIndex, uCols);
  float row = floor(aGlyphIndex / uCols);
  vUv = vec2((uv.x + col) / uCols, (1.0 - uv.y + row) / uRows);
}
`;

export const fidelGridFragmentShader = /* glsl */ `
precision mediump float;

uniform sampler2D uAtlas;
uniform float uThemeIsDark;
uniform float uHeroFade; // 1.0 in hero, fades to 0.0 once hero leaves viewport

varying vec2 vUv;
varying vec2 vGridNorm;
varying float vHover;
varying float vWake;

void main() {
  // Sample glyph opacity from atlas
  vec4 texSample = texture2D(uAtlas, vUv);
  float glyphMask = texSample.a;

  if (glyphMask < 0.08) {
    discard;
  }

  // 1. Subtle diagonal gradient across grid (Muted Green -> Amber -> Muted Red)
  // Desaturated by ~60% so it reads as a noble cultural tint, never an aggressive flag
  float diag = (vGridNorm.x + (1.0 - vGridNorm.y)) * 0.5;

  vec3 mutedGreen = vec3(0.20, 0.42, 0.28);
  vec3 mutedAmber = vec3(0.72, 0.64, 0.28);
  vec3 mutedRed   = vec3(0.62, 0.24, 0.25);

  vec3 tint = mix(mutedGreen, mutedAmber, smoothstep(0.05, 0.50, diag));
  tint = mix(tint, mutedRed, smoothstep(0.50, 0.95, diag));

  // Light theme adaptation
  if (uThemeIsDark < 0.5) {
    tint = mix(tint, vec3(0.22, 0.20, 0.18), 0.35);
  }

  // 2. Rest opacity: 8% to 12%, rising up to ~40% on hover or wake wave
  float baseOpacity = 0.09;
  float activeFactor = clamp(vHover * 1.5 + vWake * 0.9, 0.0, 1.0);
  float alpha = mix(baseOpacity, 0.42, activeFactor);

  // 3. Soft radial vignette protecting the headline & CTA zone (left/center)
  // Ensures zero glyph noise sits under real HTML text
  vec2 textZone = vec2(0.26, 0.52);
  vec2 offset = (vGridNorm - textZone) * vec2(1.25, 1.0);
  float distToText = length(offset);
  float textVignette = smoothstep(0.20, 0.58, distToText);

  // Apply hero visibility fade (pauses/fades when hero scrolls out)
  float finalAlpha = glyphMask * alpha * textVignette * uHeroFade;

  if (finalAlpha < 0.015) {
    discard;
  }

  gl_FragColor = vec4(tint, finalAlpha);
}
`;
