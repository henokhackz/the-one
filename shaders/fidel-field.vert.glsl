// Fidel Instanced Glyph Field Vertex Shader
// Handles 3D volumetric drift, cursor magnetic repulsion, and target glyph assembly

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
  // Add slight per-particle delay
  assembleFactor = clamp((assembleFactor - aSeed.x * 0.2) / 0.8, 0.0, 1.0);
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
    interactionDisplacement += repelDir * force * 2.2;

    // Subtle magnetic swirl around Z axis
    vec3 swirl = vec3(-toPointer.y, toPointer.x, sin(distToPointer * 6.0)) * 0.3 * force;
    interactionDisplacement += swirl;

    highlight = force;
  }

  vec3 finalPos = basePos + interactionDisplacement;

  // 4. Instanced Billboard quad orientation (always face camera)
  // Scale particle based on seed and interaction
  float scale = aSeed.z * (1.0 + highlight * 0.35);
  if (assembleFactor > 0.5) {
    scale *= (1.0 + (assembleFactor - 0.5) * 0.4);
  }

  vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
  // Quad vertices offset in view space for true camera-facing billboard
  mvPosition.xy += position.xy * scale;

  gl_Position = projectionMatrix * mvPosition;

  // 5. Atlas UV calculation
  float col = mod(aGlyphIndex, uCols);
  float row = floor(aGlyphIndex / uCols);
  
  // Normalized coordinates in atlas
  vUv = vec2((uv.x + col) / uCols, (1.0 - uv.y + row) / uRows);
  
  // Depth for atmospheric gold fog
  vDepth = -mvPosition.z;
  vHighlight = highlight;
}
