// Fidel Glyph Field Frag Shader
// Renders Ge'ez glyph with ink glow and saffron gold accent illumination

precision mediump float;

uniform vec3 u_colorBase;
uniform vec3 u_colorAccent;
uniform float u_time;

varying vec2 vUv;
varying float vDistToCursor;
varying float vElevation;

void main() {
  // Center radial distance within glyph quad
  vec2 centeredUv = vUv - vec2(0.5);
  float dist = length(centeredUv);

  // Soft manuscript ink edge
  float alpha = smoothstep(0.48, 0.2, dist);

  // Color mix based on ripple elevation
  float highlight = clamp(vElevation * 2.5, 0.0, 1.0);
  vec3 color = mix(u_colorBase, u_colorAccent, highlight);

  // Add subtle saffron halo on hover
  float halo = smoothstep(0.4, 0.0, vDistToCursor) * 0.35;
  color += u_colorAccent * halo;

  if (alpha < 0.02) discard;

  gl_FragColor = vec4(color, alpha);
}
