// Cinematic Ethiopian Atmospheric Post-Process Shader
// Subtle chromatic aberration, fine parchment film grain, and warm golden-obsidian vignette

precision mediump float;

uniform sampler2D tDiffuse;
uniform vec2 uResolution;
uniform float uTime;
uniform float uGrainStrength;
uniform float uAberrationStrength;

varying vec2 vUv;

// High quality pseudo-random generator
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  vec2 uv = vUv;
  vec2 center = vec2(0.5);
  vec2 toCenter = uv - center;
  float dist = length(toCenter);

  // 1. Subtle Radial Chromatic Aberration
  // Shifts red outward and blue inward subtly based on distance from center
  float abOffset = dist * dist * uAberrationStrength;
  vec2 rUv = uv + normalize(toCenter + vec2(0.0001)) * abOffset;
  vec2 gUv = uv;
  vec2 bUv = uv - normalize(toCenter + vec2(0.0001)) * abOffset;

  float r = texture2D(tDiffuse, rUv).r;
  float g = texture2D(tDiffuse, gUv).g;
  float b = texture2D(tDiffuse, bUv).b;
  vec3 color = vec3(r, g, b);

  // 2. Fine Parchment / Manuscript Grain (Natural, non-digital)
  float grainTime = fract(uTime * 0.05);
  float grain = (hash(uv * uResolution + vec2(grainTime * 100.0)) - 0.5) * uGrainStrength;
  color += vec3(grain * 0.8, grain * 0.7, grain * 0.5); // Warm tinted grain

  // 3. Gold-tinted Obsidian Vignette
  float vignette = smoothstep(0.95, 0.35, dist);
  // Gold atmospheric glow in midtones
  vec3 goldTint = vec3(0.91, 0.66, 0.22); // #E8A838
  color = mix(color * 0.85, color, vignette);

  gl_FragColor = vec4(color, 1.0);
}
