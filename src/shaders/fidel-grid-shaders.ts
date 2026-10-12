/**
 * Fidel Static Grid Shaders
 * Pixel-mapped orthographic full-coverage layout (edge-to-edge).
 * 140px critically-damped spring hover, theme ink colors, desaturated Ethiopian flag gradient,
 * finite 1.2s wake wave, headline vignette mask, and ?debug=grid overlay.
 */

export const fidelGridVertexShader = /* glsl */ `
precision highp float;

attribute vec3 aBasePos;
attribute vec2 aGridNorm;   // [0..1, 0..1]
attribute float aGlyphIndex;

uniform float uCols;
uniform float uRows;
uniform float uCellSize;
uniform vec2 uPointer;
uniform float uPointerActive;
uniform float uHoverSpring;
uniform float uWakeTime; // 0.0 to 1.2s once on load, never loops
uniform float uWakeDone; // 1.0 when wake ends, hands 100% control to hover

varying vec2 vUv;
varying vec2 vGridNorm;
varying float vHover;
varying float vWake;
varying vec2 vWorldPos;

void main() {
  vGridNorm = aGridNorm;
  vWorldPos = aBasePos.xy;

  // 1. Separate, finite wake wave (0.0 to 1.2s duration once on load)
  float wake = 0.0;
  if (uWakeDone < 0.5) {
    float wakeProgress = clamp(uWakeTime / 1.2, 0.0, 1.0);
    float wavePos = wakeProgress * 1.3 - 0.15;
    float distToWave = abs(aGridNorm.x - wavePos);
    wake = smoothstep(0.12, 0.0, distToWave) * (1.0 - smoothstep(0.8, 1.2, uWakeTime));
  }
  vWake = wake;

  // 2. Cursor hover interaction within 140px radius with smooth Hermite falloff
  vec2 toPointer = aBasePos.xy - uPointer;
  float dist = length(toPointer);
  float hoverRadius = 140.0;
  float hover = 0.0;

  if (uPointerActive > 0.001 && dist < hoverRadius) {
    float t = 1.0 - (dist / hoverRadius);
    hover = smoothstep(0.0, 1.0, t) * uHoverSpring;
  }
  vHover = hover;

  // 3. Scale up to 1.35, rise slightly (4px), and subtle wake boost
  float scale = uCellSize * 0.72 * (1.0 + hover * 0.35 + wake * 0.18);
  float rise = hover * 4.0 + wake * 2.0;

  vec3 worldPos = aBasePos + vec3(0.0, rise, 0.0);

  // 4. Camera-facing billboard sizing in orthographic pixel space
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
precision highp float;

uniform sampler2D uAtlas;
uniform vec3 uInkColor;
uniform float uRestOpacity;
uniform float uHoverOpacity;
uniform vec3 uFlagGreen;
uniform vec3 uFlagAmber;
uniform vec3 uFlagRed;
uniform float uHeroFade; // 1.0 in hero, fades to 0.0 once hero leaves viewport
uniform float uDebug;    // 1.0 if ?debug=grid
uniform vec2 uPointer;
uniform float uPointerActive;
uniform vec2 uVignetteCenter;
uniform vec2 uVignetteRadius;

varying vec2 vUv;
varying vec2 vGridNorm;
varying float vHover;
varying float vWake;
varying vec2 vWorldPos;

void main() {
  vec4 texSample = texture2D(uAtlas, vUv);
  float glyphMask = texSample.a;

  if (glyphMask < 0.06) {
    discard;
  }

  // 1. Ethiopian flag tint by column, blended as smooth horizontal gradient (never hard blocks)
  // Green (#078930) -> Amber (#FCDD09) -> Red (#DA121A)
  float nx = vGridNorm.x;
  vec3 colFlag;
  if (nx < 0.5) {
    colFlag = mix(uFlagGreen, uFlagAmber, smoothstep(0.06, 0.48, nx));
  } else {
    colFlag = mix(uFlagAmber, uFlagRed, smoothstep(0.52, 0.94, nx));
  }

  // Desaturate 60% towards ink color for genuine manuscript dye feel
  vec3 tintedInk = mix(colFlag, uInkColor, 0.60);

  // At rest: ink color with very faint cultural tint; hovered: full local tint color
  vec3 finalColor = mix(uInkColor, tintedInk, clamp(0.18 + vHover * 0.82, 0.0, 1.0));

  // 2. Opacity: rest opacity (14-20% light, 12-18% dark), rising up to ~55% on hover
  float targetOpacity = mix(uRestOpacity, uHoverOpacity, clamp(vHover * 1.25 + vWake * 0.7, 0.0, 1.0));

  // 3. Soft radial vignette protecting headline & CTA zone so text stays clean
  vec2 toVignette = (vGridNorm - uVignetteCenter) / uVignetteRadius;
  float distToText = length(toVignette);
  float textVignette = smoothstep(0.25, 0.90, distToText);

  // Hero visibility fade
  float alpha = glyphMask * targetOpacity * textVignette * uHeroFade;

  if (alpha < 0.008) {
    discard;
  }

  // Debug overlay: 140px radius circle (?debug=grid)
  if (uDebug > 0.5 && uPointerActive > 0.01) {
    float distToPtr = length(vWorldPos - uPointer);
    if (abs(distToPtr - 140.0) < 3.0) {
      gl_FragColor = vec4(0.95, 0.68, 0.18, 0.90 * uHeroFade);
      return;
    }
  }

  gl_FragColor = vec4(finalColor, alpha);
}
`;
