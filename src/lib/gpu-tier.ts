/**
 * GPU & Device Capability Detection
 * Ensures creative 3D features deliver 60fps on desktop and mobile while respecting accessibility.
 */

export interface DeviceTier {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  webglSupported: boolean;
  canRun3D: boolean;
  instanceCount: number;
  enablePostProcessing: boolean;
  reason?: string;
}

export function detectDeviceTier(): DeviceTier {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      prefersReducedMotion: false,
      webglSupported: false,
      canRun3D: false,
      instanceCount: 3000,
      enablePostProcessing: true,
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
      instanceCount: 0,
      enablePostProcessing: false,
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
      instanceCount: 0,
      enablePostProcessing: false,
      reason: "WebGL not supported",
    };
  }

  // 4. Memory & Concurrency constraints
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const isLowEndDevice = hardwareConcurrency < 3;

  if (isMobile || isLowEndDevice) {
    return {
      isMobile: true,
      prefersReducedMotion,
      webglSupported: true,
      canRun3D: true,
      instanceCount: 1200,
      enablePostProcessing: false,
      reason: "Mobile tier: optimized lightweight 3D scene (1,200 instances, no post-fx)",
    };
  }

  return {
    isMobile: false,
    prefersReducedMotion,
    webglSupported: true,
    canRun3D: true,
    instanceCount: 3200,
    enablePostProcessing: true,
    reason: "Desktop high-performance tier",
  };
}
