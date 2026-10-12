// Fidel Instanced Glyph Field Fragment Shader
// Samples Ge'ez glyph from atlas, applies warm Ethiopian gold illumination and atmospheric depth fog

precision mediump float;

uniform sampler2D uAtlas;
uniform vec3 uColorBase;    // Muted parchment ink: #B8B0A2
uniform vec3 uColorAccent;  // Radiant Saffron Gold: #E8A838
uniform vec3 uFogColor;     // Deep warm gold-obsidian fog: #1A140B
uniform float uFogNear;
uniform float uFogFar;
uniform float uOpacity;

varying vec2 vUv;
varying float vDepth;
varying float vHighlight;

void main() {
  // Sample glyph opacity from atlas texture
  vec4 texSample = texture2D(uAtlas, vUv);
  float glyphAlpha = texSample.a;

  // Discard transparent quad background
  if (glyphAlpha < 0.08) {
    discard;
  }

  // Soft manuscript ink edge smoothing
  float alpha = smoothstep(0.08, 0.45, glyphAlpha) * uOpacity;

  // Color interpolation: base parchment ink transitioning to vibrant gold on hover/highlight
  vec3 glyphColor = mix(uColorBase, uColorAccent, clamp(vHighlight * 1.5, 0.0, 1.0));

  // Volumetric atmospheric depth fog (exponential squared feel)
  float fogFactor = clamp((vDepth - uFogNear) / (uFogFar - uFogNear), 0.0, 1.0);
  fogFactor = pow(fogFactor, 1.4);

  // Blend with warm obsidian-gold fog
  vec3 finalColor = mix(glyphColor, uFogColor, fogFactor);

  // Add subtle gold bloom on active particles
  if (vHighlight > 0.1) {
    finalColor += uColorAccent * (vHighlight * 0.4);
  }

  gl_FragColor = vec4(finalColor, alpha * (1.0 - fogFactor * 0.75));
}
