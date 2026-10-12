/**
 * GPU & Device Capability Detection
 * Ensures creative 3D features never compromise mobile battery, framerate, or accessibility.
 */

export interface DeviceTier {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  webglSupported: boolean;
  canRun3D: boolean;
  reason?: string;
}

export function detectDeviceTier(): DeviceTier {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      prefersReducedMotion: false,
      webglSupported: false,
      canRun3D: false,
      reason: "SSR",
    };
  }

  // 1. Accessibility Check: prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    return {
      isMobile: false,
      prefersReducedMotion: true,
      webglSupported: true,
      canRun3D: false,
      reason: "prefers-reduced-motion enabled",
    };
  }

  // 2. Mobile screen check
  const isMobile = window.innerWidth < 768;

  // 3. WebGL Support Check
  let webglSupported = false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    webglSupported = !!gl;
  } catch {
    webglSupported = false;
  }

  if (!webglSupported) {
    return {
      isMobile,
      prefersReducedMotion,
      webglSupported: false,
      canRun3D: false,
      reason: "WebGL not supported",
    };
  }

  // 4. Memory & Concurrency constraints
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const isLowEndDevice = hardwareConcurrency < 4;

  if (isMobile || isLowEndDevice) {
    return {
      isMobile,
      prefersReducedMotion,
      webglSupported,
      canRun3D: false,
      reason: "Mobile or low-spec device - prioritizing 2D fallback for speed & battery",
    };
  }

  return {
    isMobile,
    prefersReducedMotion,
    webglSupported,
    canRun3D: true,
  };
}
