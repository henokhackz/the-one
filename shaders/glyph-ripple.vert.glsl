// Fidel Glyph Field Ripple Vertex Shader
// Displaces Ge'ez glyph positions in response to mouse cursor interactions

uniform float u_time;
uniform vec2 u_cursor;
uniform float u_radius;
uniform float u_strength;
uniform float u_aspect;

varying vec2 vUv;
varying float vDistToCursor;
varying float vElevation;

void main() {
  vUv = uv;

  // World position calculation
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Distance from vertex to cursor in normalized screen space
  vec2 delta = (modelPosition.xy - u_cursor);
  delta.x *= u_aspect;
  float dist = length(delta);
  vDistToCursor = dist;

  // Wave ripple mechanics
  float wave = sin(dist * 12.0 - u_time * 4.0);
  float attenuation = smoothstep(u_radius, 0.0, dist);

  // Elevate along Z axis when interacting
  float elevation = wave * attenuation * u_strength;
  modelPosition.z += elevation;
  vElevation = elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
